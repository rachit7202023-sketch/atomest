# ATOMEST_2_IMPLEMENTATION_ROADMAP.md

**Document status:** Phase 0 — Implementation Roadmap (draft, awaiting approval)  
**Date:** 2026-11-15  
**Based on:** `ATOMEST_2_AUDIT.md`, `ATOMEST_2_ARCHITECTURE.md`, existing repo docs

This roadmap sequences work by revenue impact, user value, effort, and risk. Phases 0–3 are launch-critical; Phases 4–6 are deferred until paying customers exist.

**Approval needed before:** any Supabase schema migration to the connected project, any production deploy, any paid service, removal of `generate-kit.ts`/`process-candidates.ts`, and any change to authentication/RLS.

---

## 0. How to read this roadmap

- **Phase 0** (audit/docs) — complete; this document is its output.
- **Phases 1–3** are the launch sequence: get the website conversion-ready and lead capture functional, then close the first clients.
- **Phases 4–6** are intentionally deferred. The AI Employee platform exists as infrastructure but stays dormant until revenue funds it.
- Each phase lists deliverables, the files to touch, and the gate before moving on.

---

## Phase 1 — Foundation (stable technical base)

**Goal:** Make the build reliable, fix the Supabase schema mismatch, harden security, document env vars. No user-facing feature changes.

| # | Task | Files / evidence | Gate |
|---|------|------------------|------|
| 1.1 | Run `npm run typecheck` and `npm run build` locally; fix any errors | repo root; blocked in this session (permission classifier) | Typecheck + build pass |
| 1.2 | Apply missing Supabase migration so `api/contact.ts` / `api/waitlist.ts` have a target table (`waitlist`, per `supabase/migrations/0002_waitlist_schema.sql`) | Connected Supabase project `sxofnbooiubztoizkagi`; migration file exists locally but not applied | A test contact-form submission lands a row in Supabase |
| 1.3 | Add missing placeholder vars to `.env.example`: `SUPABASE_SERVICE_ROLE_KEY`, `VITE_AI_PROVIDER`, `VITE_GA_MEASUREMENT_ID` | `.env.example` (currently 3 vars; code reads more) | `.env.example` documents every env var the code reads |
| 1.4 | Add CSP + security headers to `vercel.json` (`headers` array) | `vercel.json` | Headers present on preview deploy |
| 1.5 | Add basic rate limiting to `/api/contact` and `/api/waitlist` (Express middleware in `scripts/api-server.ts`; Vercel equivalent) | `scripts/api-server.ts`, `api/contact.ts`, `api/waitlist.ts` | No 429 on normal use; rapid requests throttled |
| 1.6 | Add vitest + `test` script; cover contact API validation and credits service | `package.json`, new `src/**/*.test.ts` | `npm test` runs and passes |
| 1.7 | Decide fate of `api/generate-kit.ts` / `api/process-candidates.ts` / recruiter prompts (archive vs remove) — **approval required** | `api/*.ts`, `api/prompts/recruiter-ai.ts` | Decision recorded; files moved/removed |

**Phase 1 deliverable:** Clean build, typecheck passes, contact form works against Supabase, security headers + rate limiting, env documented. No new pages.

---

## Phase 2 — Premium website (conversion-focused marketing)

**Goal:** A site that answers what/ who/ why/ next step, with working lead capture.

| # | Task | Files / evidence |
|---|------|------------------|
| 2.1 | Add service detail pages: `/services/web-development`, `/services/business-automation`, `/services/ai-solutions` (extract copy from `src/pages/Services.tsx`) | New files under `src/pages/services/` |
| 2.2 | Add industry/solution pages: home services, dental/healthcare, restaurants, professional services (copy from `docs/CLIENT_ACQUISITION_PLAYBOOK.md` targeting) | `src/pages/solutions/*` industry pages |
| 2.3 | Add case-study/work page with real, labelled work (Speed-to-Lead architecture as prototype; no fabricated clients) | `src/pages/Work.tsx` (extend) |
| 2.4 | Add pricing/packages page (fixed-price packages: e.g., website, Speed-to-Lead; no "unlimited" promises) | `src/pages/Pricing.tsx` |
| 2.5 | Add legal pages: Privacy Policy, Terms | `src/pages/privacy.tsx`, `src/pages/terms.tsx` |
| 2.6 | Update `AppRouter.tsx` + `Navbar.tsx` for new routes; keep /login,/signup,/dashboard unlinked from public nav | `src/AppRouter.tsx`, `src/components/layout/Navbar.tsx` |
| 2.7 | Verify mobile/tablet/desktop responsiveness; no horizontal overflow; no broken links | All pages |
| 2.8 | SEO: unique title/meta per page, Open Graph, JSON-LD where appropriate | `src/components/seo/SEO.tsx`, Helmet on each page |

**Phase 2 deliverable:** Premium marketing site; every page has SEO metadata; responsive; no broken links or placeholder buttons.

