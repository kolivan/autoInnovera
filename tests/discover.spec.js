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

test('C65: Open company page from header', async ({ page }) => {
    await discoverPage.openDiscoverPageFromHeader(); // Ensure DiscoverPage is opened after login
    await expect(page).toHaveURL(new RegExp('/.*\/companies/*'))
});

test('C67: Check pagination', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.firstCheckboxSelector.waitFor();
    await discoverPage.clickGoNextPaginationButton();
    await discoverPage.firstCheckboxSelector.waitFor();
    await expect(discoverPage.goPrevPaginationButton).toBeVisible();
    await expect(discoverPage.paginationChangePageButton).toContainText('2');
    
});

test('C78: Add company to pipeline', async ({ page }) => {
    await discoverPage.open(); // Ensure DiscoverPage is opened after login
    await discoverPage.addCompanyToPipeline();
    await expect(discoverPage.notification).toContainText("1 records added successfully to the pipeline, and 0 are already in the pipeline."); // Corrected assertion
});

test('C76: Select one company', async ({ page }) => {
    await discoverPage.open(); // Ensure DiscoverPage is opened after login
    await discoverPage.firstCheckboxSelector.click();
    await expect(discoverPage.addToPipelineButton).toBeEnabled();
    await expect(discoverPage.addTagButton).toBeEnabled();
});

test('C77: Select several companies', async ({ page }) => {
    await discoverPage.open(); // Ensure DiscoverPage is opened after login
    await discoverPage.firstCheckboxSelector.click();
    await discoverPage.secondCheckBoxSelector.click();
    await expect(discoverPage.addToPipelineButton).toBeEnabled();
    await expect(discoverPage.addTagButton).toBeDisabled();
});

test('C80: Add company which already in pipeline to pipeline', async ({ page }) => {
    await discoverPage.open(); // Ensure DiscoverPage is opened after login
    await discoverPage.addCompanyToPipeline();
    await expect(discoverPage.notification).toContainText("0 records added successfully to the pipeline, and 1 are already in the pipeline."); // Corrected assertion
});


test('C324: Sort companies by name', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.firstCheckboxSelector.waitFor();
    await discoverPage.sortByName();
    await discoverPage.firstCheckboxSelector.waitFor();
    await expect(page.getByText('* Bank & Trust Company')).toBeVisible();
});

test('C270: Sort companies by founding year', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.firstCheckboxSelector.waitFor();
    await discoverPage.sortByFoundingYear();
    await discoverPage.firstCheckboxSelector.waitFor();
    await expect(page.locator('div').filter({ hasText: /^1800$/ }).first()).toBeVisible();
});


test('C271: Sort companies by financial stage', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.firstCheckboxSelector.waitFor();
    await discoverPage.sortByFundingStage();
    await discoverPage.firstCheckboxSelector.waitFor();
    //await (page.locator('._card_1qqcf_1 > div:nth-child(4)).first()').selectText()).toContainText('Pre-Seed');
});

test('C272: Sort companies by total funding', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.firstCheckboxSelector.waitFor();
    await discoverPage.sortByTotalFunding();
    await discoverPage.firstCheckboxSelector.waitFor();
    //await expect(discoverPage.sortByTotalFunding).toHaveClass(/active/);
});

test('C291: Open Filter with Empty state', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.openFilter();
    await expect(discoverPage.clearAllFilterButton).toBeVisible();
    //await expect(discoverPage.sortByTotalFunding).toHaveClass(/active/);
});

test('C71: Filter by name', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.openFilter();
    await discoverPage.filterByDescription('Tesla');
    await discoverPage.numberOfCompanies.waitFor();
    await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 118');
});

test('C326: Filter by description', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.openFilter();
    await discoverPage.filterByDescription('analog semiconductors, III-V products, wireless communications');
    await discoverPage.numberOfCompanies.waitFor();
    await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 197');
});

test('C68: Search existing company', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.openFilter();
    await discoverPage.filterByDescription('Uber');
    await discoverPage.numberOfCompanies.waitFor();
    await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 61');
});

test('C69: Search not-existing company', async ({ page }) => {
    await discoverPage.open();
    await discoverPage.openFilter();
    await discoverPage.filterByDescription('lokshourfhf');
    await discoverPage.numberOfCompanies.waitFor();
    await expect(page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div[2]/div[2]/p')).toContainText('No matching companies found');
});
