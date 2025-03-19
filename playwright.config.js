// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const dotenv = require('dotenv');
dotenv.config({ path: '.env', override: true });
dotenv.config({ path: `.env.${process.env.ENV || 'stage'}` });
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = {
  globalSetup:'utils/globalSetup.js',
  //retries: 2,
  testDir: './tests',
  /* Run tests in files in parallel */
  /*fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  /*forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  /*retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  /*workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
  ['list'],
  ['playwright-testrail-reporter']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
   // baseUrl: process.env.STAGING === '1' ? 'https://dashboard-development.innovera.ai' : 'https://beta.innovera.ai/',
   baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },


    /*{
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },*/
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

