import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const test = await page.evaluate(() => {
    const section = document.querySelector("#services");
    const track = document.querySelector("#services .flex.items-stretch");
    const spacer = section ? section.parentElement : null;

    return {
      sectionId: section ? section.id : null,
      trackWidth: track ? track.scrollWidth : null,
      spacerTag: spacer ? spacer.tagName : null,
      spacerClass: spacer ? spacer.className : null,
      spacerStyle: spacer ? spacer.getAttribute("style") : null,
      bodyScrollHeight: document.body.scrollHeight,
      windowHeight: window.innerHeight,
    };
  });

  console.log("Inspection:", test);
  await browser.close();
}

main().catch(console.error);
