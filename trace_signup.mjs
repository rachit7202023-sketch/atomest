import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  let signupRequestCount = 0;
  
  page.on('request', request => {
    if (request.url().includes('/auth/v1/signup') && request.method() === 'POST') {
      signupRequestCount++;
      console.log(`[REQUEST ${signupRequestCount}] POST ${request.url()}`);
    }
  });

  page.on('response', async response => {
    if (response.url().includes('/auth/v1/signup') && response.request().method() === 'POST') {
      console.log(`[RESPONSE] Status: ${response.status()}`);
      try {
        const body = await response.json();
        console.log(`[RESPONSE BODY]`, JSON.stringify(body));
      } catch (e) {
        console.log(`[RESPONSE BODY] Could not parse json`);
      }
    }
  });

  await page.goto('http://localhost:3000/signup');
  
  // Fill the form
  await page.fill('input#name', 'Playwright Test');
  const timestamp = Date.now();
  await page.fill('input#email', `pw.test.${timestamp}@example.com`);
  await page.fill('input#password', 'StrongPass123!');
  await page.fill('input#confirmPassword', 'StrongPass123!');
  
  console.log("Form filled. Clicking sign up button exactly once...");
  
  // Wait a bit to ensure UI is ready
  await page.waitForTimeout(1000);
  
  // Click submit exactly once
  await page.click('button[type="submit"]');
  
  // Wait 3 seconds to capture all requests
  await page.waitForTimeout(3000);
  
  console.log(`\nTotal signup POST requests detected: ${signupRequestCount}`);
  
  await browser.close();
})();
