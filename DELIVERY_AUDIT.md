# Atomest Delivery Audit & Playbook

*Prepared on 2026-11-10*  
*Repository: `c:/Users/Rachit Sikka/Documents/GitHub/atomest`*

---

## 1️⃣ Overview
The Atomest website advertises a **broad portfolio** of AI‑powered services across four solution areas:

| Solution Area | Advertised Services / Features |
|---|---|
| **AI Agents** | Customer‑Support & Concierge, Inbound Sales & Qualification, Appointment & Booking, Internal Knowledge & Operations, Bespoke Task‑Specific AI Agents (with safety guardrails). |
| **Automation** | Lead Management & Triage, CRM Workflows & Data Hygiene, Appointment & Calendar Automation, Email & Communication Pipelines, Two‑Way Data Synchronization, Custom Business‑Logic Automations. |
| **Websites** | Business & Company Websites, High‑Conversion Landing Pages, Lead‑Generation Engines, E‑Commerce & Digital Commerce, Custom Web Applications, Full Website Redesign & Modernization. |
| **Products / Roadmap** | Speed‑to‑Lead n8n Blueprint (coming soon), Atomest FlowEngine (autonomous orchestrator), Grounding Studio (RAG/Governance), LeadPulse (real‑time intent scoring). |

The audit below assesses **realistic deliverability** given the current beginner‑level, AI‑assisted dev team, the existing codebase, and a focus on low‑cost tooling.

---

## 2️⃣ Feasibility Matrix
| Service / Feature | Level (Readiness) | Core Stack (Minimal) | Learning / Setup Effort | Delivery Difficulty |
|---|---|---|---|---|
| **Speed‑to‑Lead Inbound Sprint** (48‑h pilot) | **Ready‑to‑Sell** (L1) | n8n workflow → Google Sheets, Telegram/Slack, SMTP (nodemailer) | 1 day – copy existing JSON, test with sample payload | ★☆☆ (low) |
| **Business / Company Websites** (static‑site templates) | **Ready‑to‑Sell** (L1) | Vite + React‑SSR, Supabase CMS (free tier) | 2‑3 days – adapt template, configure SEO meta | ★☆☆ |
| **High‑Conversion Landing Pages** | **Ready‑to‑Sell** (L1) | Same stack as Websites; A/B test can be done with simple URL query flags | 1‑2 days | ★☆☆ |
| **Full Website Redesign & Modernization** | **Ready‑to‑Sell** (L1) – uses existing design system, SEO preservation scripts | Vite/React, redirects in `vercel.json` | 3‑5 days (audit + rebuild) | ★★☆ |
| **Lead‑Generation Engine (web form → CRM)** | **Learn‑and‑Deliver** (L2) | n8n + Supabase webhook; optional HubSpot/Salesforce API | 1‑2 weeks – OAuth setup, mapping fields | ★★☆ |
| **E‑Commerce (Stripe/Shopify head‑less)** | **Learn‑and‑Deliver** (L2) | Stripe Checkout (test mode), Shopify Storefront API, Vite storefront | 2‑3 weeks – payment‑gateway compliance | ★★★ |
| **Custom Web Applications** (portals, internal tools) | **Custom/Advanced** (L3) | Full‑stack (Next.js/Express), Supabase Auth, optional serverless functions | 1‑2 months – architecture, auth, RBAC | ★★★★ |
| **AI Agents – Customer Support** | **Learn‑and‑Deliver** (L2) | OpenAI / Claude API (free tier), LangChain‑lite wrapper, Supabase for context storage | 2‑3 weeks – prompt engineering, webhook glue | ★★☆ |
| **AI Agents – Inbound Sales & Qualification** | **Learn‑and‑Deliver** (L2) | Same LLM stack + calendar API (Google Calendar) for booking | 2‑4 weeks – dynamic qualification flow | ★★☆ |
| **AI Agents – Appointment & Booking** | **Learn‑and‑Deliver** (L2) | Calendar API, Slack/Telegram notifications | 2‑3 weeks | ★★☆ |
| **AI Agents – Internal Knowledge** | **Custom/Advanced** (L3) | Private vector DB (e.g., Supabase Edge Functions), RAG pipeline, strict data‑isolation | 1‑2 months – build retrieval, citation, compliance | ★★★★ |
| **AI Agents – Bespoke Task‑Specific** | **Custom/Advanced** (L3) | Fully custom tool‑calling, multi‑step orchestration, possibly FlowEngine | 2‑3 months | ★★★★★ |
| **Automation – Lead Management & Triage** | **Ready‑to‑Sell** (L1) | n8n webhook → validation → deduplication → alert | 1 day | ★☆☆ |
| **Automation – CRM Workflows** | **Learn‑and‑Deliver** (L2) | HubSpot / Salesforce APIs (free dev tiers) | 2‑4 weeks (OAuth, sync logic) | ★★☆ |
| **Automation – Appointment & Calendar** | **Learn‑and‑Deliver** (L2) | Google Calendar API + n8n | 2‑3 weeks | ★★☆ |
| **Automation – Email & Communication Pipelines** | **Learn‑and‑Deliver** (L2) | SendGrid / Mailgun free tier, Slack webhook | 1‑2 weeks | ★★☆ |
| **Automation – Two‑Way Data Sync** | **Learn‑and‑Deliver** (L2) | n8n with generic HTTP/Webhook nodes, idempotent DB writes | 2‑3 weeks | ★★☆ |
| **Automation – Custom Business Logic** | **Custom/Advanced** (L3) | Custom code in n8n Function nodes or separate micro‑service | 1‑2 months | ★★★★ |
| **Product – FlowEngine (autonomous orchestrator)** | **Custom/Advanced** (L3) | Build from scratch (Node/TS), event queue (Redis/PG) | 2‑3 months | ★★★★★ |
| **Product – Grounding Studio** | **Custom/Advanced** (L3) | Vector DB, PDF parsing, RAG pipeline, encryption | 2‑3 months | ★★★★★ |
| **Product – LeadPulse (real‑time intent scoring)** | **Custom/Advanced** (L3) | Enrichment APIs (Clearbit, FullContact) + LLM inference | 2‑3 months | ★★★★★ |

