# ATOMEST_LAUNCH_IMPLEMENTATION_PLAN.md

**Prepared for Stage 1 – Inspection & Planning**

Date: 2026‑11‑10

---

## 1. Current Public Pages & Routes

| Path (file) | URL (next‑router) | Primary purpose | Status |
|-------------|-------------------|----------------|--------|
| `src/pages/index.tsx` | `/` | Home page – currently displays generic hero, marketing copy. | Needs redesign to match new vision. |
| `src/pages/Contact.tsx` | `/contact` (also used for “Get a Quote”) | Lead capture form that posts to `/api/contact`. | Form fields insufficient; UX needs refresh. |
| `src/pages/About.tsx` | `/about` | About Atomest – existing content is acceptable but can be trimmed. |
| `src/pages/solutions/*.tsx` | `/solutions/*` (Agents, Automation, Products, Websites) | These are currently *solution* pages that describe internal capabilities, not industry‑specific solutions. |
| `src/pages/agents.tsx` (under `solutions`) | `/solutions/Agents` | Legacy “RecruiterAI” placeholder. |
| `src/pages/automation.tsx` | `/solutions/Automation` | Shows automation overview, heavy on internal tooling. |
| `src/pages/products.tsx` | `/solutions/Products` | Lists product packs that are not yet delivered. |
| `src/pages/websites.tsx` | `/solutions/Websites` | Describes website capabilities. |
| `src/pages/not-found.tsx` | `*` (fallback) | 404 page – functional. |
| `src/pages/Dashboard.tsx` | `/dashboard` | Placeholder client dashboard – no public use. |
| `src/pages/Home.tsx` | `/home` (unused) | Duplicate of index. |
| `src/pages/auth/*` | `/auth/*` | Supabase auth UI – stays as‑is. |
| `src/pages/api/*` (Vercel serverless) | `/api/*` | Backend endpoints: `contact.ts`, `waitlist.ts`, `generate-kit.ts`, `process-candidates.ts`, `services/gemini.ts`. |

**Observation**: The public navigation currently mixes internal solution pages with generic marketing sections. The site lacks dedicated **Services** and **Solutions/Industries** sections required by the new brand.

---

## 2. Outdated / Dummy Content

- **Products & RecruiterAI routes** (`src/pages/solutions/Products.tsx`, `src/pages/solutions/Agents.tsx`) reference unreleased product packs and a “RecruiterAI” service that does not exist. These must be **quarantined** (moved to `archive/` folder) and removed from the main navigation.
- **Pricing tables** and **feature lists** that mention unavailable SaaS or subscription tiers are present in the `docs/` folder only; they do not appear on the public site, so they can stay.
- **Demo images** on the home page showcase generic screenshots; they are acceptable but should be replaced with higher‑quality mock‑ups that reflect the three core categories (Web, Automation, AI).
- **Legacy free‑tools folder** (`src/pages/legacy/*` if any) – not currently part of the site, but the repository contains an `archive/` directory; confirm it holds old utility pages and keep it isolated.

---

## 3. Mapping to New Site Structure

| New Page | Existing Source(s) | Mapping / Re‑use | Work Required |
|----------|-------------------|-----------------|---------------|
| **Home** (`src/pages/index.tsx`) | Current index + hero section | Replace hero copy, add three service‑category cards, add combined‑solution examples. | Full redesign of JSX and Tailwind layout. |
| **Services Overview** (`src/pages/services/index.tsx`) | No direct equivalent. | Create new page that introduces the three pillars and links to sub‑pages. | New component + navigation link. |
| **Web Development** (`src/pages/services/web-development.tsx`) | Content from `src/pages/solutions/Websites.tsx` (website capabilities). | Extract relevant copy, rewrite to focus on business outcomes. | New page, copy rewrite. |
| **Business Automation** (`src/pages/services/business-automation.tsx`) | Content from `src/pages/solutions/Automation.tsx` and Speed‑to‑Lead docs. | Consolidate automation features, add ready‑to‑deliver services list. | New page, copy rewrite. |
| **AI Solutions** (`src/pages/services/ai-solutions.tsx`) | Content from `src/pages/solutions/Agents.tsx` (AI) and `src/pages/solutions/Products.tsx` (AI packs). | Remove unreleased product references; keep AI chatbot and support assistant descriptions. | New page, copy rewrite. |
| **Solutions / Industries** (`src/pages/solutions/index.tsx`) | No direct page. | New landing page that introduces industry focus and links to individual industry pages. | New page. |
| **Industry – Home Services** (`src/pages/solutions/home-services.tsx`) | None. | Write copy for roofing‑business example (website + automation combo). |
| **Industry – Healthcare & Dental** (`src/pages/solutions/healthcare-dental.tsx`) | None. | Write copy for dental‑clinic example. |
| **Industry – Restaurants & Hospitality** (`src/pages/solutions/restaurants.tsx`) | None. | Write copy for restaurant example. |
| **Industry – Professional Services** (`src/pages/solutions/professional-services.tsx`) | None. | Write copy for law‑firm / consulting example. |
| **Industry – Other SMBs** (`src/pages/solutions/other-smbs.tsx`) | None. | Generic catch‑all page. |
| **Work / Portfolio** (`src/pages/work.tsx` – new) | No public portfolio yet. | Create a simple gallery of demonstration projects (e.g., Speed‑to‑Lead demo, sample website). Use placeholder images but clearly label as “Demo”. |
| **About Atomest** (`src/pages/about.tsx`) | Existing – keep but trim jargon, align tone with new brand. |
| **Contact / Get a Quote** (`src/pages/contact.tsx` – rename to `quote.tsx` or keep) | Existing `Contact.tsx`. | Extend form fields, add client‑side validation, display success UI, keep posting to `/api/contact`. |
| **404 Not‑Found** – keep (`src/pages/not-found.tsx`). |

