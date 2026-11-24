---
name: atomest-2-0-progress
description: Tracks progress of the Atomest 2.0 premium redesign transformation
metadata:
  type: project
---

# Atomest 2.0 — Premium Redesign Progress

## Status: IN PROGRESS

## Goal
Transform the existing Atomest marketing site into a premium international AI Automation Studio website (Linear/Stripe/Framer/Vercel quality), preserving existing auth/Supabase/API integrations and routes.

## Design Decisions
- Palette: Slate + Indigo (replacing heavy purple gradients); near-black slate background, indigo primary accent
- Typography: Space Grotesk (headings), Inter (body), JetBrains Mono (code) — already in index.html
- Token architecture: three-layer (primitive → semantic → component) per design-system skill
- Animations: GSAP ScrollTrigger + timeline choreography; Motion for UI interactions; respect prefers-reduced-motion

## Pages to Redesign
- [x] Design system (src/index.css) — in progress
- [ ] Navbar + Footer
- [ ] Home (all sections A–K + GSAP)
- [ ] Service pages (AI Voice Receptionist, Lead Automation, CRM Workflow, AI Customer Support, Premium Websites)
- [ ] Solution pages (Websites, Automation, Agents)
- [ ] About, Work, Contact, DigitalProducts
- [ ] typecheck + build
- [ ] Visual QA (screenshots, desktop/tablet/mobile)

## Constraints
- Do not invent client logos, testimonials, or customer numbers (existing integrity notice respected)
- Preserve routes, /api/contact form, auth, Supabase integrations
- No new unnecessary dependencies (gsap, framer-motion already installed)
- strict typecheck required before commit
