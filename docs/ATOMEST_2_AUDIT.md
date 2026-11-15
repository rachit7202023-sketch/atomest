# ATOMEST_2_AUDIT.md

**Document status:** Phase 0 — Audit & Strategy (complete)  
**Date:** 2026-11-15  
**Repository:** `C:\Users\Rachit Sikka\Documents\GitHub\atomest` (branch `main`)  
**Connected Supabase (read-only):** `sxofnbooiubztoizkagi` → https://sxofnbooiubztoizkagi.supabase.co  
**Vercel inspection:** not available in this session (permission denied; see "Verification limitations").

This is an evidence-based audit of the Atomest codebase. Every claim is grounded in inspected files, migrations, or read-only MCP resource inspection. Assumptions and unknowns are explicitly labelled.

---

## 1. Executive summary

Atomest is a hybrid codebase: a React + Vite + Tailwind marketing site (SPA prerendered, deployed to Vercel) plus an "AI Employee" platform (`src/core/`) with a registry-driven workflow engine, credits, jobs, and Supabase-backed services.

**Bottom line:** The marketing site is substantially complete and conversion-ready (Home, Services, Contact, About, Work, Digital Products, solution pages). The AI Employee platform infrastructure is fully implemented but **unused** — `src/modules/` does not exist, so the registry auto-discovers zero modules and the dashboard renders nothing live. The connected Supabase project schema is **incomplete** relative to what the code expects: only the 6 tables from migration `0001` exist (all empty, RLS enabled). The `waitlist`, `jobs`, `user_credits`, and `credit_transactions` tables plus the `deduct_credits`/`refund_credits`/`add_credits` RPCs are **absent**, so `api/contact.ts`, `api/waitlist.ts`, and the workflow engine will fail at runtime against the connected project.

The business documentation already defines a sound, revenue-first direction: a Digital Solutions & Products Studio (services + low-ticket digital products), with Speed-to-Lead ($199 pilot, 48–72h) as the first sellable offer and Gumroad recommended for digital products. No paid dependency is required to acquire the first 2–3 clients.

---

## 2. Evidence base & methodology

| Source | What was inspected |
|--------|-------------------|
| Repo file tree | `src/`, `api/`, `supabase/migrations/`, `templates/`, `archive/`, `docs/`, `public/`, root config |
| Config | `package.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json`, `.env.example`, `.env.local`, `replit.md` |
| Project docs | `CLAUDE.md`, `ATOMEST_FINAL_OPERATING_MODEL.md`, `ATOMEST_LAUNCH_IMPLEMENTATION_PLAN.md`, `DELIVERY_AUDIT.md`, `DELIVERY_AUDIT_V2.md`, all 7 `docs/*.md` |
| Source (full reads) | `App.tsx`, `AppRouter.tsx`, `Navbar.tsx`, all `src/pages/*`, `src/core/{workflow,registry,ai,credits,jobs,analytics,errors,feature-flags}`, `src/hooks/use-modules.ts`, `src/hooks/use-credits.ts`, `src/lib/supabase.ts`, all `api/*.ts` and `api/services/*.ts` |
| Supabase MCP | `list_tables(schema=public, verbose=true)` — read-only; project URL via `get_project_url` |
| Vercel MCP | `list_projects` — **denied** by environment permission classifier |

**Verification limitations:**
- `npm run typecheck` and `npm run build` could not be executed in this session — the environment's auto permission classifier blocked Bash commands that would read/write around `.env` (which holds real credentials). Type-check and production-build verification remain a required local step before any commit (see roadmap).
- `.env` exists locally with real values; it was not read or printed, per policy. `.env.example` was read and is incomplete (see §7.3).

---

## 3. What works (production-grade, retained)