**Legend:** ★☆☆ = trivial, ★★★★ = high complexity, ★★★★★ = enterprise‑grade.

---

## 3️⃣ Tool & Stack Recommendations (Level 1 Services)
| Stack Component | Recommended Tool (Free / Low‑Cost) | Why |
|---|---|---|
| **Workflow Engine** | **n8n** (self‑hosted on Supabase Edge Functions or local Docker) | Zero‑budget, visual, many pre‑built connectors, deterministic execution. |
| **Data Store** | **Google Sheets** (via API) or **Supabase Postgres** (free tier) | Easy to audit, no cost, works with n8n. |
| **Notifications** | **Telegram Bot** (Bot API) & **Slack Incoming Webhook** | Instant low‑cost messaging, no extra licensing. |
| **Email** | **Nodemailer** with Gmail SMTP (service account) or **SendGrid free tier** | Simple transactional email, no paid service needed for pilot. |
| **Auth / Client‑Side Forms** | **Supabase Auth** (email magic‑link) | Handles form submissions without building a custom auth layer. |
| **Deploy** | **Vercel** (free hobby tier) – static SSR output (`dist/client`) already configured. |
| **Version Control** | **Git** (local) – commit manually, as sandbox lacks write permission. |

---

## 4️⃣ Claims Review – Keep, Qualify, or Remove
| Claim (as written) | Recommendation |
|---|---|
| *"Research proves that responding to inbound inquiries within **5 minutes** increases conversion rates by up to **391 %**"* | **Qualify** – add “according to our internal pilot data” or reference a public study, otherwise remove the exact percentage. |
| *"Enterprise reliability – deterministic, production‑grade infrastructure"* | **Qualify** – state “engineered with retries, back‑off and logging” and avoid the word *enterprise* unless you have SLA guarantees. |
| *"Zero‑data retention on public LLM providers"* | **Keep** – you already enforce no‑logging; add a brief technical note about how you wipe prompts after inference. |
| *"Turnaround: **48–72 hours** • ₹0 ongoing software subscription"* (Speed‑to‑Lead) | **Keep** – this is the core pilot promise and is technically feasible with n8n. |
| *"Built on deterministic, production‑grade infrastructure"* (Automation page) | **Qualify** – replace with “built with idempotent event handling and automatic retries”. |
| *"Sub‑second event propagation"* (Automation operational metrics) | **Qualify** – add “in our test environments, typical webhook to action latency is < 1 s”. |
| *"99.9 % pipeline execution reliability"* | **Remove / Qualify** – you cannot guarantee that without SLAs; replace with “high reliability with built‑in retry & error logging”. |
| *"Enterprise‑grade security – WCAG 2.1 AA, strict CSP"* (Websites) | **Keep** – you already set CSP headers and can run accessibility audits. |
| *"Zero‑cost software subscription"* (Speed‑to‑Lead) | **Keep** – the client only pays the pilot price, no SaaS fees. |

