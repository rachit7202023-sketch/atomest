import { chromium } from "@playwright/test";
import express from "express";
import path from "path";
import fs from "fs";

async function main() {
  const distDir = path.resolve(process.cwd(), "dist/client");
  const artifactsDir = "C:\\Users\\Rachit Sikka\\.gemini\\antigravity\\brain\\6b3f375b-28e0-4c0b-8f95-ab51b722fce7\\screenshots";
  const localScreenshotsDir = path.resolve(process.cwd(), "screenshots");

  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }
  if (!fs.existsSync(localScreenshotsDir)) {
    fs.mkdirSync(localScreenshotsDir, { recursive: true });
  }

  // Create express static server on port 4180
  const app = express();
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });

  const server = app.listen(4180, () => {
    console.log("Static server running on http://localhost:4180");
  });

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Desktop 1440x900
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();

    console.log("Navigating to Home (Desktop)...");
    await desktopPage.goto("http://localhost:4180/", { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(2000);

    const desktopHeroPath = path.join(localScreenshotsDir, "atomest-2.0-hero-desktop.png");
    await desktopPage.screenshot({ path: desktopHeroPath });
    fs.copyFileSync(desktopHeroPath, path.join(artifactsDir, "atomest-2.0-hero-desktop.png"));
    console.log("Desktop hero screenshot saved.");

    // Scroll down to Command Center view
    await desktopPage.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await desktopPage.waitForTimeout(1000);
    const desktopCommandCenterPath = path.join(localScreenshotsDir, "atomest-2.0-command-center-desktop.png");
    await desktopPage.screenshot({ path: desktopCommandCenterPath });
    fs.copyFileSync(desktopCommandCenterPath, path.join(artifactsDir, "atomest-2.0-command-center-desktop.png"));
    console.log("Desktop command center screenshot saved.");

    // Scroll down to Services
    await desktopPage.evaluate(() => {
      document.querySelector("#services")?.scrollIntoView({ behavior: "instant" });
    });
    await desktopPage.waitForTimeout(1800);
    const desktopServicesSectionPath = path.join(localScreenshotsDir, "atomest-2.0-capabilities-desktop.png");
    await desktopPage.screenshot({ path: desktopServicesSectionPath });
    fs.copyFileSync(desktopServicesSectionPath, path.join(artifactsDir, "atomest-2.0-capabilities-desktop.png"));
    console.log("Desktop capabilities screenshot saved.");

    // 2. Mobile 390x844 (iPhone 14)
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    console.log("Navigating to Home (Mobile)...");
    await mobilePage.goto("http://localhost:4180/", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(2000);

    const mobileHeroPath = path.join(localScreenshotsDir, "atomest-2.0-hero-mobile.png");
    await mobilePage.screenshot({ path: mobileHeroPath });
    fs.copyFileSync(mobileHeroPath, path.join(artifactsDir, "atomest-2.0-hero-mobile.png"));
    console.log("Mobile hero screenshot saved.");

    // Scroll down to Command Center on mobile
    await mobilePage.evaluate(() => {
      window.scrollBy(0, 480);
    });
    await mobilePage.waitForTimeout(1200);
    const mobileCommandCenterPath = path.join(localScreenshotsDir, "atomest-2.0-command-center-mobile.png");
    await mobilePage.screenshot({ path: mobileCommandCenterPath });
    fs.copyFileSync(mobileCommandCenterPath, path.join(artifactsDir, "atomest-2.0-command-center-mobile.png"));
    console.log("Mobile command center screenshot saved.");

    // Scroll down to Services on mobile
    await mobilePage.evaluate(() => {
      document.querySelector("#services")?.scrollIntoView({ behavior: "instant" });
    });
    await mobilePage.waitForTimeout(1800);
    const mobileServicesPath = path.join(localScreenshotsDir, "atomest-2.0-capabilities-mobile.png");
    await mobilePage.screenshot({ path: mobileServicesPath });
    fs.copyFileSync(mobileServicesPath, path.join(artifactsDir, "atomest-2.0-capabilities-mobile.png"));
    console.log("Mobile capabilities screenshot saved.");

    // 3. Services Page Desktop
    console.log("Navigating to /services...");
    await desktopPage.goto("http://localhost:4180/services", { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1200);
    const servicesPagePath = path.join(localScreenshotsDir, "atomest-2.0-services-page.png");
    await desktopPage.screenshot({ path: servicesPagePath });
    fs.copyFileSync(servicesPagePath, path.join(artifactsDir, "atomest-2.0-services-page.png"));
    console.log("Services page screenshot saved.");

    console.log("All screenshots captured successfully!");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
