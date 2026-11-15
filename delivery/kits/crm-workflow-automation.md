# CRM & Workflow Automation — Delivery Kit

**Division:** C — CRM & Workflow Automation  
**Status:** Reusable implementation asset (n8n workflow templates)  
**Owner:** Delivery Team  
**Version:** 1.0

## 1. Architecture

Cross-system data synchronization and process automation. n8n acts as the orchestration layer connecting the client's website, email, CRM, and practice management tools.

```
┌─────────────┐     ┌────────────┐     ┌──────────────┐     ┌─────────────┐
│   Website   │────▶│  n8n       │────▶│  Data Map    │────▶│  CRM        │
│  / Form     │     │  Webhook   │     │  (field map) │     │  (HubSpot/  │
└─────────────┘     └────────────┘     └──────────────┘     │  Pipedrive) │
       │                           │                          └──────┬──────┘
       │                           │                                 │
       │                    ┌──────▼──────┐                          │
       │                    │  Filter /   │                          │
       │                    │  Condition  │                          │
       │                    └──────┬──────┘                          │
       │                           │                                 │
       │                    ┌──────▼──────┐     ┌─────────────────┐   │
       └───────────────────▶│  Action     │◀──│  Email /        │   │
                            │  (create/   │     │  Task create    │   │
                            │  update)    │     │  (Gmail/Outlook)│   │
                            └─────────────┘     └─────────────────┘   │
                                                                        │
                                    ┌─────────────────────────────────┘
                                    │
                            ┌───────▼───────┐
                            │  Error /      │
                            │  Retry Queue  │
                            │  (n8n)        │
                            └───────────────┘
```

## 2. Workflow

1. **Trigger** — New lead/form submission, new email, calendar event, or scheduled poll.
2. **Validate** — Check required fields; skip or route invalid records.
3. **Map** — Transform source fields to target CRM fields (name → firstName/lastName, etc.).
4. **Dedupe** — Check if record already exists in target (by email) to avoid duplicates.
5. **Create/Update** — Upsert record in CRM.
6. **Action** — Trigger onboarding task, send welcome email, flag overdue items.
7. **Error handling** — Failed runs go to n8n retry queue; alerts sent after max retries.

## 3. Configuration Requirements

| Item | Who Provides | Notes |
|------|-------------|-------|
| n8n instance | Client or Atomest | Self-hosted n8n is zero-cost baseline |
| CRM API access | Client | HubSpot, Pipedrive, Salesforce, etc. |
| Email sending (SMTP/SendGrid) | Client | For automated emails |
| Calendar access | Client | Google Calendar / Outlook |
| Field mapping specification | Client + Atomest | Defined during discovery |

## 4. Deployment Instructions

1. Deploy n8n (self-hosted via Docker or n8n cloud).
2. Create credentials in n8n for each connected system (CRM, email, calendar).
3. Import workflow templates from `templates/` directory (Speed-to-Lead kit included).
4. Configure webhook URLs from client's website/forms to n8n.
5. Set up field mappings for each integration.
6. Enable n8n error workflows (retry + alert).
7. Test with sample data: create contact → verify in CRM → verify task/email triggered.
8. Activate workflows; monitor execution log for first week.

## 5. Testing Procedure

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| New webhook lead → CRM create | Contact appears in CRM | |
| Duplicate email → no duplicate CRM record | Existing record updated, not duplicated | |
| Missing required field | Workflow skips or queues for review | |
| CRM API error | n8n retries; alert sent after max retries | |
| Email send | Email delivered to test inbox | |
| Scheduled poll | Runs on schedule; processes new records | |

## 6. Handoff Documentation

- n8n instance URL and admin credentials
- Credential inventory for each connected system
- Workflow JSON exports
- Field mapping documentation (source → target)
- Webhook URLs for client's forms/systems
- Error handling and retry policy
- Execution log location
- Escalation contact

## 7. Maintenance Requirements

| Task | Frequency | Owner |
|------|-----------|-------|
| Review n8n execution errors | Weekly | Atomest / Client |
| Check CRM sync for missing fields | Monthly | Client |
| Update field mappings on CRM changes | As needed | Atomest |
| Rotate API credentials | Semi-annually | Client |
| Review automation cost (n8n cloud tasks) | Monthly | Client |
