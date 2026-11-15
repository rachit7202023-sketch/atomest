# Delivery Checklist

**Purpose:** Pre-launch checklist for every Atomest delivery.  
**Principle:** Nothing goes live without verification.

---

## All deliveries

- [ ] Discovery requirements documented and signed off by client
- [ ] All integrations configured with client credentials (not Atomest's)
- [ ] End-to-end test completed with sample data
- [ ] Error handling verified (what happens when an API is down?)
- [ ] Rate limiting configured (5/min/IP for contact forms)
- [ ] Security headers set (CSP, X-Frame-Options, etc.)
- [ ] PII handling confirmed (no card numbers, SSNs in logs)
- [ ] Handoff documentation delivered (credentials, runbook, contacts)
- [ ] Client trained on how to use the system
- [ ] Launch date confirmed with client

## Division A — AI Voice Receptionist

- [ ] Test call completed (greeting, FAQ, booking, handoff)
- [ ] Call recording/transcription PII review completed
- [ ] Calendar booking verified (event appears in client calendar)
- [ ] CRM lead creation verified
- [ ] Slack/email notification verified
- [ ] After-hours behavior confirmed

## Division B — Lead Automation

- [ ] Form submission → Supabase lead verified
- [ ] Slack notification received within 30 seconds
- [ ] CRM row created/updated
- [ ] Duplicate submission handled idempotently
- [ ] Invalid submission returns 400 (not success)
- [ ] DB failure returns 503 (no false success)

## Division C — CRM & Workflow Automation

- [ ] Webhook → CRM create/update verified
- [ ] Duplicate detection working (no duplicate records)
- [ ] Error retry queue configured
- [ ] Email/task triggers verified

## Division D — AI Customer Support

- [ ] FAQ answer grounded in knowledge base (no hallucination)
- [ ] Escalation → ticket created + staff notified
- [ ] PII redacted from logs
- [ ] Response time under 5 seconds
- [ ] Human-in-the-loop review period defined

## Division E — Premium Business Websites

- [ ] All pages load (200 status)
- [ ] Contact form submits successfully
- [ ] Mobile layout verified at 375px
- [ ] Keyboard navigation works
- [ ] Color contrast WCAG AA
- [ ] Sitemap.xml and robots.txt generated
- [ ] Custom domain connected (if applicable)
- [ ] Analytics configured (if requested)

---

## Launch criteria

All items checked + client sign-off = ready to launch.

## Post-launch (first 2 weeks)

- [ ] Daily check on form submissions and errors
- [ ] Weekly review with client
- [ ] Bug fixes within warranty period (30 days)
