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

    // Desktop Hero 3D Deck
    await desktopPage.evaluate(() => window.scrollBy(0, 320));
    await desktopPage.waitForTimeout(1000);
    const heroDeckPath = path.join(localScreenshotsDir, "atomest-premium-hero-3d.png");
    await desktopPage.screenshot({ path: heroDeckPath });
    fs.copyFileSync(heroDeckPath, path.join(artifactsDir, "atomest-premium-hero-3d.png"));
    console.log("Hero 3D deck screenshot saved.");

    // Desktop Pinned Capabilities Deck (#services)
    await desktopPage.evaluate(() => {
      document.querySelector("#services")?.scrollIntoView({ behavior: "instant" });
    });
    await desktopPage.waitForTimeout(1500);
    const capabilitiesDeckPath = path.join(localScreenshotsDir, "atomest-premium-capabilities-pinned.png");
    await desktopPage.screenshot({ path: capabilitiesDeckPath });
    fs.copyFileSync(capabilitiesDeckPath, path.join(artifactsDir, "atomest-premium-capabilities-pinned.png"));
    console.log("Capabilities pinned deck screenshot saved.");

    // Desktop Pinned Workflow Conduit (#workflow)
    await desktopPage.evaluate(() => {
      document.querySelector("#workflow")?.scrollIntoView({ behavior: "instant" });
    });
    await desktopPage.waitForTimeout(1500);
    const workflowConduitPath = path.join(localScreenshotsDir, "atomest-premium-workflow-conduit.png");
    await desktopPage.screenshot({ path: workflowConduitPath });
    fs.copyFileSync(workflowConduitPath, path.join(artifactsDir, "atomest-premium-workflow-conduit.png"));
    console.log("Workflow conduit screenshot saved.");

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

    // Mobile Hero Command Center
    await mobilePage.evaluate(() => window.scrollBy(0, 480));
    await mobilePage.waitForTimeout(1000);
    const mobileHeroPath = path.join(localScreenshotsDir, "atomest-premium-hero-mobile.png");
    await mobilePage.screenshot({ path: mobileHeroPath });
    fs.copyFileSync(mobileHeroPath, path.join(artifactsDir, "atomest-premium-hero-mobile.png"));
    console.log("Mobile hero screenshot saved.");

    // Mobile Workflow
    await mobilePage.evaluate(() => {
      document.querySelector("#workflow")?.scrollIntoView({ behavior: "instant" });
    });
    await mobilePage.waitForTimeout(1200);
    const mobileWorkflowPath = path.join(localScreenshotsDir, "atomest-premium-workflow-mobile.png");
    await mobilePage.screenshot({ path: mobileWorkflowPath });
    fs.copyFileSync(mobileWorkflowPath, path.join(artifactsDir, "atomest-premium-workflow-mobile.png"));
    console.log("Mobile workflow screenshot saved.");

    console.log("All premium animation verification screenshots captured successfully!");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
