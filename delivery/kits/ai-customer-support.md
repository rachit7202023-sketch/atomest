# AI Customer Support — Delivery Kit

**Division:** D — AI Customer Support  
**Status:** Concept architecture (not a live production integration)  
**Owner:** Delivery Team  
**Version:** 1.0

## 1. Architecture

AI-powered customer support: knowledge-based responses, FAQ automation, enquiry classification, ticket creation, human escalation, and conversation logging.

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Customer  │────▶│  Chat Widget /   │────▶│  AI Support     │
│  (Website)  │     │  Contact Form    │     │  Agent (LLM)    │
└─────────────┘     │  Endpoint        │     │  (Gemini /      │
                    │                  │     │  Claude / GPT)  │
                    └──────────────────┘     └────────┬────────┘
                                                       │
                          ┌────────────────────────────┼────────────────────────────┐
                          │                            │                            │
                    ┌─────▼─────┐              ┌───────▼───────┐          ┌─────────▼─────────┐
                    │ Knowledge │              │ Ticket        │          │ Human Escalation  │
                    │ Base (RAG)│              │ System        │          │ (Slack / Email)   │
                    └───────────┘              │ (create/view) │          └───────────────────┘
                                               └───────────────┘
```

### Provider-independent interfaces

| Layer | Interface | Example Providers | Notes |
|-------|-----------|-------------------|-------|
| Chat widget | Embed script / API | Crisp, Intercom, Tidio, custom | Client embeds widget on site |
| AI agent | LLM API with system prompt | Gemini, Claude, GPT | Atomest writes prompts; client provides key |
| Knowledge base | Vector + keyword search | Supabase pgVector, Pinecone | FAQs, policy docs, product info |
| Ticket system | API / webhook | Zendesk, Help Scout, email | Optional; can be n8n + Sheets |
| Escalation | Slack / email notification | Slack, Gmail, Outlook | Human agent takes over |

## 2. Workflow

1. **Receive** — Customer message arrives via chat widget or contact form.
2. **Classify** — LLM classifies intent (billing, technical, sales, general).
3. **Retrieve** — Knowledge base search for relevant articles/FAQs.
4. **Respond** — LLM drafts answer grounded in knowledge base; citations included.
5. **Review** (optional) — Draft sent to human agent for approval before sending (high-stakes only).
6. **Send** — Answer delivered to customer.
7. **Escalate** — If confidence low or customer requests human → ticket created + staff notified.
8. **Log** — Conversation stored for QA and training (PII redacted).

## 3. Configuration Requirements

| Item | Who Provides | Notes |
|------|-------------|-------|
| LLM API key | Client | Gemini, Claude, or GPT |
| Knowledge base content | Client | FAQs, policies, product docs, past tickets |
| Chat widget | Client | Crisp, Intercom, or custom embed |
| Ticket system access | Client | Zendesk, Help Scout, or n8n+Sheets |
| Escalation channel | Client | Slack or email |

## 4. Deployment Instructions

1. Set up knowledge base: ingest FAQs, policies, product docs into vector index.
2. Configure AI agent system prompt: tone, escalation triggers, citation format, PII handling.
3. Deploy chat widget or contact form endpoint on client website.
4. Connect LLM API with client credentials.
5. Configure ticket creation webhook for escalations.
6. Set up Slack/email notifications for escalated conversations.
7. Test with sample queries: FAQ, complex question, handoff request, off-topic.
8. Launch with human-in-the-loop review for first 2 weeks.
9. Transition to fully automated after QA sign-off.

## 5. Testing Procedure

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| FAQ question | Correct answer from knowledge base | |
| Complex question | Grounded answer with citations | |
| Off-topic question | Polite refusal or escalation offer | |
| Escalation trigger | Ticket created; staff notified | |
| PII in customer message | PII redacted before logging | |
| Response time | Under 5 seconds for typical queries | |

## 6. Handoff Documentation

- AI agent system prompt
- Knowledge base source documents and sync schedule
- Chat widget embed code
- LLM credential inventory
- Ticket system webhook configuration
- Escalation Slack/email setup
- QA review process (first 2 weeks)
- Escalation contact

## 7. Maintenance Requirements

| Task | Frequency | Owner |
|------|-----------|-------|
| Knowledge base content update | Monthly or on product change | Client |
| Review escalated conversations | Weekly | Client |
| Prompt tuning | Monthly | Atomest |
| LLM cost/quota review | Monthly | Client |
| Security review (PII handling) | Semi-annually | Atomest |
