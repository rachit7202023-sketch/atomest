# Client Onboarding Checklist

**Purpose:** Checklist to complete after a client signs a proposal, before work begins.  
**Principle:** Confirm access and expectations up front to avoid delays.

---

## Before work begins

- [ ] Signed proposal received
- [ ] Deposit invoice paid
- [ ] Kickoff call scheduled (30–60 min)
- [ ] Client onboarding form completed (business details, goals, current tools)

## Access & credentials (client provides)

- [ ] Phone number / DID (Division A — voice)
- [ ] LLM API credentials (Divisions A, D — client's Gemini/ElevenLabs/etc. key)
- [ ] Calendar OAuth access (Divisions A, C — Google/Outlook)
- [ ] CRM API access (Divisions B, C — HubSpot/Pipedrive/etc.)
- [ ] Knowledge base content (FAQs, docs, policies)
- [ ] Website admin access (Division E — for form integration)
- [ ] Domain/DNS access (Division E — for custom domain)
- [ ] Slack workspace or email for notifications

## Atomest prepares

- [ ] Supabase project (if not already existing) — apply migration 0004_leads_schema.sql
- [ ] Vercel project with environment variables (server-side keys only)
- [ ] n8n instance or workflow templates
- [ ] Design system tokens (colors, typography, spacing)
- [ ] Contact form integration snippet

## Kickoff call agenda

- [ ] Confirm business goals and success metrics
- [ ] Review current tools and systems
- [ ] Confirm access items above (who provides what, by when)
- [ ] Agree on timeline and launch date
- [ ] Agree on communication channel and response times
- [ ] Confirm who the main client contact is

## After kickoff

- [ ] Create project folder (documentation, credentials, deliverables)
- [ ] Set up project tracking (tasks, milestones)
- [ ] Schedule weekly check-ins (if project > 2 weeks)

---

## Do not request

- Client's personal passwords (use OAuth/API where possible)
- Client's credit card for third-party services (client pays providers directly)
- Access to systems not in scope
