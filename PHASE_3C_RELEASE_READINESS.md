# Atomest — Phase 3C: Permission Hardening & Release Readiness

**Project:** `sxofnbooiubztoizkagi` — `https://sxofnbooiubztoizkagi.supabase.co`
**Scope:** Remote permission verification (read-only), local code verification (typecheck, tests, build), cleanup inspection. No deployment. No remote database mutations. No production test submissions. No credential exposure.

---

## A. Remote function permission verification

### Verification queries executed (read-only)

```sql
-- Function ACLs
SELECT proname, proacl FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
  AND proname IN ('increment_rate_limit','cleanup_rate_limits');

-- Security invoker + search_path
SELECT proname, prosecdef AS security_invoker, proconfig AS search_path_config
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
  AND proname IN ('increment_rate_limit','cleanup_rate_limits');
```

### Actual ACL evidence

| Function | proacl (EXECUTE = X) | SECURITY INVOKER | search_path |
|----------|---------------------|------------------|-------------|
| `increment_rate_limit(text, integer, integer)` | `{postgres=X/postgres, service_role=X/postgres}` | ✅ yes | ✅ `public, pg_temp` |
| `cleanup_rate_limits(interval)` | `{postgres=X/postgres, service_role=X/postgres}` | ✅ yes | ✅ `public, pg_temp` |

### Classification of each permission check

| Check | Classification | Evidence |
|-------|---------------|----------|
| anon does not have EXECUTE | **VERIFIED** | `proacl` contains no `anon=X` entry for either function |
| authenticated does not have EXECUTE | **VERIFIED** | `proacl` contains no `authenticated=X` entry for either function |
| PUBLIC does not have EXECUTE | **VERIFIED** | `proacl` contains no `=X` (PUBLIC) entry for either function |
| service_role retains EXECUTE | **VERIFIED** | `proacl` shows `service_role=X/postgres` for both functions |
| Both functions SECURITY INVOKER | **VERIFIED** | `prosecdef = false` (i.e., not SECURITY DEFINER = SECURITY INVOKER) for both |
| search_path = public, pg_temp | **VERIFIED** | `proconfig = ["search_path=public, pg_temp"]` for both |

**Permission hardening confirmed.** The `REVOKE EXECUTE ... FROM anon, authenticated` statements executed in Phase 3C took effect. Only `postgres` (owner) and `service_role` can execute either function.

---

## B. Complete local verification

All three checks executed locally with actual exit codes:

| Check | Command | Exit code | Result |
|-------|---------|-----------|--------|
| Typecheck (strict) | `npx tsc --noEmit` | 0 | **VERIFIED** — clean |
| Unit tests | `npm test` (vitest run) | 0 | **VERIFIED** — 28/28 pass |
| Production build | `npm run build` | 0 | **VERIFIED** — all steps green |

### Typecheck details
`tsc --noEmit` completed with exit code 0, no errors. `strict: true` is on.

### Test details (28/28 pass)

| File | Tests | Result |
|------|-------|--------|
| `api/lib/rate-limiter.test.ts` | 5 | ✅ Pass (allows under limit, rejects over limit, distinct key per IP, throws RateLimitError on RPC error/fail-closed, throws when Supabase not configured) |
| `api/contact.test.ts` | 7 | ✅ Pass (400 invalid, 200 save, 429 rate-limited, 503 RPC failure fail-closed, 503 DB failure, 200 idempotent duplicate, 503 unconfigured) |
| `api/waitlist.test.ts` | 8 | ✅ Pass (same coverage as contact) |
| `src/lib/validation.test.ts` | 8 | ✅ Pass (pre-existing, untouched) |

### Build details

`npm run build` = `build:client` → `build:server` → `prerender`, all three steps green:

- **build:client** — `tsc -b && vite build --outDir dist/client`: 2303 modules transformed, built in ~11s. One non-fatal warning: some chunks exceed 500 kB after minification (largest: `index-C-Aq06H7.js` at 555.58 kB / 166.31 kB gzip). This is a size warning, not an error; exit code 0.
- **build:server** — `vite build --ssr src/entry-server.tsx --outDir dist/server`: 49 modules transformed, built in ~825ms.
- **prerender** — `tsx scripts/prerender.ts`: 15 routes prerendered (`/`, `/services`, 5 service pages, `/work`, `/products`, `/about`, `/contact`, `/privacy`, `/terms`, `/solutions/websites`, `/solutions/automation`, `/solutions/agents`) + `sitemap.xml` + `robots.txt`.

No local code issues were discovered; no fixes were needed. No re-run required.

---

## C. Rate-limit cleanup inspection

### Verification queries executed (read-only)

