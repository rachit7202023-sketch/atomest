# Atomest — Phase 2.3: Supabase Migration Security Review

**Scope:** Security review of `supabase/migrations/0004_leads_schema.sql` and `supabase/migrations/0005_rate_limits_schema.sql`, plus the application code they support (`api/lib/rate-limiter.ts`, `api/contact.ts`, `api/waitlist.ts`). Local review only — **neither migration has been applied to the remote project** and none will be without explicit authorization.

**Status:** Complete. All local code changes applied; tests green; typecheck clean.

---

## §1 What was reviewed

| File | Role |
|------|------|
| `supabase/migrations/0004_leads_schema.sql` | `public.leads` table + RLS policies for contact/waitlist submissions |
| `supabase/migrations/0005_rate_limits_schema.sql` | `public.rate_limits` table + `increment_rate_limit` + `cleanup_rate_limits` RPCs |
| `api/lib/rate-limiter.ts` | Server-side rate-limit check (calls `increment_rate_limit` RPC) |
| `api/contact.ts` | Contact form API (rate-limit → validate → insert lead) |
| `api/waitlist.ts` | Waitlist API (rate-limit → validate → insert lead) |
| `api/lib/rate-limiter.test.ts`, `api/contact.test.ts`, `api/waitlist.test.ts` | Vitest suites |

---

## §2 Remote project readiness (project `sxofnbooiubztoizkagi`)

Inspected read-only via `mcp__supabase__list_tables`. The remote `public` schema currently contains:

`profiles`, `projects`, `generation_runs`, `generation_artifacts`, `attachments`, `activity_log` — all RLS-enabled, 0 rows each.

**No `leads` table, no `rate_limits` table, and no `increment_rate_limit`/`cleanup_rate_limits` functions exist remotely yet.** Therefore:

- ✅ **No naming conflicts** — migrations 0004 then 0005 apply cleanly in sequence.
- ✅ **No missing extensions** — `gen_random_uuid()` is native in Postgres 13+ (Supabase runs PG 14+); `pgcrypto` not required.
- ✅ **No schema dependencies** on existing tables; the new tables are standalone.
- ⚠️ **Rollback is manual** — the migrations contain no `DROP` statements. Rollback = `DROP TABLE public.rate_limits; DROP TABLE public.leads;` plus `DROP FUNCTION ...` for the RPCs (order: functions first, then tables). No data exists remotely yet, so rollback is lossless today.

**Apply order:** `0004_leads_schema.sql` first, then `0005_rate_limits_schema.sql`. (0005 is independent of 0004, but this ordering matches the version numbering.) See §9 for exact safe apply instructions.

---

## §3 Migration 0004 — leads table security review

### Current design (after hardening)

- `CREATE TABLE IF NOT EXISTS public.leads` — idempotent.
- `id UUID DEFAULT gen_random_uuid()` PK; `email TEXT NOT NULL`, `product TEXT NOT NULL`, optional `full_name`/`company_name`/`role`; `created_at`.
- `UNIQUE(email, product)` — deduplicates repeat submissions for the same email+product.
- RLS **enabled**.
- Policy `Anyone can submit lead` — `FOR INSERT WITH CHECK (true)`: anon and authenticated clients can INSERT.
- Policy `No one can read leads via client` — `FOR SELECT USING (false)`: **no client role can SELECT leads.**
- No UPDATE or DELETE policies → no client role can modify submitted leads.
- Policies use `DROP POLICY IF EXISTS` + `CREATE POLICY` → migration is re-runnable.
- Indexes `idx_leads_email_product`, `idx_leads_created_at`.

### Confirmation: anon cannot read submitted leads ✅

The SELECT policy is `USING (false)`, which matches zero rows for every role except service-role (which bypasses RLS entirely and is only used server-side). Anonymous and authenticated client-side Supabase users **cannot read any lead rows**. Submitted lead data (email, name, company, description) is write-only from the client's perspective.

### Residual risks (leads)

