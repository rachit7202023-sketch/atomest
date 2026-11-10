# ATOMEST — DIGITAL PRODUCTS CHECKOUT & PAYOUT ASSESSMENT

**Document Type:** Commercial Infrastructure Analysis  
**Region of Operation:** India (Founder Bank Account)  
**Target Customers:** Global (US/EU/APAC) & India (Creators & SMBs)  
**Date:** November 10, 2026  

---

## 1. THE PROBLEM TO SOLVE

Atomest needs an external platform to handle:
1. Product checkout (Cards, Apple Pay, UPI).
2. Global sales tax & EU VAT compliance automatically.
3. Instant digital file download delivery without custom backend code.
4. Smooth withdrawal/payout to an Indian bank account.

---

## 2. DETAILED COMPARISON: GUMROAD VS. LEMON SQUEEZY

### Option A: Gumroad
* **Merchant of Record (MoR):** Yes (collects & remits global sales tax).
* **Payout to India:**
  - **Direct Bank Deposit (INR):** Supported directly to Indian bank accounts via standard IFSC/account transfer.
  - **Payout Frequency:** Processed every Tuesday.
  - **Minimum Threshold:** **$100 (~₹8,700)** balance before a payout is initiated.
* **Buyer Experience:** Supports international cards + **native UPI for Indian buyers**.
* **Fees:** **10% + $0.50 per transaction**.
  - *Note:* The fixed $0.50 (~₹44) makes ultra-low-ticket items (e.g., ₹199) expensive, but for products priced at **$29 to $99 (₹2,500 – ₹8,500)**, the fee is a very reasonable 10.5%–11%.
* **Ease of Setup:** Extremely fast; accounts can be set up in 15 minutes with Indian bank details.

### Option B: Lemon Squeezy
* **Merchant of Record (MoR):** Yes (robust global tax management).
* **Payout to India:**
  - **The Stripe Catch:** Lemon Squeezy uses Stripe for bank payouts. **Stripe in India is currently heavily restricted / invite-only** for new accounts.
  - **PayPal Route:** Payouts can be routed through a verified PayPal account, but PayPal charges high currency conversion fees (3–4% spread) when withdrawing to an Indian bank.
  - **Payout Frequency:** Twice a month (1st and 15th) with a 13-day holding period.
* **Buyer Experience:** Optimized for US/European credit cards; lacks native UPI for Indian buyers.
* **Fees:** **5% + $0.50 per transaction**.

---

## 3. VERDICT & RECOMMENDATION FOR ATOMEST

| Factor | Winner for Atomest Launch |
|---|---|
| **Speed to Launch from India** | **Gumroad** (Direct Indian bank payout without Stripe friction) |
| **Buyer Flexibility** | **Gumroad** (Supports international buyers + native Indian UPI) |
| **Lowest Fees on >$50 Products** | **Lemon Squeezy** (5% vs 10%) |
| **Overall Recommendation** | **Start with Gumroad for initial product testing.** |

### Launch Strategy:
1. When launching Product #1 (*Speed-to-Lead Automation Workflow Kit*), publish on **Gumroad** with a price point of **$39 (or ~₹2,999)**.
2. At this price point:
   - The $0.50 fee has negligible impact.
   - 3 sales clear the $100 payout threshold.
   - Payouts transfer directly into your Indian bank account every Tuesday without complex merchant account setups.
3. Once sales volume reaches $1,000+/month, re-evaluate Lemon Squeezy or Dodo Payments for lower percentage fees.

