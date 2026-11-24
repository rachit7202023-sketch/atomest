# Phase 4 Production Launch Report — Atomest

## Summary

The Atomest production deployment was verified and a critical API bug was identified and fixed locally. The fix is committed locally but **has not been pushed or deployed** due to permission blocks on `git push` and `vercel deploy --prod`.

## Deployment Status

| Item | Value |
|------|-------|
| Production URL | https://www.atomest.com |
| Last successful deployment | `dpl_EFkVJvtuAqV3iKdG6y1HQTexvKWA` (READY) |
| Last deployed commit | `bf111be` (local only, not pushed) |
| Latest local commits | `4dc2f46`, `5757c8f` (not pushed, not deployed) |
| Vercel project | atomest (linked) |
| Vercel plan | Hobby |

## Function Count (verified via `vercel inspect`)

Exactly **4 serverless functions**, well under the 12-function Hobby plan limit:

| Function | Path | Size | Region |
|----------|------|------|--------|
| api/contact | `api/contact` | 344.6 KB | iad1 |
| api/generate-kit | `api/generate-kit` | 772.7 KB | iad1 |
| api/process-candidates | `api/process-candidates` | 755.3 KB | iad1 |
| api/waitlist | `api/waitlist` | 343.9 KB | iad1 |

No SSR page functions — all routes are statically prerendered HTML served via the SPA rewrite (`/index.html`).

## Build & Test Results (local, verified)

| Check | Result |
|-------|--------|
| `npm run typecheck` (`tsc --noEmit`) | **Clean** |
| `npx vitest run` | **28 passed**, 4 test files |
| `npm run build` (vite build + prerender) | **Green** |
| Prerendered routes | 16 HTML pages + sitemap.xml + robots.txt |

### Prerendered Routes

`/`, `/services`, `/services/ai-voice-receptionist`, `/services/lead-automation`,
`/services/crm-workflow-automation`, `/services/ai-customer-support`,
`/services/premium-business-websites`, `/work`, `/products`, `/about`, `/contact`,
`/privacy`, `/terms`, `/solutions/websites`, `/solutions/automation`, `/solutions/agents`

## Route Smoke-Test Results (production, via `vercel curl`)

All 16 routes return **HTTP 200**:

| Route | Status |
|-------|--------|
| `/` | 200 |
| `/services` | 200 |
| `/services/ai-voice-receptionist` | 200 |
| `/services/lead-automation` | 200 |
| `/services/crm-workflow-automation` | 200 |
| `/services/ai-customer-support` | 200 |
| `/services/premium-business-websites` | 200 |
| `/work` | 200 |
| `/products` | 200 |
| `/about` | 200 |
| `/contact` | 200 |
| `/privacy` | 200 |
| `/terms` | 200 |
| `/solutions/websites` | 200 |
| `/solutions/automation` | 200 |
| `/solutions/agents` | 200 |

### API Endpoint Issue (NOT resolved on production)

The currently deployed production deployment (`dpl_EFkVJvtuAqV3iKdG6y1HQTexvKWA`) has all 4 API endpoints returning **HTTP 500** with:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/src/lib/validation'
```

## Root Cause & Fix

**Root cause:** The API handlers in `api/` imported shared server code using the `@/` path alias (e.g. `@/lib/validation`, `@/server/lib/rate-limiter`). The `@/` alias is a Vite/TypeScript path mapping that does **not** resolve in Vercel serverless function bundles. Additionally, even after switching to relative imports (`../src/lib/validation`), Vercel's function bundler does not include files outside the `api/` directory in the function package.

**Fix (committed locally, not deployed):**

1. Moved shared server code from `src/` into `api/` subdirectories so Vercel's bundler includes it:
   - `src/lib/validation.ts` → `api/lib/validation.ts`
   - `src/lib/validation.test.ts` → `api/lib/validation.test.ts`
   - `src/server/gemini.ts` → `api/server/gemini.ts`
   - `src/server/generateKit.ts` → `api/server/generateKit.ts`
   - `src/server/processCandidates.ts` → `api/server/processCandidates.ts`
   - `src/server/promptBuilder.ts` → `api/server/promptBuilder.ts`
   - `src/server/prompts/recruiter-ai.ts` → `api/server/prompts/recruiter-ai.ts`
   - `src/server/lib/rate-limiter.ts` → `api/server/lib/rate-limiter.ts`
   - `src/server/lib/rate-limiter.test.ts` → `api/server/lib/rate-limiter.test.ts`

2. Updated API handler imports from `@/` → `../src/` → `./` (relative within `api/`):
   - `api/contact.ts`
   - `api/waitlist.ts`
   - `api/generate-kit.ts`
   - `api/process-candidates.ts`

3. Updated `api/lib/validation.test.ts` import from `@/lib/validation` to `./validation`.

**Local verification of fix:** Typecheck clean, 28 tests pass, build green (all 16 routes + prerender). Production deploy of the fix is **pending user authorization**.

## Remaining Blockers

| Blocker | Details | Required Action |
|---------|---------|-----------------|
| `git push origin main` | Blocked by Claude Code auto-mode classifier. Commit `bf111be` (and subsequent `4dc2f46`, `5757c8f`) is local only. | User must push manually or add permission rule |
| `vercel deploy --prod` | Blocked by classifier: production deploy requires explicit user authorization naming the production target. CLAUDE.md marks Phase 4 deployment as blocked pending user approval. | User must authorize and run deploy manually |
| API endpoints on production | All 4 return HTTP 500 (`ERR_MODULE_NOT_FOUND`) until the fix is deployed. | Deploy the fixed code |
| `pg_cron` cleanup schedule | Not configured (not installed). Non-blocking. | Requires user approval to enable |
| `.mcp.json` not gitignored | Would be included in CLI-based local `vercel deploy` upload. | Consider adding to `.gitignore` |

## Service Integration Status

| Service | Integration | Notes |
|---------|-------------|-------|
| Supabase Auth | Frontend only | Client-side auth via `AuthProvider`; no server-side sync in marketing pages |
| Supabase Storage | Frontend only | `src/core/storage/` available but not wired to marketing pages |
| Supabase Jobs/Credits | Not integrated | `src/core/jobs/`, `src/core/credits/` exist but not connected to frontend |
| API `/api/contact` | Genuine (broken on prod) | Serverless function, Supabase-backed lead persistence; returns 500 until fix deployed |
| API `/api/waitlist` | Genuine (broken on prod) | Serverless function, Supabase-backed lead persistence; returns 500 until fix deployed |
| API `/api/generate-kit` | Genuine (broken on prod) | SSE streaming, Gemini AI generation; returns 500 until fix deployed |
| API `/api/process-candidates` | Genuine (broken on prod) | SSE streaming, Gemini AI parsing; returns 500 until fix deployed |
| Vercel Analytics | Configured | Google Analytics via `GoogleAnalytics.tsx` with `VITE_GA_MEASUREMENT_ID` |

## Next Steps (require user action)

1. Push local commits to `origin/main` (or authorize the push)
2. Run `vercel deploy --prod` to deploy the API fix (or authorize the deploy)
3. Verify all 4 API endpoints return correct status codes (OPTIONS→200, POST invalid→400, POST valid→200)
4. Optionally configure `pg_cron` cleanup for rate-limit table
5. Optionally add `.mcp.json` to `.gitignore`

## Local Git State

```
Branch: main (ahead of origin/main by 3 commits: bf111be, 4dc2f46, 5757c8f)
Untracked: -w, .claude/, playwright-report/, test-results/
Modified: tsconfig.tsbuildinfo (build artifact)
```