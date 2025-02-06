const { test, expect } = require('@playwright/test');
const { PipelinePage } = require('../pages/pipelinePage');
const { SigninPage } = require('../pages/signInPage');

let signinPage;
let pipelinePage;

test.beforeEach(async ({ page }) => {
  signinPage = new SigninPage(page);
  await signinPage.open();
  await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
  await page.waitForTimeout(500);
  pipelinePage = new PipelinePage(page);
});

test('Add a pipeline', async ({ page }) => {
        await pipelinePage.open();
        await pipelinePage.addNewPipeline('New auto pipeline')
       // await page.waitForTimeout(20000);
        await expect(page.locator('#pipelineDropdown > button')).toContainText('New auto pipeline');
});

