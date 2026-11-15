# ATOMEST_2_ARCHITECTURE.md

**Document status:** Phase 0 — Architecture (target state)  
**Date:** 2026-11-15  
**Supersedes/references:** `docs/ARCHITECTURE.md`, `CLAUDE.md` (existing architecture notes retained where accurate)

This document defines the target architecture for Atomest 2.0: a service-first Digital Solutions & Products Studio website with a dormant-but-ready AI Employee platform. It is organized by system boundary, with explicit in-scope / out-of-scope calls so nothing is built prematurely.

---

## 1. Architecture principles

1. **Service first.** Everything exists to win and deliver the first 2–3 paying clients. No self-service SaaS, no custom billing, no client portal until recurring revenue justifies it.
2. **Client-owned execution.** Automations run in the client's own n8n instance; Atomest never hosts customer workflows or stores customer production data.
3. **External checkout.** Digital products sold via Gumroad (MoR tax, instant delivery, Indian bank payout). No shopping cart or Stripe webhooks built by Atomest.
4. **Reuse what exists.** The marketing site, prerender pipeline, design system, and platform services are retained. New code is additive only.
5. **Zero secrets in browser.** Service-role keys never in client code; `.env` never committed; `.env.example` uses placeholders only.

---

## 2. System context diagram (text)

```
┌─────────────────────────────────────────────────────────────┐
│                      VISITOR / CLIENT                        │
│  (browser)                                                  │
└───────────────┬─────────────────────────────────────────────┘
                │ HTTPS (Vercel Edge + CDN)
┌───────────────▼─────────────────────────────────────────────┐
│  ATOMEST MARKETING SITE  (React 19 + Vite + Tailwind)        │
│  src/pages/*  |  wouter routing  |  prerender (SSG)          │
│  └─ Home, Services, Contact, About, Work, Products, …        │
│  └─ /api/contact → Supabase waitlist/leads (serverless)     │
└───────────────┬─────────────────────────────────────────────┘
                │
   ┌────────────┴─────────────┐   ┌────────────────────────┐
   │  Gumroad checkout embed  │   │  n8n (CLIENT-OWNED)    │
   │  (digital products)      │   │  Speed-to-Lead workflow│
   │  MoR tax + instant DL    │   │  webhook → Sheets/TG   │
   └──────────────────────────┘   └────────────────────────┘
                │
┌───────────────▼─────────────────────────────────────────────┐
│  ATOMEST AI EMPLOYEE PLATFORM  (src/core/) — DORMANT         │
│  Registry → WorkflowEngine → Credits → Jobs → Supabase       │
│  Zero modules today (src/modules/ absent)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Boundary definitions

### 3.1 In scope (build now)
- Marketing site: Home, Services, Contact, About, Work, Digital Products, industry/solution pages, legal pages
- Lead capture: contact form → `api/contact.ts` → Supabase table that exists (`waitlist` or new `leads`)
- Digital Products page + Gumroad embed links (no custom checkout)
- Platform services retained (engine, credits, jobs, registry) but **not publicly exposed** until modules exist

### 3.2 Out of scope (do not build)
- Custom payments / Stripe webhooks / customer portal
- Self-service subscription or credit top-up flow
- Atomest-hosted n8n or automation execution for clients
- Recruiter AI / AI kit generator (`api/generate-kit.ts`, `api/process-candidates.ts`, recruiter prompts) — out of business scope

### 3.3 Deferred (Phase 4+)
- AI Employee modules (`src/modules/<slug>/module.ts`) — build only after first service clients
- Dashboard public access, job history UI, credit balances UI
- Server-side AI path (`api/services/gemini.ts`) — consolidate to client provider or remove

---

## 4. Target stack (unchanged from repo, all free-tier viable)

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | React 19 + Vite 7 + TypeScript 5 | Strict TS |
| Styling | Tailwind CSS v4 + shadcn/ui | Dark theme, `atomest-container` |
| Routing | wouter | SPA; Vercel rewrite to index.html |
| SSR / prerender | Vite SSR + `scripts/prerender.ts` | Static HTML per route + sitemap/robots |
| State | TanStack Query v5 | Credits query only |
| Forms | React Hook Form (contact page uses uncontrolled state) | Keep simple |
| Backend / DB | Supabase (free tier) | Auth + DB + RLS |
| Serverless API | Vercel functions (`api/`) + Express `:3001` local proxy | contact, waitlist |
| AI provider | `@google/genai` (gemini-2.0-flash) client-side | `VITE_AI_PROVIDER=gemini` |
| Automation runtime | Client-owned n8n | Not Atomest infrastructure |
| Digital checkout | Gumroad embed | MoR, UPI, INR payout |
| Deploy | Vercel Hobby | `vercel.json` SPA rewrite + redirects |

---

## 5. Data model (target Supabase schema)

Existing migration `0001` tables are retained (profiles, projects, generation_runs, generation_artifacts, attachments, activity_log). Add:

| Table | Purpose | RLS | Notes |
|-------|---------|-----|-------|
| `waitlist` (or `leads`) | Contact-form / waitlist submissions | INSERT: anon allowed; SELECT: authenticated only | Already defined in migration `0002` but not applied to connected project |
| `jobs` | Workflow job records | Authenticated (user_id) | Platform, deferred until modules |
| `user_credits` | Credit balances | Authenticated | Platform, deferred |
| `credit_transactions` | Credit ledger | Authenticated | Platform, deferred |

**Missing RPCs** to add if credits platform is used: `deduct_credits`, `refund_credits`, `add_credits`.

**Decision:** For launch, only `waitlist`/`leads` is needed. Credits/jobs tables are deferred to Phase 4 (AI platform), consistent with the service-first model.

---

## 6. API surface (target)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/contact` | POST | none | Lead capture; validates; inserts into waitlist/leads |
| `/api/waitlist` | POST | none | Waitlist signup; dedupe on `(email, product)` |

