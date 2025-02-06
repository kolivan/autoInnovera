const { test, expect } = require('@playwright/test');
const { SigninPage } = require('../pages/signInPage');

let signinPage;


test.beforeEach(async ({ page }) => {
  signinPage = new SigninPage(page);
  await signinPage.open();
});

test('C19: Signin as an Investor valid data', async ({ page }) => {
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'))
        //await page.waitForTimeout(10000);
});

test('C224: Signin as a Founder valid data', async ({ page }) => {
  await signinPage.signIn(process.env.FOUNDER_USER, process.env.PASSWORD);
  await expect(page).toHaveURL(new RegExp('/.*\/founder-company-profile/*'))
  //await page.waitForTimeout(10000);
});

test('C223: Signin as an Expert valid data', async ({ page }) => {
  await signinPage.signIn(process.env.EXPERT_USER, process.env.PASSWORD);
  await expect(page).toHaveURL(new RegExp('/.*\/expert-dashboard/*'))
  //await page.waitForTimeout(10000);
});