### 3.1 Marketing website
| Area | Evidence |
|------|----------|
| Pages & routing | `src/AppRouter.tsx` (wouter): `/`, `/services`, `/work`, `/products`, `/digital-products`, `/about`, `/contact`, `/solutions/{websites,automation,agents}`, `/auth/*`, `/dashboard`, `/not-found`; legacy redirects included |
| Home page | `src/pages/Home.tsx` — hero, 3 service pillars (Web Development / Business Automation / AI Solutions), who-we-help, value props, how-we-work, architectural prototypes clearly labelled as blueprints, integrity notice (no fabricated testimonials) |
| Services | `src/pages/Services.tsx` — per-pillar problem/deliverables/scope with client responsibilities; outcome-oriented copy |
| Contact / lead capture | `src/pages/Contact.tsx` — form with client-side validation, solution preselection from URL param, success/error states; posts to `/api/contact` |
| `api/contact.ts` | POST endpoint, email regex validation, writes to Supabase `waitlist`, returns JSON `{success, message, saved}` |
| About / Work / Digital Products | `src/pages/About.tsx`, `Work.tsx`, `DigitalProducts.tsx` implemented; Digital Products lists 3 products (all pre-launch/"in verification", no fake prices) |
| Navigation | `src/components/layout/Navbar.tsx` — desktop + mobile drawer, Solutions dropdown, Products link; auth pages exist as routes but are **not** linked from public nav (consistent with operating model) |
| SEO | `src/components/seo/{SEO,GoogleAnalytics}.tsx`, Helmet on all pages, `vite.config.ts` injects GTAG in production, `scripts/prerender.ts` generates static HTML + `sitemap.xml` + `robots.txt` for 8 routes |
| Styling | Tailwind v4, dark theme (`#08090D`), custom `ThemeProvider` (`storageKey="atomest-theme"`), shadcn/ui component library, lucide-icons, framer-motion |

### 3.2 AI Employee platform (infrastructure complete, zero modules)
| Component | Evidence |
|-----------|----------|
| Workflow engine | `src/core/workflow/engine.ts` — validation → credits check → job creation → async execute → deduct/refund → analytics; `workflowEngine` singleton |
| Credits service | `src/core/credits/credits-service.ts` — `canRun`/`deduct`/`refundOnFailure`/`getBalance`/`getUserCredits`/`addCredits` via Supabase RPCs |
| Job service | `src/core/jobs/job-service.ts` — `create`/`update`/`getById`/`getByUser`/`getByModule`, snake_case ↔ camelCase mapping |
| Registry | `src/core/registry/discovery.ts` — `import.meta.glob('src/modules/*/module.ts')` auto-registration; `getModule`/`getVisibleModules`/`getLiveModules`/`getModulesByCategory` |
| Module contract | `src/core/registry/types.ts` — full `AIEmployeeModule` interface |
| AI provider | `src/core/ai/providers/gemini.ts` (@google/genai, gemini-2.0-flash), `providers/index.ts` (`VITE_AI_PROVIDER`); OpenAI is a throwing stub |
| Analytics | `src/core/analytics/analytics-service.ts` — gtag wrapper, workflow lifecycle events |
| Auth | `src/contexts/AuthContext.tsx` (Supabase), `ProtectedRoute.tsx`, `AuthGate.tsx`, `DashboardLayout.tsx` |
| Supabase schema | 6 tables from migration `0001` (profiles, projects, generation_runs, generation_artifacts, attachments, activity_log), all RLS enabled, `handle_new_user` profile trigger |

### 3.3 Sellable asset already in repo
`templates/speed-to-lead-v1/` contains a complete, client-owned, n8n-based Speed-to-Lead offer:
- `workflow.json` — webhook ingest → validation/sanitization (honeypot, email regex) → if-branch → Google Sheets upsert → Telegram/Slack/email
- `test-suite.json` — 10 test cases (happy path, missing fields, duplicates, consent, network failure)
- `DEPLOYMENT-GUIDE.md` — 3 deployment options (n8n Cloud $20/mo, Railway/Render ~$5/mo, Make.com), credential spec, 48-hour runbook
- `SALES-PACKAGE.md` — $199 pilot pricing, proposal template, onboarding checklist, outreach templates, 2-minute demo script
- `AUDIT-REPORT.md` — workflow self-audit

This is the strongest near-term revenue asset: fully documented, tested, zero Atomest hosting liability (client owns n8n instance).

---

## 4. What is partially implemented

| Item | State | Gap |
|------|-------|-----|
| Dashboard | Routes + layout + hooks exist; ProtectedRoute guards it | `src/modules/` missing → registry returns zero modules → dashboard shows no employees, credits never load (credits table absent too) |
| Digital Products storefront | Page lists 3 product concepts | No checkout integration (Gumroad/Lemon Squeezy), no prices, no downloadable files, no "alert me" capture wired to backend |
| AI provider layer | Gemini client-side implemented; OpenAI stub | Only gemini usable; two disjoint AI paths (client `src/core/ai/` vs server `api/services/gemini.ts` using `GOOGLE_GENERATIVE_AI_API_KEY`) |
| `api/generate-kit.ts` & `api/process-candidates.ts` | SSE endpoints implemented | Recruiter/AI-kit use case is out of scope per operating model; `generate-kit.ts` reads `GOOGLE_GENERATIVE_AI_API_KEY` and imports `api/services/generateKit.ts` (exists) |

