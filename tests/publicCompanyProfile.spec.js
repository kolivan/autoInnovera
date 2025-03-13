const { test, expect } = require('@playwright/test');
const { DiscoverPage } = require('../pages/discoverPage');
const { SigninPage } = require('../pages/signInPage');
const { CompanyPage } = require('../pages/companyPage');
const { generatedUserData } = require('../test-data/userData');

let signinPage;
let discoverPage;
let companyPage;
const userData = generatedUserData();

test.describe('Public Company Profile Tests', () => {
    test.beforeEach(async ({ page }) => {
        signinPage = new SigninPage(page);
        await signinPage.open();
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        // wait for navigation and dashboard load
        await page.waitForURL(/.*\/dashboard.*/);
        await page.waitForLoadState('networkidle');
        companyPage = new CompanyPage(page);
        discoverPage = new DiscoverPage(page);
    });

    test('C95: Open company page', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        await expect(companyPage.marketSection).toBeVisible();
        await expect(companyPage.marketAndFiguresSection).toBeVisible();
        await expect(companyPage.similarCompaniesShowMoreButton).toBeVisible();
        await expect(companyPage.addToPipelineButton).toBeVisible();
    });

    test('C122: Open Data room for public company', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        await companyPage.openDataRoom();
        await expect(page.getByText('Add the company to your pipeline to upload files to the data room')).toBeVisible();
    });

    test('C136: Add a tag', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const newTag = userData.randomTag;
        await companyPage.addTag(newTag);
        await expect(page.locator('div').filter({ hasText: newTag }).nth(1)).toBeVisible();
    });

    test('C137: Delete a tag', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        await companyPage.deleteTag();
        await expect(page.locator('#root > div > div > div > div._container_aqqfd_1 > div._headerContainer_aqqfd_11 > div._headerContent_aqqfd_37 > div._container_np2xz_15 > div._block_np2xz_28 > div._tagsContainerBlock_np2xz_149 > div > div._customTagsContainer_np2xz_255 > div > div._container_1y404_1._customTag_1y404_12')).not.toBeVisible();
    });

    test('C104: Click linkedin icon', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const pagePromise = page.waitForEvent('popup');
        await companyPage.openLinkedIn();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(/https:\/\/www\.linkedin\.com\/company\/cellrep/);
    });

    test('C106: Click website', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const pagePromise = page.waitForEvent('popup');
        await companyPage.openWebsite();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(/https:\/\/www\.cellrep\.bio\//);
    });

    test('C322: Click Similar Companies', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const popupPromise = page.waitForEvent('popup');
        await companyPage.clickShowMoreButtonOnSimilarcompanies();
        const popupPage = await popupPromise;
        await popupPage.waitForLoadState('networkidle');
        await expect(popupPage.getByText('50 of 200')).toBeVisible();
    });
});

/*test('C95: Add company to the pipeline', async ({ page }) => {
    await companyPage.open('company-profile/334209'); 
    await companyPage.addCompanyToThePipeline();
    await expect(page4.getByText('50 of 200')).toBeVisible();
});*/






