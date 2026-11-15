import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: ["**/*.test.*", "**/*.spec.*", "**/*.e2e.*"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npx vite preview --port 3001",
    url: "http://localhost:3001",
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
});
