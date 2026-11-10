# SPEED-TO-LEAD V1 — CLIENT DEPLOYMENT & CREDENTIALS GUIDE

---

## 1. PRODUCTION DEPLOYMENT OPTIONS (CLIENT-OWNED)

To avoid hosting liabilities and legal risks, **we never host client workflows on our personal computers or internal agency test instances**. 

We offer three production deployment pathways based on client preference:

| Deployment Path | Infrastructure Ownership | Cost to Client | Best For | Technical Friction |
| :--- | :--- | :---: | :--- | :---: |
| **Option A: Managed n8n Cloud (Recommended)** | Client signs up for official [n8n.io Cloud Starter](https://n8n.io/pricing) | $20 / month | Non-technical agency founders who want zero server maintenance. | **Near Zero** |
| **Option B: One-Click Cloud VPS (Railway / Render)** | Client deploys a 1-click Docker template on Railway | ~$5 / month | Tech-savvy studios wanting maximum cost efficiency. | **Low** |
| **Option C: Client's Existing Make.com Account** | Client uses existing Make.com Core plan | Free / $9/mo | Clients who refuse to use n8n and already run Make scenarios. | **Near Zero** |

---

## 2. CREDENTIALS & PERMISSIONS SPECIFICATION

We enforce a **Zero Shared Password Policy**. Clients never give us their primary Google, Slack, or Telegram master passwords.

### 1. Website Form Ingestion
* **What Client Provides**: Form endpoint webhook configuration or temporary WordPress/Webflow contributor access.
* **Alternative**: Client's web developer simply pastes the generated n8n Webhook URL into their form's "Webhook Target" field.

### 2. Google Sheets
* **What Client Provides**: Editor permission to our deployment email (`deploy@atomest.com` or personal Google ID) on a single, dedicated Google Spreadsheet.
* **Access Boundary**: Scoped strictly to that individual file; we cannot see or access their Google Drive or other files.

### 3. Telegram Notifications
* **What Client Provides**:
  1. Client searches `@BotFather` on Telegram and creates a private bot (takes 60 seconds).
  2. Client provides the `BOT_TOKEN`.
  3. Client messages `@userinfobot` to get their `Chat ID`.
* **Security**: The bot token can only send messages into that single designated chat.

### 4. Slack Notifications (Alternative to Telegram)
* **What Client Provides**: Incoming Webhook URL generated from `api.slack.com/apps` pointing to their `#inbound-leads` channel.
* **Security**: Webhook can only post incoming text to that specific channel; cannot read private channel messages or access team DMs.

### 5. Outbound Acknowledgment Email
* **What Client Provides**: Gmail OAuth2 authorization via n8n's standard OAuth modal, OR SMTP credentials for `hello@client.com`.

---

## 3. STEP-BY-STEP DEPLOYMENT RUNBOOK (48-HOUR SLA)

```
[Hour 0–4: Intake]
├── Payment confirmed via Stripe Link ($199)
└── Client receives Onboarding Checklist & Google Sheets Template

[Hour 4–24: Instance Setup]
├── Client provides n8n workspace invite OR Railway provision URL
└── Atomest imports 'speed-to-lead-v1.json' into client workspace

[Hour 24–40: Webhook & Integration Wiring]
├── Bind client Google Sheet ID
├── Configure Telegram Bot Token & Chat ID
└── Map website form webhook URL to n8n trigger node

[Hour 40–48: Verification & QA]
├── Run TC-01 (Happy Path test)
├── Run TC-02 (Missing email validation)
├── Run TC-04 (Duplicate submission test)
└── Verify sub-30-second Slack/Telegram delivery

[Hour 48–72: Handover]
├── Record 3-minute Loom demonstrating live submission
├── Transfer workspace credentials & revoke temporary access
└── Client signs off on delivery note
```

