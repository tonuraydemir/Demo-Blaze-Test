import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,

  // KRİTİK: Test başına genel zaman aşımı (90 saniye)
  timeout: 90 * 1000, 
  
  // expect() ve diğer assert'ler için zaman aşımı
  expect: {
    timeout: 10000, 
  },
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // KRİTİK AYAR 1: Temel URL'iniz doğru tanımlanmış.
    baseURL: 'https://www.demoblaze.com/', 

    // KRİTİK AYAR 2: Tıklama, doldurma gibi işlemler için zaman aşımı.
    actionTimeout: 30 * 1000,
    
    // KRİTİK AYAR 3: Sayfaya gitme (goto) veya yönlendirme için zaman aşımı. 
    // Cloudflare'i atlatmaya çalışırken bu çok önemlidir.
    navigationTimeout: 30 * 1000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});