# Lead Automation — Delivery Kit

**Division:** B — Lead Automation  
**Status:** Reusable implementation asset (n8n workflow kit)  
**Owner:** Delivery Team  
**Version:** 1.0

## 1. Architecture

Lead capture → validation → enrichment → routing → notification → CRM sync → follow-up. Built primarily with n8n (self-hostable) and Atomest's `/api/contact` and `/api/waitlist` endpoints.

```
┌─────────────┐     ┌────────────┐     ┌──────────────┐     ┌─────────────┐
│   Website   │────▶│  n8n       │────▶│  Validation  │────▶│  Enrichment │
│  Contact    │     │  Webhook   │     │  (Zod + n8n) │     │  (optional) │
│  Form       │     │  Endpoint  │     │              │     └──────┬──────┘
└─────────────┘     └────────────┘     └──────────────┘            │
                                                    ┌──────────────┴──────────────┐
                                                    │                           │
                                          ┌────────▼────────┐       ┌─────────▼─────────┐
                                          │  Lead Routing   │       │  Notification     │
                                          │  (by solution)  │       │  (Slack/Email)    │
                                          └────────┬────────┘       └─────────┬─────────┘
                                                   │                           │
                                          ┌────────▼────────┐       ┌─────────▼─────────┐
                                          │  CRM Sync       │       │  Follow-up        │
                                          │  (Sheets/HubSpot│       │  (email sequence) │
                                          │  /Pipedrive)    │       └───────────────────┘
                                          └─────────────────┘
```

## 2. Workflow

1. **Capture** — Visitor submits contact form → POST to `/api/contact` → stored in Supabase `leads` table.
2. **Validate** — Zod schema validates name, email, description (min 10 chars). Invalid → 400 response.
3. **Rate limit** — 5 submissions/minute per IP; 429 on excess.
4. **Route** — n8n reads new lead from Supabase; routes by `solution` field to the right team.
5. **Notify** — Instant Slack message + email to assigned owner.
6. **CRM sync** — Lead inserted into client CRM (Google Sheets, HubSpot, Pipedrive) via webhook.
7. **Follow-up** — Automated email sequence (Day 0, Day 1, Day 3) unless manually paused.

## 3. Configuration Requirements

| Item | Who Provides | Notes |
|------|-------------|-------|
| n8n instance (self-hosted or cloud) | Client or Atomest | n8n is fair-code; self-hosting is zero-cost baseline |
| Supabase project | Client | Atomest migration 0004 creates `leads` table |
| Slack webhook URL | Client | For instant notifications |
| SMTP / email provider | Client | For follow-up sequence |
| CRM API access | Client | HubSpot, Pipedrive, or Google Sheets |
| Contact form endpoint | Atomest | `/api/contact` deployed to Vercel |

## 4. Deployment Instructions

1. Deploy `api/contact.ts` and `api/waitlist.ts` to Vercel (or local api-server for development).
2. Apply `supabase/migrations/0004_leads_schema.sql` to client's Supabase project.
3. Set `VITE_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel env (server-side only).
4. Import the Speed-to-Lead n8n workflow JSON into client's n8n instance.
5. Configure n8n credentials: Supabase, Slack, email, CRM.
6. Set n8n webhook to poll Supabase `leads` table (or use Supabase Realtime).
7. Test end-to-end: submit form → verify lead in Supabase → verify Slack notification → verify CRM row.
8. Connect website contact form to POST `/api/contact`.

## 5. Testing Procedure

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| Valid form submission | 200, lead saved in Supabase | |
| Missing name/email | 400, validation error | |
| Invalid email | 400, validation error | |
| Description < 10 chars | 400, validation error | |
| 6+ submissions/min from same IP | 429 rate limited | |
| Duplicate email+solution | 200, idempotent (already on file) | |
| Supabase down | 503, no false success | |
| Slack notification received | Lead details in Slack within 30s | |
| CRM row created | Lead appears in target CRM | |

## 6. Handoff Documentation

- Vercel deployment URL for `/api/contact` and `/api/waitlist`
- Supabase project URL and table schema
- n8n workflow JSON export
- n8n credential setup guide (where to paste API keys)
- Slack webhook configuration
- CRM field mapping
- Contact form HTML/JavaScript integration snippet
- Rate limit configuration (5/min/IP)
- Escalation contact

## 7. Maintenance Requirements

| Task | Frequency | Owner |
|------|-----------|-------|
| Review lead logs for false positives | Weekly | Client |
| Check n8n workflow execution errors | Weekly | Atomest / Client |
| Supabase credit/usage review | Monthly | Client |
| Update qualification questions/prompt | Quarterly | Atomest |
| Rotate API credentials | Semi-annually | Client |
