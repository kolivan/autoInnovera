const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registrationPage');

let registrationPage;


test('register a new organization', async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.openOrgRegistrationPage();
    // await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'))
    await page.waitForTimeout(10000);
});