---

## 5. What is broken (verified against connected Supabase)

These will fail at runtime against the currently connected project:

1. **`api/contact.ts`** inserts into Supabase table `waitlist` — **table does not exist** in connected project (only `0001` tables exist; migration `0002_waitlist_schema.sql` was not applied). Form submissions will error.
2. **`api/waitlist.ts`** inserts into `waitlist` — same missing table.
3. **Workflow engine** reads/writes `jobs`, `user_credits`, `credit_transactions` and calls RPCs `deduct_credits`/`refund_credits`/`add_credits` — **none exist** in connected project. `canRun()` will fail on first workflow execution.
4. **Contact API key selection**: uses `SUPABASE_SERVICE_ROLE_KEY || VITE_SUPABASE_ANON_KEY`; `SUPABASE_SERVICE_ROLE_KEY` is not in `.env.example` and may not be set.
5. **RLS**: `waitlist` (if created) has a "No one can read waitlist via client" SELECT policy; inserts are allowed for anon. Server-side writes need service role or adjusted RLS.
6. **No `src/modules/` directory** — registry glob resolves to empty; this is not a runtime error but means the platform's core feature delivers nothing.

Confirmed via MCP `list_tables`: connected `public` schema contains exactly `profiles, projects, generation_runs, generation_artifacts, attachments, activity_log` — 6 tables, 0 rows each, RLS enabled. `waitlist`, `candidates`, `jobs`, `user_credits`, `credit_transactions` are absent.

---

## 6. What is missing

### 6.1 Pages / conversion
- Individual service detail pages (only `/services` overview + tech-division solution pages exist)
- Industry / Solutions pages (HVAC, dental, healthcare, local services, professional services) — none exist
- Case studies / portfolio with real evidence (Work page is minimal; policy: no fabricated testimonials)
- Pricing / packages page
- Legal pages: Privacy Policy, Terms of Service
- Discovery-call booking flow (contact form exists; no calendar/scheduling integration)

### 6.2 Platform
- Zero AI Employee modules (`src/modules/` absent)
- No credit top-up / billing UI (intentionally premature per service-first model)
- No job-history UI for end users
- No file upload pipeline wired to modules

### 6.3 Operations / quality
- No test runner, no lint script, no `test` script in `package.json` (playwright in devDependencies but unconfigured)
- No CSP / security headers middleware (noted missing in DELIVERY_AUDIT_V2.md)
- No rate limiting on API routes
- No shared server-side validation layer (Zod) for API endpoints
- `.env.example` incomplete (missing `SUPABASE_SERVICE_ROLE_KEY`, `VITE_AI_PROVIDER`, `VITE_GA_MEASUREMENT_ID`)

---

## 7. Recommendations: retain / improve / remove

### 7.1 Retain (do not rewrite)
- Marketing site structure, design system, and all public pages — high quality, conversion-ready
- Prerender + sitemap/robots + Vercel SPA rewrite (`vercel.json`)
- Platform services: engine, credits, jobs, registry, analytics, storage (keep for when modules are built)
- Supabase `0001` auth/profile schema (profiles + `handle_new_user` trigger)
- `templates/speed-to-lead-v1` sales & delivery package (first revenue asset)

### 7.2 Improve
1. **Fix Supabase schema mismatch** — apply/create migrations so `waitlist` (for contact/waitlist APIs) exists in the connected project. Only if the dashboard/credits platform is to be used, also add `jobs`, `user_credits`, `credit_transactions` + RPCs. **Requires user approval** (schema change to connected project).
2. **Make `api/contact.ts` write to a dedicated `leads`/`waitlist` table that exists**, with server-side validation and proper response shape.
3. **Add `.env.example` entries** for `SUPABASE_SERVICE_ROLE_KEY`, `VITE_AI_PROVIDER`, `VITE_GA_MEASUREMENT_ID` (placeholders only).
4. **Add CSP + security headers** (Vercel headers in `vercel.json` or edge middleware) and basic rate limiting.
5. **Add a lightweight test setup** (vitest) + `test` script; at minimum cover `api/contact.ts` validation and credits service logic.

### 7.3 Remove / quarantine (per operating model)
- `api/generate-kit.ts`, `api/process-candidates.ts`, `api/prompts/recruiter-ai.ts` — recruiter/AI-kit use case is out of scope for Atomest studio; either archive to `archive/` or remove. `generate-kit.ts` also imports `GOOGLE_GENERATIVE_AI_API_KEY` (server key) which creates a second, untracked AI path.
- Legacy free tools already in `archive/` — keep archived, do not resurrect.
- Do **not** build custom checkout, Stripe webhooks, or client portal (operating model: external checkout via Gumroad/Lemon Squeezy; service delivery via client-owned n8n).