```sql
-- pg_cron extension
SELECT extname, extversion FROM pg_extension WHERE extname = 'pg_cron';

-- Cleanup schedules
SELECT schemaname, jobname, jobschedule, jobcommand, jobactive FROM cron.job;
```

### Results

| Check | Classification | Evidence |
|-------|---------------|----------|
| pg_cron extension enabled | **NOT CONFIGURED** | `pg_extension` returned no rows for `pg_cron` |
| Cleanup schedule exists | **NOT CONFIGURED** | `cron.job` relation does not exist (pg_cron not installed) |

**Cleanup is not configured.** Without `pg_cron`, `public.cleanup_rate_limits(interval)` exists but is never invoked automatically. The `rate_limits` table will grow unboundedly (one row per unique `id` = per IP+endpoint+window).

### Recommended setup (requires your approval to apply)

1. Enable `pg_cron` in Supabase (database settings / extensions).
2. Schedule hourly cleanup:

```sql
SELECT cron.schedule(
  'cleanup-rate-limits',
  '0 * * * *',
  $$SELECT public.cleanup_rate_limits(INTERVAL '7 days')$$
);
```

This retains 7 days of rate-limit windows and deletes older rows hourly. Adjust retention interval (`INTERVAL '7 days'`) and cron frequency as needed.

**I will not enable extensions or schedule jobs remotely without your explicit approval.**

---

## D. Release readiness classification matrix

| Area | Item | Classification | Evidence / notes |
|------|------|---------------|------------------|
| **Database schema** | `public.leads` table | VERIFIED | Structure, PK, UNIQUE(email,product) confirmed remotely (Phase 3B) |
| | `public.rate_limits` table | VERIFIED | Structure, PK confirmed remotely (Phase 3B) |
| | Indexes on both tables | VERIFIED | All 6 indexes confirmed remotely |
| **Database functions** | `increment_rate_limit` | VERIFIED | Signature, SECURITY INVOKER, search_path confirmed |
| | `cleanup_rate_limits` | VERIFIED | Signature, SECURITY INVOKER, search_path confirmed |
| **Function permissions** | anon EXECUTE revoked | VERIFIED | `proacl` has no `anon=X` |
| | authenticated EXECUTE revoked | VERIFIED | `proacl` has no `authenticated=X` |
| | PUBLIC EXECUTE revoked | VERIFIED | `proacl` has no `=X` |
| | service_role retains EXECUTE | VERIFIED | `service_role=X/postgres` present |
| **RLS policies** | Leads INSERT open to all | VERIFIED | Policy `Anyone can submit lead` (INSERT, WITH CHECK true) |
| | Leads SELECT denied | VERIFIED | Policy `No one can read leads via client` (USING false) |
| | Rate limits service-role only | VERIFIED | Policy `Service role can manage rate limits` (ALL, service_role) |
| **Application code** | Rate limiter calls Supabase RPC | VERIFIED | `api/lib/rate-limiter.ts` calls `increment_rate_limit` |
| | Fail-closed on RPC failure | VERIFIED | `RateLimitError` → 503, no in-memory fallback |
| | 429 on rate-limit exhaustion | VERIFIED | `res.status(429)` + `Retry-After` |
| | Service-role key only | VERIFIED | No `VITE_SUPABASE_ANON_KEY` fallback in contact/waitlist |
| | No service-role key in frontend | VERIFIED | `process.env.SUPABASE_SERVICE_ROLE_KEY` only in serverless handlers |
| **Local verification** | Typecheck (strict) | VERIFIED | `tsc --noEmit` exit 0 |
| | Unit tests | VERIFIED | 28/28 pass, exit 0 |
| | Production build | VERIFIED | `npm run build` exit 0, all 3 steps green |
| **Cleanup** | pg_cron extension | NOT CONFIGURED | Not installed; `pg_extension` empty |
| | Cleanup schedule | NOT CONFIGURED | `cron.job` does not exist |

### Remaining production blockers

| Blocker | Severity | Required action | Approval needed |
|---------|----------|-----------------|-----------------|
| pg_cron cleanup not configured | Medium (operational, not security) | Enable pg_cron + schedule hourly `cleanup_rate_limits(INTERVAL '7 days')` | **Yes** (remote extension/schedule change) |
| Deploy to Vercel | Required for release | `git push` + Vercel deploy after build verified | **Yes** (production deploy) |

### Exact next steps before production deployment

1. **(Your approval) Enable pg_cron cleanup** — run the `cron.schedule` SQL above via Supabase SQL Editor.
2. **(Your approval) Deploy to Vercel** — `git push` to trigger Vercel deployment. Build is already verified green locally.
3. **Post-deploy smoke test** — verify contact/waitlist APIs return 200 on valid submission and 429/503 appropriately against the live shared rate-limit store.

**No credentials were exposed in this report. No remote database mutations were performed in this session. No deployment was performed.**