Deprecate/remove: `/api/generate-kit`, `/api/process-candidates` (recruiter scope, out of business focus).

All serverless routes: CORS preflight handled, JSON body, SSE not needed for contact/waitlist (remove SSE overhead from these simple endpoints).

---

## 7. Module contract (when Phase 4 builds AI Employees)

Per `src/core/registry/types.ts`: each module is `src/modules/<slug>/module.ts` exporting `default satisfies AIEmployeeModule`. Auto-discovered via `import.meta.glob`. No manual registration. The engine handles validation, credits, jobs, analytics — modules are pure workflow logic.

**First module candidates (deferred):** Lead Qualification Assistant, Customer Support Assistant. Only build after a paying client requests equivalent automation.

---

## 8. Security posture

- No `SUPABASE_SERVICE_ROLE_KEY` in browser; server routes only
- `.env` gitignored; `.env.example` placeholders
- RLS enabled on all tables; `waitlist` INSERT open to anon, SELECT restricted
- Add: CSP header + `X-Content-Type-Options` + `Referrer-Policy` (via `vercel.json` headers or Vercel Edge Middleware)
- Add: rate limiting on `/api/contact`, `/api/waitlist`
- No secrets or customer PII logged to stdout beyond the inquiry line (contact API logs name/email/solution — acceptable for lead log; avoid logging full message body in production)

---

## 9. Deployment topology

- **Build:** `npm run build` → `tsc -b` → `vite build --outDir dist/client` → SSR build → prerender static HTML
- **Deploy:** Vercel Hobby, connected to GitHub `main`; `vercel.json` buildCommand/outputDirectory/rewrites/redirects
- **Env vars (Vercel):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GA_MEASUREMENT_ID`; server routes need `SUPABASE_SERVICE_ROLE_KEY` if writes bypass RLS
- **Local dev:** `npm run dev` (Vite `:3000` + Express API `:3001`, `/api` proxy)

---

## 10. What this architecture deliberately does NOT include

- No Next.js middleware/CSP (repo is Vite, not Next; the DELIVERY_AUDIT references to `next.config.js` are stale — the repo uses `vercel.json` + Vite)
- No custom ecommerce, no payment gateway, no subscription engine
- No database inventory or download-token manager for digital products (Gumroad handles delivery)
- No Atomest-hosted webhook execution for clients (client n8n provides the webhook URL)

---

*End of architecture. Next: implementation roadmap (ATOMEST_2_IMPLEMENTATION_ROADMAP.md).*