**Gate before Phase 3:** Contact form test submission confirmed stored in Supabase (from Phase 1.2).

---

## Phase 3 — Revenue infrastructure (lead capture + first offers)

**Goal:** Website can generate and capture qualified leads; first sellable offer defined.

| # | Task | Files / evidence |
|---|------|------------------|
| 3.1 | Wire Contact form success to a thank-you/next-steps path; add email notification where SMTP configured | `src/pages/Contact.tsx`, `api/contact.ts` |
| 3.2 | Add admin visibility into submissions (simple Supabase query or dashboard) — authenticated only | New admin route or Supabase table view |
| 3.3 | Package Offer #1: Speed-to-Lead Inbound Sprint ($199 pilot, 48–72h) with proposal + SOP | `templates/speed-to-lead-v1/SALES-PACKAGE.md` (already complete) |
| 3.4 | Add "Book a Discovery Call" primary CTA on Home + Services + pricing; secondary "Explore Services" | Home/Services pages |
| 3.5 | Digital Products: list Speed-to-Lead n8n kit + Notion OS + Prompt Library with Gumroad embed buttons (no prices until product verified) | `src/pages/DigitalProducts.tsx` |
| 3.6 | Set up Gumroad store (external, founder action); add checkout links | External; document in `docs/` |
| 3.7 | Full customer-journey test: submit contact form → Supabase row → success UI → email (if configured) | End-to-end |

**Phase 3 deliverable:** Functional lead capture, first offer priced and documented, digital-products storefront skeleton with external checkout.

**Gate before Phase 4:** At least one paying client OR a firm decision to build the AI platform. Otherwise stop at Phase 3 and sell services/products.

---

## Phase 4 — AI platform (deferred)

**Goal:** Working, demonstrable AI Employee platform — only if revenue justifies.

| # | Task | Files |
|---|------|-------|
| 4.1 | Apply `jobs`, `user_credits`, `credit_transactions` migrations + RPCs (`deduct_credits`/`refund_credits`/`add_credits`) — **approval required** | Supabase migrations; `src/core/credits/`, `src/core/jobs/` |
| 4.2 | Build first AI Employee module(s): Lead Qualification Assistant, Customer Support Assistant | `src/modules/<slug>/module.ts` |
| 4.3 | Wire dashboard to live modules; job history UI | `src/pages/Dashboard.tsx` |
| 4.4 | Credit top-up UI only if a billing model is adopted | Deferred |

**Phase 4 deliverable:** ≥1 live AI Employee module, jobs + credits functional.

---

## Phase 5 — Automation delivery system (internal)

**Goal:** Repeatable delivery for Speed-to-Lead and website clients.

| # | Task |
|---|------|
| 5.1 | Standardize n8n workflow import + credential onboarding checklist (already in `templates/speed-to-lead-v1/DEPLOYMENT-GUIDE.md`) |
| 5.2 | Client handover template: Loom demo, credentials revocation, sign-off |
| 5.3 | Document required env vars per client integration (Google Sheets, Telegram, SMTP) |

**Phase 5 deliverable:** 48-hour delivery runbook usable for every Speed-to-Lead client.

---

## Phase 6 — Quality, SEO, launch

**Goal:** Launch-readiness.

| # | Task |
|---|------|
| 6.1 | Run full test suite, typecheck, production build |
| 6.2 | Lighthouse audit on mobile + desktop; fix performance/SEO |
| 6.3 | Test all routes, redirects, forms, responsive breakpoints |
| 6.4 | Review Vercel production config + env vars (no secrets exposed) |
| 6.5 | Deploy to production **only with user approval** |

---

## Effort & cost estimate (launch, Phases 1–3)

| Item | Effort | Cost |
|------|--------|------|
| Phase 1 foundation | ~2–3 days | $0 |
| Phase 2 website pages | ~5–7 days (copy + components) | $0 |
| Phase 3 lead capture + offers | ~2–3 days | $0 |
| Gumroad setup (external) | ~1 day (founder) | $0 monthly |
| Supabase / Vercel | included | $0 (free tiers) |
| Client n8n (Speed-to-Lead delivery) | client pays | ~$20/mo (client) |

**Total to first lead-capture-ready site: ~1–2 weeks, $0 software cost.** No paid dependency before first paying client.

---

## Risks & open items

- **Supabase schema mismatch** (Phase 1.2) is the top technical risk: contact form fails until `waitlist` exists in connected project.
- Typecheck/build not yet run in this session — environment permission classifier blocked them; must be run locally before committing.
- Vercel project inspection not available in this session — confirm production env vars and deploy settings via Vercel dashboard separately.
- Do not build dashboard/credits/modules until a paying client exists (avoids dead code).

---

## Immediate next step (this session)

Present this roadmap for approval. Safe to proceed now: documentation (done), local typecheck/build once permissions allow, and Phase 1.2 Supabase migration **only after** you confirm approval to modify the connected project.
