# Atomest — Phase 3B: Post-Migration Database Verification

**Project:** `sxofnbooiubztoizkagi` — `https://sxofnbooiubztoizkagi.supabase.co`
**Migrations applied:** `0004_leads_schema.sql` then `0005_rate_limits_schema.sql` (applied manually via Supabase SQL Editor, prior to this session)
**Verification scope:** READ-ONLY remote inspection + local code inspection + local tests. No remote SQL applied or modified in this session. No deploy to Vercel.

---

## §1 Migration verification status

| Migration | Applied | Status |
|-----------|---------|--------|
| `0004_leads_schema.sql` | Yes | ✅ Applied |
| `0005_rate_limits_schema.sql` | Yes | ✅ Applied |

Both migrations were executed manually in the Supabase SQL Editor before this verification session. No migrations were applied during this session (read-only only).

---

## §2 Database object verification

### §2.1 `public.leads` table

**Columns** — all match the migration:

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| email | text | NO | — |
| product | text | NO | — |
| full_name | text | YES | — |
| company_name | text | YES | — |
| role | text | YES | — |
| created_at | timestamptz | NO | now() |

**Constraints:** `leads_pkey` (PK on id), `leads_email_product_key` (UNIQUE on email, product) ✅

**Indexes:**
- `leads_pkey` — UNIQUE btree (id) ✅
- `leads_email_product_key` — UNIQUE btree (email, product) ✅
- `idx_leads_email_product` — btree (email, product) ✅
- `idx_leads_created_at` — btree (created_at DESC) ✅

**RDS:** enabled ✅, owner: postgres ✅

### §2.2 `public.rate_limits` table

**Columns** — all match the migration:

| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | text | NO | — |
| count | integer | NO | 0 |
| window_start | timestamptz | NO | — |
| updated_at | timestamptz | NO | now() |

**Constraints:** `rate_limits_pkey` (PK on id) ✅

**Indexes:**
- `rate_limits_pkey` — UNIQUE btree (id) ✅
- `idx_rate_limits_window_start` — btree (window_start) ✅

**RDS:** enabled ✅, owner: postgres ✅

### §2.3 Functions

| Function | Signature | Result type | SECURITY INVOKER | search_path |
|----------|-----------|-------------|-------------------|-------------|
| `increment_rate_limit` | `(p_key text, p_max_requests integer, p_window_seconds integer)` | TABLE(allowed boolean, remaining integer, retry_after integer) | ✅ Yes | `public, pg_temp` |
| `cleanup_rate_limits` | `(p_older_than interval)` | integer | ✅ Yes | `public, pg_temp` |

Both functions match the migration signatures, are `SECURITY INVOKER`, and set `search_path = public, pg_temp` ✅

---

## §3 RLS and privilege verification

### §3.1 Row-level security policies

**`public.leads`:**

| Policy | Command | Qual | With Check | Roles |
|--------|---------|------|------------|-------|
| Anyone can submit lead | INSERT (a) | — | true | — (all) |
| No one can read leads via client | SELECT (r) | false | — | — (all) |

- INSERT: anyone (incl. anon) can submit ✅
- SELECT: `USING (false)` → zero rows readable by any client role ✅
- No UPDATE or DELETE policies exist → no client role can modify submitted leads ✅

**`public.rate_limits`:**

| Policy | Command | Qual | With Check | Roles |
|--------|---------|------|------------|-------|
| Service role can manage rate limits | ALL (*) | true | true | service_role |

- Only `service_role` can read/write rate-limit rows ✅
- No policy for anon or authenticated ✅

### §3.2 Table-level ACLs

| Table | ACL (relacl) | RLS |
|-------|-------------|-----|
| leads | `{postgres=arwdDxtm/postgres, anon=arwdDxtm/postgres, authenticated=arwdDxtm/postgres, service_role=arwdDxtm/postgres}` | enabled |
| rate_limits | `{postgres=arwdDxtm/postgres, anon=arwdDxtm/postgres, authenticated=arwdDxtm/postgres, service_role=arwdDxtm/postgres}` | enabled |

Table-level ACLs are broad (standard Supabase default), but **RLS narrows effective access** as shown in §3.1. Anon cannot SELECT leads (`USING false`), and anon cannot access rate_limits at all (no policy). ✅

### §3.3 Function-level EXECUTE privileges — ⚠️ ISSUE FOUND

| Function | proacl |
|----------|--------|
| `increment_rate_limit` | `{postgres=X/postgres, anon=X/postgres, authenticated=X/postgres, service_role=X/postgres}` |
| `cleanup_rate_limits` | `{postgres=X/postgres, anon=X/postgres, authenticated=X/postgres, service_role=X/postgres}` |

`X` = EXECUTE privilege. **Both `anon` and `authenticated` have EXECUTE on both functions**, despite the migration containing `REVOKE EXECUTE FROM PUBLIC` followed by `GRANT EXECUTE TO service_role`.