| Risk | Severity | Assessment |
|------|----------|------------|
| INSERT open to anyone with no rate limit at the DB level | Medium | Mitigated at the application layer by `api/contact.ts` / `api/waitlist.ts` rate limiting (5/min and 10/min per IP via the shared RPC). Without migration 0005 applied, rate limiting is disabled until applied. |
| `UNIQUE(email, product)` could be used to "reserve"/probe email+product combos | Low | Non-sensitive data; no client can read whether a row exists (SELECT is denied). |
| No server-side policy for authenticated admins to read leads via client | Low | By design: leads are read server-side via service-role only (API route), not exposed to the client. |

---

## §4 Migration 0005 — rate-limit store security review

### Security dimension-by-dimension

| Dimension | Finding | Status |
|-----------|---------|--------|
| **SECURITY DEFINER vs INVOKER** | `increment_rate_limit` and `cleanup_rate_limits` are now explicitly `SECURITY INVOKER` (was implicitly INVOKER by default). Runs with caller's privileges; only `service_role` can successfully execute. | ✅ Fixed |
| **`search_path` hijacking** | Added `SET search_path = public, pg_temp` to both functions so unqualified calls (e.g. `NOW()`) resolve to `public` first, preventing a malicious object earlier in `search_path` from being intercepted. | ✅ Fixed |
| **Function EXECUTE permissions** | Functions default to EXECUTE granted to PUBLIC. Added `REVOKE EXECUTE FROM PUBLIC` + `GRANT EXECUTE TO service_role` for both RPCs, so anon/authenticated clients cannot call `increment_rate_limit` at all. | ✅ Fixed |
| **Anon / authenticated invocation** | Anon and authenticated client roles have **no policy** on `rate_limits` (only `service_role` has `FOR ALL`). Even if they could call the RPC (they can't — EXECUTE revoked), RLS would block the table write. Double protection. | ✅ Confirmed |
| **Read / manipulate rate-limit records** | Only `service_role` may SELECT/INSERT/UPDATE/DELETE `rate_limits` rows (single policy, `USING/WITH CHECK true`). No client policy exists. | ✅ Confirmed |
| **Abuse for unlimited records / limit exhaustion** | An attacker with the public anon key cannot call the RPC (EXECUTE revoked) and cannot write rows (RLS denies). Could still cause server-side rate-limit entries via legitimate contact/waitlist requests (one row per IP+endpoint+window), but that's intended and bounded per window. | ✅ Mitigated |
| **Upsert atomicity under concurrency** | Single-statement `INSERT … ON CONFLICT (id) DO UPDATE` acquires a row lock on the conflicting key. Concurrent increments for the same key are serialized — no read-then-write race window. Verified correct: window-reset case and increment case both handled inside the locked update. | ✅ Confirmed |
| **Cleanup strategy** | **Was missing.** Added `cleanup_rate_limits(p_older_than INTERVAL)` RPC that deletes rows older than the retention age, plus `idx_rate_limits_window_start` to support it. Intended for periodic `pg_cron` invocation (e.g. hourly) or manual admin runs. Without cleanup, the table grows unboundedly (one row per key per window). | ✅ Added |
| **Idempotency / re-runnability** | Table: `IF NOT EXISTS`. Policies: `DROP POLICY IF EXISTS` + `CREATE POLICY`. Functions: `CREATE OR REPLACE`. Migration is safe to re-run. | ✅ Fixed |
| **Fail-closed application behaviour** | `api/lib/rate-limiter.ts` previously fell back silently to a per-instance in-memory Map on any Supabase error (never failed closed, could falsely report success). Now throws `RateLimitError` on any enforcement failure; `contact.ts`/`waitlist.ts` return a recoverable **503** instead of silently succeeding. | ✅ Fixed |

### Rate-limit semantics

- `max_requests` = N allows exactly N requests per window; the (N+1)th is denied (`allowed=false`, `remaining=0`, `retry_after` = seconds until window reset).
- Fixed window per key (`rate:<ip>:<maxRequests>:<windowMs>`). Window resets when `window_start < now - window_seconds`.
- Row-locked upsert makes it safe across concurrent Vercel serverless instances (shared Postgres store).

---

## §5 Application code changes (fail-closed rate limiting)

### `api/lib/rate-limiter.ts` (rewritten)

- Removed the silent per-instance in-memory `Map` fallback (`MEMORY_STORE`, `checkRateLimitMemory`, `clearRateLimitStore`).
- `checkRateLimit()` now calls the Supabase RPC as the **authoritative** source.
- On any failure (Supabase not configured, network error, RPC error, missing table) it throws `RateLimitError` (status 503) — **fail-closed**. It never silently reports success or bypasses limits.
- `getClientIp()` unchanged (reads `x-real-ip` / `x-forwarded-for`).

### `api/contact.ts` & `api/waitlist.ts`

- Import `RateLimitError`.
- Wrap `checkRateLimit()` in `try/catch`; on `RateLimitError` return `res.status(503).json({ error: <message> })` — a **recoverable** HTTP response the client can retry.
- On `allowed === false` return `429` with `Retry-After` header (unchanged behaviour).
- All other logic (Zod validation, lead insert, 23505 idempotency, 503 on DB failure) unchanged.

---

## §6 Risks & fixes summary

| # | Risk | Fix applied | File |
|---|------|-------------|------|
| 1 | Rate limiter silently fell back to unshared in-memory store on Supabase failure, falsely reporting success | Fail-closed: throw `RateLimitError` → 503 recoverable response | `api/lib/rate-limiter.ts`, `api/contact.ts`, `api/waitlist.ts` |
| 2 | `increment_rate_limit` implicitly SECURITY INVOKER; EXECUTE granted to PUBLIC by default | Explicit `SECURITY INVOKER`; `REVOKE EXECUTE FROM PUBLIC` + `GRANT EXECUTE TO service_role` | `0005_rate_limits_schema.sql` |
| 3 | No fixed `search_path` → `NOW()` hijackable via search_path | `SET search_path = public, pg_temp` on both functions | `0005_rate_limits_schema.sql` |
| 4 | No cleanup strategy → `rate_limits` table grows unboundedly | Added `cleanup_rate_limits(interval)` RPC + documentation for `pg_cron` | `0005_rate_limits_schema.sql` |
| 5 | Policies not idempotent (`CREATE POLICY` fails on re-run) | `DROP POLICY IF EXISTS` + `CREATE POLICY` | `0004` + `0005` |
| 6 | Anon could theoretically read leads | SELECT policy `USING (false)` → confirmed anon/authenticated cannot read | `0004_leads_schema.sql` (verified) |

---

## §7 Test results

**Vitest: 28 / 28 pass (4 files)**

| File | Tests |
|------|-------|
| `api/lib/rate-limiter.test.ts` | 5 — allows under limit, rejects over limit, distinct key per IP, throws `RateLimitError` on RPC error (fail-closed), throws when Supabase not configured |
| `api/contact.test.ts` | 7 — 400 invalid data, 200 valid save, 429 rate-limited, 503 RPC failure (fail-closed), 503 DB save failure, 200 idempotent duplicate, 503 unconfigured |
| `api/waitlist.test.ts` | 8 — same coverage as contact (400 missing/invalid email, 200 save, 429, 503 RPC failure, 200 idempotent, 503 DB failure, 503 unconfigured) |
| `src/lib/validation.test.ts` | 8 (pre-existing, untouched) |

**Typecheck (`tsc --noEmit`, strict): clean.**

### New failure-path coverage (the Phase 2.3 requirement)

- `rate-limiter.test.ts`: "throws RateLimitError when the RPC returns an error (fail-closed)" and "throws RateLimitError when Supabase is not configured".
- `contact.test.ts`: "returns 503 when the rate-limit RPC fails (fail-closed, no silent success)".
- `waitlist.test.ts`: "returns 503 when the rate-limit RPC fails (fail-closed, no silent success)".
- Both contact and waitlist also assert `429` + `Retry-After` header when the RPC returns `allowed=false`.

---

## §8 What was NOT changed (by design)

- No remote database modifications (per security constraints and user instruction).
- No `.env` committed; no credentials, service-role keys, or customer data exposed.
- No commits, no pushes, no deploy.
- `api/contact.ts` / `api/waitlist.ts` still use `VITE_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` only (no anon-key fallback — fail-closed 503 if missing, established in Phase 2.2).
- CORS in contact/waitlist still reflects `origin` (not wildcard+credentials, Phase 2.2 hardening retained).

---

## §9 Exact safe apply instructions (0004 → 0005, remote project `sxofnbooiubztoizkagi`)

**Do not run these unless you explicitly authorize the remote migration.** These are the exact commands to run when you're ready:

### Prerequisites
1. You are the project owner / have `service_role` access to `sxofnbooiubztoizkagi`.
2. Back up the project (Supabase dashboard → Settings → Backups, or `pg_dump`). The remote public tables currently have 0 rows, but a backup is good practice before any DDL.
3. Confirm the `leads` and `rate_limits` tables do not already exist remotely (verified above: they don't).

### Step 1 — Apply migration 0004 (leads)
Via the Supabase dashboard SQL Editor (or `supabase` CLI):

```sql
-- contents of supabase/migrations/0004_leads_schema.sql
```

Expected result: `public.leads` created, RLS enabled, two policies created, two indexes created.

Verify:
```sql
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'leads';
SELECT polname, polcmd FROM pg_policy WHERE polrelid = 'public.leads'::regclass;
-- polcmd should show 'r' (SELECT) with qual = false (deny all) and 'i' (INSERT) with check = true
```

### Step 2 — Apply migration 0005 (rate limits)

```sql
-- contents of supabase/migrations/0005_rate_limits_schema.sql
```

Expected result: `public.rate_limits` table, RLS, service-role-only policy, index, `increment_rate_limit` + `cleanup_rate_limits` functions, EXECUTE restricted to `service_role`.

Verify:
```sql
SELECT polname, polcmd FROM pg_policy WHERE polrelid = 'public.rate_limits'::regclass;
-- should show a single policy to service_role (cmd * = ALL)

SELECT proname, prosecdef FROM pg_proc WHERE proname IN ('increment_rate_limit','cleanup_rate_limits');
-- prosecdef = f (SECURITY INVOKER, not definer)

-- Confirm EXECUTE is NOT granted to PUBLIC:
SELECT grantee, privilege_type FROM information_schema.routine_privileges
WHERE routine_name = 'increment_rate_limit';
-- should list service_role, not PUBLIC
```

### Step 3 — Deploy the application code
Deploy `api/lib/rate-limiter.ts`, `api/contact.ts`, `api/waitlist.ts` (Vercel). These will now call `increment_rate_limit` via the service-role key. Until migration 0005 is applied, every protected request returns 503 (fail-closed, honest — no silent bypass).

### Step 4 — Schedule cleanup (optional but recommended)
In the Supabase dashboard, enable the `pg_cron` extension (if not already) and schedule:

```sql
SELECT cron.schedule(
  'cleanup-rate-limits',
  '0 * * * *',          -- hourly
  $$SELECT public.cleanup_rate_limits(INTERVAL '7 days')$$   -- retain 7 days of windows
);
```

Adjust retention to your needs. Without this, `rate_limits` grows one row per IP+endpoint+window indefinitely.

### Rollback (if needed)
```sql
DROP FUNCTION IF EXISTS public.cleanup_rate_limits(INTERVAL);
DROP FUNCTION IF EXISTS public.increment_rate_limit(TEXT, INTEGER, INTEGER);
DROP TABLE IF EXISTS public.rate_limits;
DROP TABLE IF EXISTS public.leads;
```
Order matters: functions before tables. Lossless today (remote tables have 0 rows).

---

## §10 Authorization reminder

Per the security constraints in effect for this session: **do not apply either migration to the remote project, do not deploy to production, and do not modify remote data without your explicit authorization.** All changes in this phase are local and reversible. The migration is ready to apply whenever you authorize it — run Step 1 (0004) then Step 2 (0005) from §9.
