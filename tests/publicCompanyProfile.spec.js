const { test, expect } = require('@playwright/test');
const { DiscoverPage } = require('../pages/discoverPage');
const { SigninPage } = require('../pages/signInPage');
const { CompanyPage } = require('../pages/companyPage');

let signinPage;
let discoverPage;
let companyPage;

test.beforeEach(async ({ page }) => {
  signinPage = new SigninPage(page);
  await signinPage.open();
  await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
  await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'))
  await page.waitForTimeout(1000); 
  companyPage = new CompanyPage(page);
  discoverPage = new DiscoverPage(page);
});

test('C95: Open company page', async ({ page }) => {
    await companyPage.open(); 
    await expect(companyPage.marketSection).toBeVisible();
    await expect(companyPage.marketAndFiguresSection).toBeVisible();
    await expect(companyPage.similarCompaniesShowMoreButton).toBeVisible();
    await expect(companyPage.addToPipelineButton).toBeVisible();
});

test('C122: Open Data room for public company', async ({ page }) => {
    await companyPage.open(); // Ensure DiscoverPage is opened after login
    await companyPage.openDataRoom();
    await expect(page.getByText('Add the company to your pipeline to upload files to the data room')).toBeVisible();
});

test('C136: Add a tag', async ({ page }) => {
    await companyPage.open(); // Ensure DiscoverPage is opened after login
    await companyPage.addTag('test auto tag');
    await page.waitForTimeout(500);
    await expect(page.locator('div').filter({ hasText: /^test auto tag$/ })).toBeVisible();
    await page.waitForTimeout(2000);
});

test('C104: Click linkedin icon', async ({ page }) => {
    await companyPage.open(); // Ensure DiscoverPage is opened after login
    await companyPage.openLinkedIn();
    const pagePromise = page.waitForEvent('popup');
    const page1 = await pagePromise;
    await expect(page1).toHaveURL(new RegExp('https://www.linkedin.com/company/cellrep'));
});

test('C106: Click website', async ({ page }) => {
    await companyPage.open(); 
    await companyPage.openWebsite();
    const pagePromise = page.waitForEvent('popup');
    const page1 = await pagePromise;
    await expect(page1).toHaveURL(new RegExp('https://www.cellrep.bio/'));
});

test('C322: Click Similar Companies', async ({ page }) => {
    await companyPage.open(); 
    await page.waitForTimeout(3000);
    await companyPage.clickShowMoreButtonOnSimilarcompanies();
    const page4Promise = page.waitForEvent('popup');
    const page4 = await page4Promise;
    await page.waitForTimeout(2000);
    await expect(page4.getByText('50 of 200')).toBeVisible();
});

/*test('C95: Add company to the pipeline', async ({ page }) => {
    await companyPage.open('company-profile/334209'); 
    await companyPage.addCompanyToThePipeline();
    await expect(page4.getByText('50 of 200')).toBeVisible();
});*/