**Why this happened:** In PostgreSQL, `REVOKE ... FROM PUBLIC` removes the PUBLIC grant, but `anon` and `authenticated` appear to hold direct EXECUTE grants (likely Supabase defaults at function creation time) that survive the PUBLIC revoke. The `GRANT ... TO service_role` adds service_role but does not remove anon/authenticated.

**Impact:** Because both functions are `SECURITY INVOKER` and RLS on `rate_limits` only permits `service_role`, anon/authenticated calling these RPCs would run with their own privileges and be blocked by RLS (no data can be read or modified). The practical risk is limited to spurious RPC errors, not data exposure or manipulation. However, this is **broader than intended** — if RLS is ever altered or disabled, anon could manipulate rate-limit counters or delete rows via `cleanup_rate_limits`.

**Remediation needed:** Execute (as postgres/service_role):
```sql
REVOKE EXECUTE ON FUNCTION public.increment_rate_limit(TEXT, INTEGER, INTEGER) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits(INTERVAL) FROM anon, authenticated;
```

### §3.4 Namespace ACL

`public` schema: `{pg_database_owner=UC/pg_database_owner, =U/pg_database_owner, postgres=U/pg_database_owner, anon=U/pg_database_owner, authenticated=U/pg_database_owner, service_role=U/pg_database_owner}` — PUBLIC has USAGE on the public schema (standard, not a concern). ✅

### §3.5 Anonymous access verification

- **Anon cannot read leads:** SELECT policy `USING (false)` matches zero rows. ✅ (verified via policy inspection; no test data inserted per restrictions)
- **Anon cannot invoke privileged functions with effect:** EXECUTE exists but SECURITY INVOKER + RLS blocks all table access for anon. ✅ (policy-level confirmation)
- **No service-role key in frontend:** application code reads `process.env.SUPABASE_SERVICE_ROLE_KEY` only in serverless API handlers (`api/contact.ts`, `api/waitlist.ts`, `api/lib/rate-limiter.ts`). ✅

---

## §4 Application integration verification

### §4.1 `api/lib/rate-limiter.ts`

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Uses Supabase RPC `increment_rate_limit` as authoritative source | ✅ | `checkRateLimitSupabase()` calls `supabase.rpc("increment_rate_limit", ...)` |
| Fail-closed on RPC failure | ✅ | Throws `RateLimitError` (503) on missing config, RPC error, or null data; no in-memory fallback |
| No silent success / no bypass | ✅ | Never falls back to per-instance store; caller must handle error |
| Uses service-role key only | ✅ | `getSupabaseClient()` reads `SUPABASE_SERVICE_ROLE_KEY`; returns null (→ 503) if missing |

### §4.2 `api/contact.ts`

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Rate limit: 5/min per IP | ✅ | `checkRateLimit(ip, { maxRequests: 5, windowMs: 60_000 })` |
| Rate-limit failure → recoverable 503 | ✅ | `try/catch` around `checkRateLimit`; `RateLimitError` → `res.status(503)` |
| Rate-limit exhaustion → 429 + Retry-After | ✅ | `if (!rateLimit.allowed)` → `res.status(429)` with `Retry-After` header |
| Server-side Zod validation | ✅ | `ContactInquirySchema.safeParse(req.body)` |
| Lead insert via service-role client | ✅ | `createClient(supabaseUrl, supabaseKey)` → `supabase.from('leads').insert(...)` |
| Idempotent on 23505 | ✅ | Duplicate → 200 `success: true, message: 'already on file'` |
| DB failure → 503 | ✅ | Non-23505 error → 503 `could not be saved` |
| No anon-key fallback | ✅ | Missing `SUPABASE_SERVICE_ROLE_KEY` → 503 (no anon fallback) |

### §4.3 `api/waitlist.ts`

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Rate limit: 10/min per IP | ✅ | `checkRateLimit(ip, { maxRequests: 10, windowMs: 60_000 })` |
| Same fail-closed / 429 / 503 patterns | ✅ | Identical structure to contact.ts |
| Lead insert via service-role client | ✅ | Same pattern |
| Idempotent on 23505 | ✅ | Duplicate → 200 `success: true, message: 'Already registered'` |
| No anon-key fallback | ✅ | Missing key → 503 |

### §4.4 Summary

Application code correctly: (1) calls the Supabase RPC for rate limiting, (2) fails closed with recoverable 503 on RPC failure, (3) returns 429 on exhaustion, (4) uses service-role key only with no anon fallback, (5) validates input server-side with Zod, (6) handles duplicate submissions idempotently. ✅

---

## §5 Test results

| Check | Command | Result |
|-------|---------|--------|
| Typecheck (strict) | `npx tsc --noEmit` | ✅ Clean (no output, exit 0) |
| Unit tests | `npm test` (vitest run) | ✅ 28/28 pass (4 files) |
| Production build | `npm run build` | ⚠️ Not re-run |