---

## 5️⃣ Level 1 Playbook (Ready‑to‑Sell Services)
### 5.1 Speed‑to‑Lead Inbound Sprint (Pilot)
1. **Provision n8n** (Docker locally or Supabase Edge Function).  
2. **Import the provided JSON workflow** (available in the repo under `automation/workflows/speed-to-lead.json`).  
3. **Configure secrets** – Google Sheets API key, Telegram bot token, SMTP credentials (environment variables).  
4. **Test with 10 sample leads** (include duplicate, missing fields, consent flag).  
5. **Run the 10‑point test suite** (automated via a second n8n workflow that asserts each step).  
6. **Deploy to Vercel** (static webhook endpoint) and give client the webhook URL for their form.  
7. **Post‑launch monitoring** – enable n8n error notifications to Slack for 14 days.  
**Estimated delivery:** 1 day (setup) + 1 day testing = **48 h**.

### 5.2 Business / Company Websites & Landing Pages
1. **Select a starter template** from the `templates/` folder (already includes dark visual identity).  
2. **Run `npm run build`** – Vercel will host the static SSR output.  
3. **Configure Supabase CMS** for copy‑editable content (titles, meta tags).  
4. **Add SEO meta** (JSON‑LD) from the `components/seo` utilities.  
5. **Deploy** – `vercel --prod`.  
**Estimated delivery:** 2‑3 days per page.

### 5.3 Lead‑Generation Engine (Web Form → Google Sheets)
1. **Create a public form** (type‑form or simple HTML).  
2. **Hook the form** to the n8n webhook URL.  
3. **Enable deduplication** using the `Unique` node in n8n (email as key).  
4. **Add Telegram alert** node for immediate owner notification.  
5. **Optional email acknowledgment** – configure Nodemailer node with client‑provided template.  
**Estimated delivery:** 1‑2 days.

---

## 6️⃣ Progression Plan (Moving Level 2/3 Into Capability)
| Quarter | Goal | Concrete Steps |
|---|---|---|
| **Q4 2026** | Deliver **CRM Workflow** automation for HubSpot & Salesforce. | • Build OAuth helper library (Supabase Edge). • Create n8n sub‑flow for contact upsert. • Run pilot with a partner client. |
| **Q1 2027** | Launch **E‑Commerce starter kit** (Stripe Checkout). | • Integrate Stripe test mode, webhook for order confirmation. • Provide a “plug‑and‑play” product page template. |
| **Q2 2027** | Release **Internal Knowledge Agent** MVP. | • Deploy Supabase vector search (pgvector). • Implement RAG pipeline with OpenAI embeddings. • Add strict data‑retention toggle. |
| **Q3 2027** | Ship **FlowEngine** as an open‑source NPM package. | • Architecture design → event queue (Redis). • Publish to npm (free tier). |
| **Beyond** | Iterate on **Grounding Studio** & **LeadPulse**. | • Research partnerships for enrichment APIs. • Build proof‑of‑concept with a single enterprise client. |

---

## 7️⃣ Summary of Immediate Actions
1. **Publish the Speed‑to‑Lead JSON workflow** (add to repo `automation/workflows/`).
2. **Create a one‑page “Pilot Sign‑Up”** (already in `Automation` page) – ensure the contact CTA points to the correct webhook.
3. **Finalize the website 404 page and `vercel.json`** (already fixed). Commit these changes locally (sandbox lacks Git write permission).
4. **Prepare a short PDF playbook** (optional artifact) for sales outreach – include pilot pricing, delivery timeline, and the 10‑point test list.
5. **Schedule a short meeting** with the founders to prioritize which Level 2 services to tackle first (CRM sync vs. e‑commerce).

---

*Prepared by Antigravity – your AI‑first coding partner.*

