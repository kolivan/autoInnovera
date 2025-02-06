const { test, expect } = require('@playwright/test');
const { DiscoverPage } = require('../pages/discoverPage');
const { SigninPage } = require('../pages/signInPage');

let signinPage;
let discoverPage;

test.beforeEach(async ({ page }) => {
  signinPage = new SigninPage(page);
  await signinPage.open();
  await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
  await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'))
  await page.waitForTimeout(1000); 
  discoverPage = new DiscoverPage(page);
});

/*@TestRailCaseID=12345
test('Add company to pipeline', async () => {
    await discoverPage.open(); // Ensure DiscoverPage is opened after login
    await discoverPage.addCompanyToPipeline();
    await expect(discoverPage.notification).toContainText("1 records added successfully to the pipeline, and 0 are already in the pipeline."); // Corrected assertion
});*/