**Build note:** `npm run build` was not re-run in this session. The Claude Code classifier denied the `npm run build` Bash call because the user instructed "Do not deploy to Vercel yet" — `npm run build` is the Vercel production deploy build step. Individual build steps were previously verified green in Phase 2.2 (`vite build --outDir dist/client`, `vite build --ssr`, `tsx scripts/prerender.ts` all succeeded). The build should be re-run as part of pre-deployment verification when authorized.

**Test breakdown:**
- `api/lib/rate-limiter.test.ts` — 5 tests pass (allows under limit, rejects over limit, distinct key per IP, throws RateLimitError on RPC error/fail-closed, throws when Supabase not configured)
- `api/contact.test.ts` — 7 tests pass (400 invalid, 200 save, 429 rate-limited, 503 RPC failure fail-closed, 503 DB failure, 200 idempotent duplicate, 503 unconfigured)
- `api/waitlist.test.ts` — 8 tests pass (same coverage as contact)
- `src/lib/validation.test.ts` — 8 tests pass (pre-existing, untouched)

---

## §6 Security issues and remaining blockers

### ⚠️ Blocker: Function EXECUTE privileges too broad

`anon` and `authenticated` have EXECUTE on `increment_rate_limit` and `cleanup_rate_limits`. The migration's `REVOKE EXECUTE FROM PUBLIC` did not remove these role-specific direct grants.

**Required remediation (execute via Supabase SQL Editor as postgres/service_role):**
```sql
REVOKE EXECUTE ON FUNCTION public.increment_rate_limit(TEXT, INTEGER, INTEGER) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits(INTERVAL) FROM anon, authenticated;
```

After remediation, verify:
```sql
SELECT proname, proacl FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
  AND proname IN ('increment_rate_limit','cleanup_rate_limits');
-- proacl should no longer contain anon=X or authenticated=X
```

### Other items (not blockers)

| Item | Status | Notes |
|------|--------|-------|
| Production build re-run | Not done | Blocked by "no deploy yet" instruction; individual steps previously green |
| `pg_cron` cleanup schedule | Not configured | `cleanup_rate_limits` exists but no periodic schedule; table grows unboundedly without it. Recommended: schedule hourly via pg_cron |
| Migration state tracking | No `supabase_migrations` table | `mcp__supabase__list_migrations` returned empty; migrations were applied manually outside Supabase's migration tracking |

---

## §7 Verification status summary

| Category | Item | Verified | Partially verified | Unverified |
|----------|------|----------|-------------------|------------|
| Database objects | leads table structure | ✅ | | |
| | rate_limits table structure | ✅ | | |
| | increment_rate_limit function | ✅ | | |
| | cleanup_rate_limits function | ✅ | | |
| | Indexes | ✅ | | |
| Security | RLS enabled on both tables | ✅ | | |
| | Leads INSERT policy | ✅ | | |
| | Leads SELECT-denial policy | ✅ | | |
| | Rate-limit service-role-only policy | ✅ | | |
| | Functions SECURITY INVOKER | ✅ | | |
| | Functions search_path | ✅ | | |
| | Function EXECUTE restricted to service_role | | ⚠️ | — anon/authenticated still have EXECUTE (needs REVOKE) |
| | Table-level ACLs narrowed by RLS | ✅ | | |
| | Anon cannot read leads | ✅ (policy-level) | | |
| Application integration | Rate limiter calls Supabase RPC | ✅ | | |
| | Fail-closed 503 on RPC failure | ✅ | | |
| | 429 on rate-limit exhaustion | ✅ | | |
| | Service-role key only, no anon fallback | ✅ | | |
| | No service-role key in frontend | ✅ | | |
| Tests | Typecheck (strict) | ✅ | | |
| | Unit tests (28/28) | ✅ | | |
| | Production build | | | ⚠️ Not re-run (no deploy yet) |

---

## §8 Next actions before production deployment

1. **Fix function EXECUTE privileges** (required): Run the two `REVOKE EXECUTE ... FROM anon, authenticated` statements via Supabase SQL Editor, then verify `proacl` no longer lists anon/authenticated.

2. **Schedule cleanup** (recommended): Enable `pg_cron` and schedule `cleanup_rate_limits(INTERVAL '7 days')` hourly to prevent unbounded `rate_limits` table growth.

3. **Re-run production build**: `npm run build` (client build → SSR build → prerender) once deploy is authorized.

4. **Deploy to Vercel**: Only after steps 1–3 and explicit deploy authorization.

5. **Optional**: Consider tracking migrations via Supabase's migration system (`supabase_migrations` table) for future state visibility.

**No credentials were exposed in this report. No remote data was modified. No deploy was performed.**
