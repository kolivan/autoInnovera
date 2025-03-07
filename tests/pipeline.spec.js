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

test('C26: Open pipeline page from the header', async ({ page }) => {
  await pipelinePage.openPipelinePageFromHeader();
  await expect(page.locator('#pipelinePage-addCompaniesOrangeButton')).toBeVisible();
});

test('C31: Create company by .pptx pitch deck upload', async ({ page }) => {
  await pipelinePage.open();
  await page.waitForTimeout(200);
  await pipelinePage.addCompanyByUploadingPitchDeck('test-data/pitchDecks/Copy of WaterGuru 200909 (1).pptx')
  await page.waitForTimeout(2000);
  await expect(page.getByText('Copy of WaterGuru 200909 (1).pptx')).toBeVisible();
  await page.waitForTimeout(5000);
});

test('C30: Create company by .pdf pitch deck upload', async ({ page }) => {
  await pipelinePage.open();
  await page.waitForTimeout(200);
  await pipelinePage.addCompanyByUploadingPitchDeck('test-data/pitchDecks/Buddy.ai Series A Teaser Deck (2).pdf')
  await page.waitForTimeout(2000);
  await expect(page.getByText('Buddy.ai Series A Teaser Deck (2).pdf')).toBeVisible();
  await page.waitForTimeout(5000);
});

test('C321: Add company by docSend link', async ({ page }) => {
  await pipelinePage.open();
  await page.waitForTimeout(200);
  await pipelinePage.addCompanyByDockSendLink('https://docsend.com/view/hvezdmir99m7sxb6');
  //await expect(page.getByText('hvezdmir99m7sxb6.pdf')).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(pipelinePage.uploadContainer).toBeVisible();
});

test('C29: Click Add Company button', async ({ page }) => {
  await pipelinePage.open();
  await page.waitForTimeout(200);
  await pipelinePage.clickAddCompanyButton();
  await page.waitForTimeout(300);
  await expect(pipelinePage.fileUploadButton).toBeVisible();
});

test('C228: Add new stage', async ({ page }) => {
  await pipelinePage.addNewStage('test');
  await expect(page.locator('div').filter({ hasText: /^test0$/ }).nth(1)).toBeVisible();
});

test('C262: Open Archive page', async ({ page }) => {
  await pipelinePage.openArchivePage();
  await expect(page).toHaveURL(new RegExp('/.*\/archived-companies/*'))
});

test('C228: Add a pipeline', async ({ page }) => {
  await pipelinePage.open();
  await pipelinePage.addNewPipeline('New auto pipeline')
  await expect(page.locator('#pipelineDropdown > button')).toContainText('New auto pipeline');
});

test('C325: Rename a stage', async ({ page }) => {
  await pipelinePage.open();
  await pipelinePage.renameStage('New stage');
  await expect(page.locator('div').filter({ hasText: /^New stage$/ }).nth(1)).toBeVisible();
});

test('C93: Open company profile page', async ({ page }) => {
  await pipelinePage.open();
  await pipelinePage.openCompanyProfilepage();
  await expect(page).toHaveURL(new RegExp('/.*\/portfolio-company-profile/*'));
});

test('C263: Archive company', async ({ page }) => {
  await pipelinePage.open();
  await pipelinePage.archiveCompany();
  await pipelinePage.openArchivePage();
  await page.waitForTimeout(2000);
  await expect(pipelinePage.archivedCompanyContextMenu).toBeVisible();
});

test('C264: Unarchive company', async ({ page }) => {
  await pipelinePage.open();
  //await pipelinePage.archiveCompany();
  await pipelinePage.openArchivePage();
  await pipelinePage.unarchiveCompany();
  await expect(page.getByText('Archive empty')).toBeVisible();
});

test('C45: Remove company', async ({ page }) => {
  await pipelinePage.open();
  await pipelinePage.removeCompany();
  await expect(page.getByText('Successfully deleted company')).toBeVisible();
});





