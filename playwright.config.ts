import { defineConfig, devices } from '@playwright/test';

const appPort = 3007;
const mockApiPort = 4010;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${appPort}`,
    trace: 'on-first-retry',
  },
  webServer: [
    {
      command: 'node e2e/mock-api-server.mjs',
      port: mockApiPort,
      reuseExistingServer: false,
      timeout: 120 * 1000,
    },
    {
      command:
        'rm -rf .next && ' +
        `NEXT_PUBLIC_API_URL=http://127.0.0.1:${mockApiPort}/api/test-store ` +
        `INDEX_BILLBOARD_ID=test-billboard npm run dev -- --port ${appPort}`,
      port: appPort,
      reuseExistingServer: false,
      timeout: 120 * 1000,
    },
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
