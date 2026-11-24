/**
 * Atomest Visual Audit Script — captures screenshots at all breakpoints/sections
 * Run: node scripts/visual-audit.mjs
 */
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../screenshots/audit-2024");
fs.mkdirSync(OUT_DIR, { recursive: true });

const BASE = "http://localhost:3000";

async function shot(page, name) {
  const dest = path.join(OUT_DIR, `${name}.png`);
  await page.screenshot({ path: dest, fullPage: false });
  console.log("✓", name);
  return dest;
}

async function scrollShot(page, name, scrollY) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
  await page.waitForTimeout(600);
  await shot(page, name);
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  /* ── DESKTOP 1440×900 ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    await scrollShot(page, "desktop-1440-hero", 0);
    await scrollShot(page, "desktop-1440-who-we-help", 900);
    await scrollShot(page, "desktop-1440-capabilities-enter", 1700);
    await scrollShot(page, "desktop-1440-capabilities-mid", 2800);
    await scrollShot(page, "desktop-1440-workflow", 5500);
    await scrollShot(page, "desktop-1440-industries", 8000);
    await scrollShot(page, "desktop-1440-how-we-work", 9500);
    await scrollShot(page, "desktop-1440-cta", 11000);

    // Footer — scroll to bottom
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.waitForTimeout(400);
    await shot(page, "desktop-1440-footer");

    await ctx.close();
  }

  /* ── TABLET 768×1024 ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    await scrollShot(page, "tablet-768-hero", 0);
    await scrollShot(page, "tablet-768-capabilities", 2000);
    await scrollShot(page, "tablet-768-workflow", 5000);

    await ctx.close();
  }

  /* ── MOBILE 390×844 ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    await scrollShot(page, "mobile-390-hero", 0);
    await scrollShot(page, "mobile-390-who-we-help", 900);
    await scrollShot(page, "mobile-390-capabilities", 2000);
    await scrollShot(page, "mobile-390-workflow", 4000);
    await scrollShot(page, "mobile-390-cta", 8000);

    await ctx.close();
  }

  /* ── SERVICES PAGE ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/services`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await scrollShot(page, "services-1440-top", 0);
    await scrollShot(page, "services-1440-mid", 1200);
    await ctx.close();
  }

  /* ── CONTACT PAGE ── */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await shot(page, "contact-1440");
    await ctx.close();
  }

  await browser.close();
  console.log("\n✅ All screenshots saved to:", OUT_DIR);
}

run().catch(console.error);