---

## 4. Backend Changes Needed

1. **`api/contact.ts`** – currently expects `{fullName, email, company, website, solution, budget, description}` and writes only `fullName`, `email`, `company`, `solution` into Supabase `waitlist`. We need to:
   - Accept the **new fields** (`businessName`, `serviceRequired`, `projectDescription`, `budgetRange`). Map them onto the existing `waitlist` columns:
     - `full_name` → `fullName` (keep).
     - `email` → `email`.
     - `company_name` → `businessName`.
     - `product` → `serviceRequired`.
     - `role` → `budgetRange` (optional).
   - Store `description` as `projectDescription`.
   - Return a JSON response `{ success: true, message: "Your request has been received" }`.
   - Add server‑side validation for required fields (name, email, serviceRequired, description).

2. **CSP Middleware** – create `src/middleware/csp.ts` that sets a strict Content‑Security‑Policy header (self + https: for fonts and images). Register it in `next.config.js` via `middleware` export.

3. **Redirects** – replace any client‑side router redirects with proper HTTP redirects in `next.config.js` `redirects()` function. Example:
   ```js
   async redirects() {
     return [
       { source: '/home', destination: '/', permanent: true },
       { source: '/services', destination: '/services', permanent: true },
     ];
   }
   ```

4. **Add Sentry (optional)** – lightweight integration for API routes to capture errors without extra cost (free tier). Create `utils/sentry.ts` and wrap handlers.

5. **Quarantine Legacy Products** – move `src/pages/solutions/Products.tsx` and `src/pages/solutions/Agents.tsx` into `archive/` folder. Update any imports or navigation that reference them.

---

## 5. UI / UX Adjustments

- **Navigation (Navbar component)** – add links: Home, Services (dropdown), Solutions (dropdown), Work, About, Contact.
- **Service category cards** on the Home page – use dark‑theme cards with an icon, short headline, and a CTA linking to the specific service page.
- **CTA Buttons** – primary button style (`bg-emerald-600` → keep premium dark palette) and secondary outline.
- **Form UI** – add new fields with Tailwind styling, ensure required fields are highlighted, and show inline error messages.
- **Responsive layout** – verify all new pages use the existing grid system (`lg:grid-cols-12`, etc.) and test on mobile breakpoints.
- **SEO** – each page must include `<Helmet>` with `title` and `meta description` that reflect the page content.
- **Accessibility** – add `aria-label`s to form inputs, ensure color contrast meets WCAG AA.

---

## 6. Content – Business‑Outcome Focus

For every service page we will structure the copy as:
1. **Problem** – a short paragraph describing a common SMB pain point.
2. **Solution** – a concise statement of what Atomest does.
3. **Deliverables** – bullet list of concrete outputs (e.g., "Custom responsive website", "Lead capture form integrated with Google Sheets").
4. **How It Works** – 2‑step diagram (illustrated with simple SVG or Mermaid) showing the workflow.
5. **Use Cases** – 2‑3 bullet examples.
6. **CTA** – “Get a Quote” button linking to the contact form.

All language will avoid technical jargon; we will emphasize business ROI (“save hours”, “increase conversions”).

---

## 7. Step‑by‑Step Implementation Timeline (Stage 2)

| Day | Task |
|-----|------|
| **1‑2** | Create new page files (`services/*`, `solutions/*`, `work.tsx`). Populate with copy (from the plan). |
| **3** | Update `src/pages/index.tsx` with new hero, service cards, combined‑solution snippets. |
| **4** | Extend `src/pages/Contact.tsx` form fields and add client‑side validation. |
| **5** | Modify `api/contact.ts` to accept new payload, map to Supabase columns, add server validation, return proper JSON. |
| **6** | Add CSP middleware (`src/middleware/csp.ts`) and register in `next.config.js`. |
| **7** | Fix redirects in `next.config.js`. |
| **8** | Update `src/components/layout/Navbar.tsx` navigation links and dropdowns. |
| **9** | Quarantine legacy solution pages (`archive/`), remove them from navigation. |
| **10** | Add SEO `<Helmet>` metadata to each new page. |
| **11** | Run `npm run build` (production) and verify no errors. |
| **12** | Deploy to Vercel preview, test responsive layout on desktop & mobile, submit a test enquiry through the new form, confirm data appears in Supabase `waitlist` table. |
| **13** | Document completed work in `ATOMEST_LAUNCH_REPORT.md` (see final success criteria). |

---

## 8. Success‑Criteria Checklist (to be filled after Stage 2)

- [ ] Home page communicates Atomest’s three pillars and combined‑solution examples.
- [ ] Services pages present business outcomes, not raw tech lists.
- [ ] Solutions/Industries pages contain at least the four example packages (Roofing, Dental, Restaurant, Professional).
- [ ] Contact/Quote form captures all required fields, validates client‑side & server‑side, stores in Supabase, and shows a success message.
- [ ] All pages are responsive and pass basic Lighthouse performance/SEO scores.
- [ ] No broken routes; redirects work.
- [ ] CSP header is present on every response.
- [ ] Production build (`npm run build`) succeeds without errors.
- [ ] Legacy dummy product pages are quarantined, not linked from navigation.
- [ ] No fabricated client claims appear.
- [ ] `ATOMEST_LAUNCH_REPORT.md` documents what was completed and any remaining open items.

---

**Next step:** Proceed to Stage 2 – implement the website changes as outlined above.

