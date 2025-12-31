import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  

  fullyParallel: true,

  
  timeout: 90 * 1000, 
  
  expect: {
    
    timeout: 10000, 
  },
  
  forbidOnly: !!process.env.CI,


  retries: process.env.CI ? 2 : 1,

  
  workers: process.env.CI ? 1 : undefined,


  reporter: 'html',
  
  use: {
   
    baseURL: 'https://www.demoblaze.com/', 

   
    actionTimeout: 15 * 1000, 
    
    
    navigationTimeout: 30 * 1000,

   
    trace: 'on-first-retry',

    
    screenshot: 'only-on-failure',
  },

  
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