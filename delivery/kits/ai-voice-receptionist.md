# AI Voice Receptionist — Delivery Kit

**Division:** A — AI Voice Receptionist  
**Status:** Concept architecture (not a live production integration)  
**Owner:** Delivery Team  
**Version:** 1.0

## 1. Architecture

A provider-independent voice receptionist system. Atomest does not own or operate telephony infrastructure; we design and integrate on top of client-chosen providers.

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Caller    │────▶│  Telephony       │────▶│  Voice AI       │
│  (PSTN)     │     │  Provider        │     │  Provider       │
└─────────────┘     │  (Twilio /       │     │  (Gemini Live   │
                    │  Vonage /        │     │  API / ElevenLabs│
                    │  Plivo)          │     │  / Retell AI)    │
                    └──────────────────┘     └────────┬────────┘
                                                       │
                          ┌────────────────────────────┼────────────────────────────┐
                          │                            │                            │
                    ┌─────▼─────┐              ┌───────▼───────┐          ┌─────────▼─────────┐
                    │ Knowledge │              │ Appointment   │          │ CRM / Human       │
                    │ Base      │              │ Scheduling    │          │ Handoff           │
                    │ (RAG)     │              │ (Calendar     │          │ (Webhook / Slack) │
                    │           │              │ API / n8n)    │          │                   │
                    └───────────┘              └───────────────┘          └───────────────────┘
```

### Provider-independent interfaces

| Layer | Interface | Example Providers | Notes |
|-------|-----------|-------------------|-------|
| Telephony | SIP trunk / phone number forwarding | Twilio, Vonage, Plivo, Bandwidth | Client owns the number and account |
| Voice AI | Streaming speech-to-text + LLM + text-to-speech | Gemini Live API, ElevenLabs, Retell AI, Bland.ai | Atomest configures prompts; client provides API keys |
| Knowledge Base | Vector search over business content | Supabase pgVector, Pinecone, Weaviate | Atomest builds and maintains the index |
| Appointments | Calendar read/write via webhook | Google Calendar, Outlook/Exchange, Cal.com | Client grants OAuth access |
| CRM | Lead/contact create via webhook | HubSpot, Pipedrive, Salesforce, Google Sheets | n8n or direct webhook |
| Human Handoff | Warm transfer + SMS/email notification | Twilio SMS, Slack, Email | Configured per-client escalation rules |

**Critical distinction:** A demo built with Atomest test accounts is a *concept demonstration*. A live production integration requires the client's own telephony numbers, voice AI credentials, calendar OAuth, and CRM access. Atomest does not provide these.

## 2. Workflow

1. **Discovery** — Identify business hours, FAQs, appointment types, escalation rules, and target systems.
2. **Knowledge base setup** — Ingest website content, service docs, pricing, FAQs into a vector index.
3. **Voice AI configuration** — System prompt, greeting, qualification questions, appointment booking flow, handoff triggers.
4. **Telephony connection** — Forward client number to Atomest-managed or client-managed SIP endpoint.
5. **Integration wiring** — Calendar webhooks, CRM webhooks, Slack/email notifications.
6. **Testing** — Test calls at various times of day; verify booking, FAQ answers, and handoff.
7. **Launch** — Cut over the business number; monitor for 2 weeks.
8. **Handoff** — Deliver credentials, access docs, and runbook to client.

## 3. Configuration Requirements

| Item | Who Provides | Notes |
|------|-------------|-------|
| Phone number (DID) | Client | Must be ported or forwarded to the voice platform |
| Voice AI API key | Client | Gemini Live, ElevenLabs, Retell, etc. |
| Calendar access (OAuth) | Client | Google Workspace or Microsoft 365 |
| CRM access (API/webhook) | Client | HubSpot, Pipedrive, Sheets, etc. |
| Knowledge base content | Client | Website pages, service lists, FAQs, pricing |

## 4. Deployment Instructions

1. Provision an n8n workflow (or equivalent orchestration) for call handling.
2. Configure voice AI system prompt with business-specific greeting and qualification.
3. Connect telephony: forward client DID to the voice webhook endpoint.
4. Connect knowledge base: sync website/FAQ content to vector index.
5. Connect appointments: OAuth calendar, define bookable slots.
6. Connect CRM: webhook for new lead creation; map fields.
7. Connect notifications: Slack channel or email for call summaries and handoffs.
8. Set up logging: call duration, outcome, transcription (PII redacted where required).
9. Test with 5–10 test calls covering: new caller, existing caller, appointment request, after-hours, handoff.
10. Cut over number; monitor and tune prompts for 2 weeks.

## 5. Testing Procedure

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| Greeting is spoken clearly on call answer | Caller hears business name + offer to help | |
| FAQ answer from knowledge base | Correct answer spoken; no hallucination | |
| Appointment booking | Event appears in client calendar | |
| After-hours call | Caller informed of business hours; voicemail option | |
| Human handoff trigger | Call transferred; staff notified via Slack/email | |
| CRM lead creation | New contact appears in CRM after call | |
| PII handling | No card numbers or SSNs logged in plain text | |

## 6. Handoff Documentation

- Voice AI system prompt and configuration
- Telephony forwarding instructions
- Calendar OAuth grant documentation
- CRM field mapping
- Notification channel (Slack/email) setup
- Credential inventory (where stored, who owns)
- Runbook for common issues (call not ringing, booking failed, transcription poor)
- Escalation contact for Atomest support

## 7. Maintenance Requirements

| Task | Frequency | Owner |
|------|-----------|-------|
| Knowledge base content refresh | Monthly or on service change | Client / Atomest |
| Prompt tuning based on call logs | Monthly | Atomest |
| Calendar/CRM connection health check | Quarterly | Client |
| Voice AI provider rate/quota review | Quarterly | Client |
| Security review (PII logging, access) | Semi-annually | Atomest |

**Atomest's role:** Design, configure, integrate, test, and hand off. We do not operate the voice line 24/7 unless a separate monitoring agreement is signed.

**Client's role:** Own phone numbers, provide API credentials, supply knowledge base content, manage calendar/CRM access, review call logs monthly.
