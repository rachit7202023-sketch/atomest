import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const services = document.querySelector("#services");
    const parent = services?.parentElement;
    const workflow = document.querySelector("#workflow");

    const before = {
      servicesOffsetTop: services?.offsetTop,
      servicesHeight: services?.offsetHeight,
      parentClass: parent?.className,
      parentStyle: parent?.getAttribute("style"),
      workflowOffsetTop: workflow?.offsetTop,
      scrollY: window.scrollY,
      servicesRect: services?.getBoundingClientRect(),
      workflowRect: workflow?.getBoundingClientRect(),
    };

    window.scrollTo({ top: 2000, behavior: "instant" });
    const at2000 = {
      scrollY: window.scrollY,
      servicesRect: services?.getBoundingClientRect(),
      workflowRect: workflow?.getBoundingClientRect(),
    };

    window.scrollTo({ top: 2800, behavior: "instant" });
    const at2800 = {
      scrollY: window.scrollY,
      servicesRect: services?.getBoundingClientRect(),
      workflowRect: workflow?.getBoundingClientRect(),
    };

    return { before, at2000, at2800 };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

main().catch(console.error);
