# Premium Business Websites — Delivery Kit

**Division:** E — Premium Business Websites  
**Status:** Reusable implementation asset (React + Vite + Tailwind + shadcn/ui)  
**Owner:** Delivery Team  
**Version:** 1.0

## 1. Architecture

Premium marketing website built on the Atomest stack: React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui, with Wouter client-side routing, static prerendering for SEO, and optional Supabase integration for forms.

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Visitor   │────▶│  Vercel Edge /   │────▶│  Static HTML    │
│  (Browser)  │     │  CDN (prerender) │     │  + JS Hydration │
└─────────────┘     └──────────────────┘     └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  API (Vercel)   │
                                              │  /api/contact   │
                                              │  /api/waitlist  │
                                              └────────┬────────┘
                                                       │
                                              ┌────────▼────────┐
                                              │  Supabase       │
                                              │  (leads table)  │
                                              └─────────────────┘
```

## 2. Workflow

1. **Discovery** — Business goals, target audience, brand preferences, required pages, conversion actions.
2. **Design system** — Typography, color palette, spacing, components (defined in Figma + implemented as Tailwind config).
3. **Page build** — Home, services (5 divisions), about, work, digital products, contact, privacy, terms.
4. **Content integration** — Copy, images, case studies (concept demonstrations only, no fabricated claims).
5. **Forms & integration** — Contact form → `/api/contact`; waitlist → `/api/waitlist`; Supabase `leads` table.
6. **SEO** — Meta tags, sitemap.xml, robots.txt, structured data, prerendered static HTML.
7. **Testing** — Cross-browser, mobile, accessibility, form submission end-to-end.
8. **Launch** — Deploy to Vercel; connect custom domain; configure analytics (optional).
9. **Handoff** — Content management instructions, domain/DNS docs, form endpoint docs.

## 3. Configuration Requirements

| Item | Who Provides | Notes |
|------|-------------|-------|
| Domain name | Client | Purchased and managed by client |
| Vercel project | Client or Atomest | Deployment host |
| Supabase project | Client | For form storage (leads table) |
| Brand assets (logo, colors) | Client | Optional; Atomest can develop |
| Copy/content | Client or Atomest | Copy provided by client or drafted by Atomest |
| Images | Client | Atomest does not provide stock photography |

## 4. Deployment Instructions

1. Clone repository; install dependencies (`npm install`).
2. Configure `.env` with `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-side).
3. Apply `supabase/migrations/0004_leads_schema.sql` to Supabase.
4. Build: `npm run build` (client + SSR + prerender).
5. Deploy to Vercel (connect GitHub repo or Vercel CLI).
6. Configure custom domain in Vercel dashboard.
7. Set environment variables in Vercel (server-side keys only).
8. Test contact form end-to-end: submission → Supabase lead → email notification.
9. Configure analytics (optional, GA4 measurement ID).
10. Hand over to client with admin access.

## 5. Testing Procedure

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| Homepage loads | < 3 seconds on 4G | |
| All routes load without 404 | 200 for all prerendered routes | |
| Contact form valid submission | 200, lead in Supabase | |
| Contact form invalid data | 400, validation errors shown | |
| Mobile layout | Usable at 375px width | |
| Keyboard navigation | Tab order logical, focus visible | |
| Color contrast | WCAG AA minimum | |
| Sitemap.xml accessible | Valid XML at /sitemap.xml | |
| robots.txt accessible | Valid at /robots.txt | |

## 6. Handoff Documentation

- Vercel project URL and admin access
- Custom domain DNS configuration
- Supabase project URL and `leads` table schema
- Environment variable reference (which are server-side only)
- Content editing guide (how to update copy, images)
- Form endpoint documentation (`/api/contact`, `/api/waitlist`)
- Deployment instructions (`npm run build`, Vercel)
- Support contact for Atomest

## 7. Maintenance Requirements

| Task | Frequency | Owner |
|------|-----------|-------|
| Content updates (copy, images) | As needed | Client |
| Dependency security check (`npm audit`) | Monthly | Atomest / Client |
| Supabase credit/usage review | Monthly | Client |
| Form submission review | Weekly | Client |
| Vercel deployment health | Ongoing | Vercel |
| Analytics review | Monthly | Client |
| Security header review | Quarterly | Atomest |

**Recurring revenue option:** Website maintenance package — monthly content updates, security checks, form monitoring, and analytics reporting.
