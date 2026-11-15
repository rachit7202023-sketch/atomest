# Atomest — Phase 4: Production Launch Report

**Deployment authorized:** Yes (user explicit authorization)
**Deployment status:** **BLOCKED** — not deployed to production

---

## §1 Pre-deployment checks

### Git status
- **Branch:** `main`
- **Commit:** `c7101fd` — "Phase 4: Prepare production deployment with Supabase migrations and security hardening" (48 files changed, 6088 insertions, 356 deletions)
- **Push to origin main:** **BLOCKED** — `git push origin main` denied by Claude Code auto mode classifier. Commit exists locally but has not been pushed to GitHub.
- **Remote:** `https://github.com/rachit7202023-sketch/atomest.git`

### Vercel project
- **CLI authenticated:** ✅ (logged in via device code)
- **Linked project:** `atomest` under `rachit7202023-sketchs-projects`
- **Production URL:** `https://www.atomest.com` (previously deployed, exists)
- **Project linked locally:** ✅ (`.env.local` created by `vercel link`)

### Production environment variables (on Vercel)

| Variable | Local .env | Vercel project | Status |
|----------|-----------|----------------|--------|
| `VITE_SUPABASE_URL` | SET | ✅ SET (added during this session) | OK |
| `VITE_SUPABASE_ANON_KEY` | SET | ❌ MISSING | BLOCKED |
| `VITE_AI_PROVIDER` | MISSING (defaults to `gemini`) | ❌ MISSING | NOT SET |
| `SUPABASE_SERVICE_ROLE_KEY` | MISSING | ❌ MISSING | **CRITICAL BLOCKER** |

**`SUPABASE_SERVICE_ROLE_KEY` is missing from both local `.env` and the Vercel project.** This key is required by:
- `api/contact.ts` — saves leads to Supabase via service-role client
- `api/waitlist.ts` — saves signups to Supabase via service-role client
- `api/lib/rate-limiter.ts` — calls `increment_rate_limit` RPC

Without it, contact/waitlist API submissions return fail-closed 503 (safe, but non-functional).

**Environment variable upload blocked:** `vercel env add` commands for `VITE_SUPABASE_ANON_KEY`, `VITE_AI_PROVIDER`, and `SUPABASE_SERVICE_ROLE_KEY` were denied by the Claude Code auto mode classifier (data exfiltration / account-level settings change). I cannot upload local secrets or create new env vars on Vercel.

### Build verification
- `npm run typecheck` (strict): ✅ Clean (exit 0)
- `npm test` (vitest): ✅ 28/28 pass (exit 0)
- `npm run build`: ✅ All 3 steps green (exit 0) — client build, SSR build, prerender (15 routes + sitemap.xml + robots.txt)

---

## §2 Deployment attempt

**Command:** `npx vercel deploy --prod`

**Result:** **DEPLOY FAILED**

```
Error: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan.
Create a team (Pro plan) to deploy more.
```

**Cause:** The Vercel Hobby plan limits deployments to 12 Serverless Functions. The current build generates more than 12 functions (4 API routes in `api/` + SSR functions for each of the 15+ prerendered routes from `dist/server/`).

**Cannot resolve:** User instructed "Do not create a new paid service, change billing, purchase a domain." Upgrading to Vercel Pro would resolve this but is not authorized.

**Deployment ID:** None — deployment did not complete. Preview deployment URL generated but failed: `https://atomest-566wbravy-rachit7202023-sketchs-projects.vercel.app` (failed, not accessible).

---

## §3 Live verification

**Not performed** — deployment did not succeed. No production URL is currently serving the new code. The previous deployment at `https://www.atomest.com` may still be serving older code, but this was not verified.

---

## §4 Rate-limit housekeeping

**pg_cron cleanup schedule:** **NOT CONFIGURED**

- `pg_cron` extension not installed on remote Supabase project `sxofnbooiubztoizkagi`
- `cron.job` relation does not exist
- `cleanup_rate_limits(interval)` function exists but is never auto-invoked
- Without cleanup, `rate_limits` table grows unboundedly (one row per IP+endpoint+window)

**Recommended SQL (requires your approval to execute in Supabase SQL Editor):**
```sql
-- Enable pg_cron extension (via Supabase dashboard → Database → Extensions)
-- Then schedule hourly cleanup retaining 7 days of windows:
SELECT cron.schedule(
  'cleanup-rate-limits',
  '0 * * * *',
  $$SELECT public.cleanup_rate_limits(INTERVAL '7 days')$$
);
```

This is non-critical and should not delay deployment, but should be configured soon.

---

## §5 Remaining production blockers

| Blocker | Severity | Required action | Who can resolve |
|---------|----------|-----------------|-----------------|
| Vercel Hobby plan 12-function limit exceeded | Critical | Upgrade to Vercel Pro OR reduce serverless function count (e.g., disable SSR, deploy as static SPA only) | User (plan change) or code change |
| `SUPABASE_SERVICE_ROLE_KEY` not set on Vercel | Critical | Add via Vercel dashboard → Project → Settings → Environment Variables | User (must provide value) |
| `VITE_SUPABASE_ANON_KEY` not set on Vercel | High | Add via Vercel dashboard | User (must provide value) |
| `VITE_AI_PROVIDER` not set on Vercel | Low | Add `VITE_AI_PROVIDER=gemini` via Vercel dashboard (or rely on default) | User |
| Git push blocked by classifier | Medium | User pushes commit `c7101fd` to `origin/main` manually, or grants push permission | User |
| pg_cron cleanup not scheduled | Medium | Execute recommended SQL in Supabase dashboard | User (approval) |

---

## §6 Actual limitations of the five service divisions

No live integration was tested (deployment failed). The following service pages exist in the codebase but their backend AI integrations are **not verified live**:

1. **AI Voice Receptionist** (`/services/ai-voice-receptionist`) — frontend page exists; AI voice integration not tested
2. **Lead Automation** (`/services/lead-automation`) — frontend page exists; automation workflow not tested
3. **CRM Workflow Automation** (`/services/crm-workflow-automation`) — frontend page exists; CRM integration not tested
4. **AI Customer Support** (`/services/ai-customer-support`) — frontend page exists; support integration not tested
5. **Premium Business Websites** (`/services/premium-business-websites`) — frontend page exists; website generation not tested

**Do not claim any third-party AI integration is live.** These pages render frontend content only until deployment succeeds and APIs are verified.

---

## §7 Exact next steps

1. **User adds env vars via Vercel dashboard** (https://vercel.com/rachit7202023-sketchs-projects/atomest/settings/environment-variables):
   - `VITE_SUPABASE_ANON_KEY` (from local `.env`)
   - `VITE_AI_PROVIDER=gemini`
   - `SUPABASE_SERVICE_ROLE_KEY` (must be obtained separately — not in local `.env`)

2. **User resolves function limit:** Either upgrade to Vercel Pro, or modify build to deploy as static SPA only (avoid SSR functions).

3. **User pushes commit:** `git push origin main` (commit `c7101fd` is local only)

4. **Deploy:** After env vars and function limit are resolved, redeploy via `vercel deploy --prod` or git push-triggered deployment.

5. **Live verification:** Verify production URL returns 200, all routes load, contact form works, API responses correct.

6. **Rate-limit cleanup:** Execute recommended pg_cron SQL (non-blocking).

**No credentials were exposed in this report. No remote data was modified. No deployment succeeded.**
