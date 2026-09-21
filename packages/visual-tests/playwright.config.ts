import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['github']] : 'html',
  use: {
    baseURL: BASE_URL(),
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use the system Chrome installation (avoids Playwright CDN download
        // failures in restricted networks). Falls back to bundled Chromium
        // when `channel` is overridden in CI.
        channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || 'chrome',
      },
    },
  ],
});

function BASE_URL(): string {
  return process.env.DOCS_URL || 'https://galaxy-nebula.vercel.app';
}
