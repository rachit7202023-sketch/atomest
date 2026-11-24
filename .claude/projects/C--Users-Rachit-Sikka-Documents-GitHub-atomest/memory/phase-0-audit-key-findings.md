---
name: phase-0-audit-key-findings
description: Consolidated evidence from Phase 0 audit of the Atomest codebase
metadata:
  type: project
---

# Phase 0 Audit — Key Findings (Atomest 2.0)

## Evidence base
- Full repo file listing (src, api, templates, supabase/migrations, archive, docs, public)
- Read: CLAUDE.md, package.json, vercel.json, tsconfig.json, vite.config.ts, .env.example, .env.local, replit.md
- Read: ATOMEST_FINAL_OPERATING_MODEL.md, ATOMEST_LAUNCH_IMPLEMENTATION_PLAN.md, DELIVERY_AUDIT.md, DELIVERY_AUDIT_V2.md, docs/* (7 files)
- Read all public pages, AppRouter, Navbar, core engine/registry/services, hooks, all api files, supabase migrations
- MCP Supabase read-only: project `sxofnbooiubztoizkagi` (https://sxofnbooiubztoizkagi.supabase.co), public schema has exactly 6 tables — profiles, projects, generation_runs, generation_artifacts, attachments, activity_log. ALL empty (0 rows), RLS enabled.
- MCP Vercel list_projects: denied by environment (needs user permission rule).
- `npm run typecheck` / build: denied by environment auto classifier (`.env` holds real credentials); could not execute. Flagged as pending local verification.

## What works
- Marketing site: Home, Services, Contact, About, Work, DigitalProducts, solutions/{websites,automation,agents}, auth/{Login,Signup,Account}, not-found — all implemented, wouter routing, lazy-loaded, Helmet SEO, Tailwind dark theme
- Contact form → POST /api/contact → Supabase `waitlist` (client+server validation, success/error UI)
- /api/waitlist, /api/generate-kit, /api/process-candidates SSE endpoints implemented
- scripts/api-server.ts (Express :3001) adapts Vercel handlers for local dev; vite proxies /api → :3001
- scripts/prerender.ts statically renders 8 routes + sitemap.xml + robots.txt; vercel.json SPA rewrite + redirects
- Platform code complete but unused: WorkflowEngine, creditsService, jobService, analyticsService, storageService, registry discovery, gemini provider (client), legacy server gemini service
- Supabase client (anon key only), profiles table with auth trigger handle_new_user

## Partially implemented
- Dashboard: registry-driven, ProtectedRoute + DashboardLayout exist; use-modules/use-credits hooks exist — but src/modules/ does NOT exist, so registry glob resolves to zero modules; dashboard shows nothing live
- Digital Products page: 3 products listed as "in verification/design/research", no checkout integration, no prices, no files
- Work page: minimal, no real portfolio

## Broken
- api/contact.ts and api/waitlist.ts write to Supabase `waitlist` table → table does NOT exist in connected project → runtime failure on form submission
- Workflow engine reads/writes `jobs`, `user_credits`, `credit_transactions` tables and RPCs `deduct_credits`/`refund_credits`/`add_credits` → none exist in connected project
- .env.example missing vars actually read by code: SUPABASE_SERVICE_ROLE_KEY, VITE_AI_PROVIDER, VITE_GA_MEASUREMENT_ID
- generate-kit.ts depends on GOOGLE_GENERATIVE_AI_API_KEY (server-side) while client provider uses VITE_AI_PROVIDER/gemini — two disjoint AI paths, no single source of truth

## Missing
- Individual service detail pages; industry/solution pages (only tech-division pages exist); case studies; pricing page; legal pages (privacy/terms)
- No src/modules/ → zero AI Employee modules registered
- No CSP middleware, no rate limiting, no shared validation layer
- No test runner, no lint script, no `test` script
- Digital products have no checkout (Gumroad/Lemon Squeezy) integration

## Retain / improve / remove
- Retain: marketing site structure, dark design system, contact flow, prerender/SEO, platform services (engine, credits, jobs, registry), Supabase auth schema (profiles)
- Improve: contact API to write to a proper leads table; add missing env docs; add CSP/rate limiting; add tests
- Remove/quarantine: api/generate-kit.ts + api/process-candidates.ts + recruiter-ai legacy code (recruiter use case out of scope per operating model); archive legacy free tools (already in archive/)

## Technical risks
- Connected Supabase schema incomplete vs code expectations (missing waitlist/jobs/user_credits/credit_transactions + RPCs) — migrations 0002/0003 not applied to connected project
- Server-side API uses anon key (or service role) inconsistently; RLS on waitlist would block anon inserts unless policy allows
- Credits/jobs platform has no modules → dead code until modules built; credit system is premature for service-first model (per operating model)
- No secrets in repo (.env gitignored) but .env.example incomplete

## Business opportunities
- Speed-to-Lead n8n v1 workflow is fully packaged (templates/speed-to-lead-v1: workflow.json, test-suite.json, DEPLOYMENT-GUIDE.md, SALES-PACKAGE.md, AUDIT-REPORT.md) — $199 pilot, 48–72h delivery, client-owned n8n
- Client Acquisition Playbook: 14-day outreach sprint, $500–$1,200 websites + $400–$800 Speed-to-Lead
- Gumroad recommended for digital products (India payout, UPI, MoR); $39–$99 price points
- Positioning: Digital Solutions & Products Studio (services + products), not generic AI agency

## Cost implications (free tier feasible)
- Vercel Hobby (site), Supabase Free (DB/auth), n8n client-owned ($20/mo client pays), Gumroad (0 monthly, ~10%/txn), Google Gemini free tier
- No paid dependency required to launch first 2–3 clients