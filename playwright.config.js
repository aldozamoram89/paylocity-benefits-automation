// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  reporter: 'list',
  use: {
    headless: false,
    slowMo: 2000,
    baseURL: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod',
  },
};

module.exports = config;