---

## 8. Technical risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Connected Supabase schema missing tables/RPCs the code references | Contact form + workflow engine fail at runtime | Apply missing migrations before launch; verify with a test submission |
| Server API key selection ambiguous (service role vs anon key) | Writes may be blocked by RLS | Document required keys in `.env.example`; use service role for server routes only |
| Two disjoint AI provider paths (client gemini vs server `api/services/gemini.ts`) | Confusion, duplicated cost, unmaintained code | Consolidate to client-side `src/core/ai/` provider; deprecate legacy server gemini path |
| Credits/jobs platform with zero modules | Dead code, false impression of capability | Do not link dashboard publicly until ≥1 module exists; treat platform as Phase 4 |
| No tests / no lint | Regressions ship undetected | Add vitest + lint in Phase 0/6 |
| `.env` holds real credentials locally (gitignored) | Accidental commit risk | `.env` already in `.gitignore`; never commit; CI must inject its own |

---

## 9. Business opportunities (grounded in repo docs)

1. **Speed-to-Lead Inbound Sprint ($199 pilot, 48–72h)** — fully packaged n8n workflow with test suite, deployment guide, sales package. First paying client offer. Client owns n8n (n8n Cloud $20/mo or Railway ~$5/mo paid by client); Atomest has zero hosting liability.
2. **Website & conversion upgrade ($500–$1,200)** — per Client Acquisition Playbook; the existing marketing site is itself the reference build.
3. **Digital products (Gumroad recommended)** — Speed-to-Lead n8n kit, SMB Notion OS, grounded prompt library; Gumroad handles MoR tax + Indian bank payout + UPI; no custom billing.
4. **Target segments** (per playbook): boutique professional services, home/HVAC contractors, medical/aesthetic clinics, small B2B agencies — fast decision-makers, measurable ROI.
5. **Flywheel** — product buyers become service clients; service builds become packaged products.

---

## 10. Dependencies & cost implications (first 6 months, ₹0 upfront)

| Capability | Choice | Cost |
|------------|--------|------|
| Website hosting | Vercel Hobby | $0 |
| DNS / domain | Registrar (client or Atomest) | ~$12/yr (optional) |
| Database / auth | Supabase Free | $0 |
| AI (Gemini) | Free tier | $0 within quota |
| Workflow execution for clients | Client-owned n8n (Cloud/Render) | $0–$20/mo paid by client |
| Digital product checkout | Gumroad | $0 monthly, ~10% + $0.50/txn |
| Invoicing | Stripe / Wise / UPI | Transaction fees only |
| Monitoring | None initially (n8n built-in alerts) | $0 |

**No paid dependency required before first paying client.** Recurring costs are either $0 or passed to the client.

---

## 11. Verification status

| Check | Status | Note |
|-------|--------|------|
| Repo structure audit | Complete | Full file tree inspected |
| Source reads | Complete | All key files read |
| Supabase schema (read-only) | Complete | 6 tables exist; `waitlist`/`jobs`/`user_credits` missing |
| TypeScript typecheck | **Not run** | Blocked by environment permission classifier; run `npm run typecheck` locally |
| Production build | **Not run** | Blocked by environment permission classifier; run `npm run build` locally |
| Contact form end-to-end | **Not verified** | `waitlist` table missing → will fail against connected project until migrated |

---

## 12. Related existing docs (do not duplicate)

- `ATOMEST_FINAL_OPERATING_MODEL.md` — business model (services + products)
- `ATOMEST_LAUNCH_IMPLEMENTATION_PLAN.md` — 13-day website implementation timeline
- `DELIVERY_AUDIT.md` / `DELIVERY_AUDIT_V2.md` — service feasibility matrix & playbooks
- `docs/CLIENT_ACQUISITION_PLAYBOOK.md` — 14-day outreach sprint
- `docs/CLIENT_SERVICE_AGREEMENT_TEMPLATE.md` — fixed-price agreement
- `docs/PAYOUT_AND_CHECKOUT_ASSESSMENT.md` — Gumroad vs Lemon Squeezy for India
- `templates/speed-to-lead-v1/*` — Speed-to-Lead workflow, tests, deployment, sales package

---

*End of audit. Next: architecture (ATOMEST_2_ARCHITECTURE.md) and implementation roadmap (ATOMEST_2_IMPLEMENTATION_ROADMAP.md).*
