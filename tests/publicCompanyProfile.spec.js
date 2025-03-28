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

    test('C525: Open company page', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        await expect(companyPage.marketSection).toBeVisible();
        await expect(companyPage.marketAndFiguresSection).toBeVisible();
        //await expect(companyPage.similarCompaniesShowMoreButton).toBeVisible();
        await expect(companyPage.addToPipelineButton).toBeVisible();
    });

    test('C122: Open Data room for public company', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        await companyPage.openDataRoom();
        await expect(page.getByText('Add the company to your pipeline to upload files to the data room')).toBeVisible();
    });

    test('C367: Add a tag', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const newTag = userData.randomTag;
        await companyPage.addTag(newTag);
        await expect(page.locator('div').filter({ hasText: newTag }).nth(1)).toBeVisible();
    });

    test('C360: Click linkedin icon', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const pagePromise = page.waitForEvent('popup');
        await companyPage.openLinkedIn();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(/https:\/\/www\.linkedin\.com\/company\/cellrep/);
    });

    test('C362: Click website', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        const pagePromise = page.waitForEvent('popup');
        await companyPage.openWebsite();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL('https://cellrep.bio/'); 
    });

    test('C365: Click Similar Companies', async ({ page }) => {
        await discoverPage.open();
        await page.getByText('Pfizer').nth(2).click();
        await companyPage.clickShowMoreButtonOnSimilarcompanies();
        const pagePromise = page.waitForEvent('popup');
        const newPage = await pagePromise;
        await newPage.waitForLoadState('networkidle');
        await expect(newPage.getByText('1-50 of 200')).toBeVisible();
    });

    test('C368: Delete a tag', async ({ page }) => {
        await companyPage.open();
        await page.waitForLoadState('networkidle');
        await companyPage.deleteTag();
        await expect(page.locator('#root > div > div > div > div._container_aqqfd_1 > div._headerContainer_aqqfd_11 > div._headerContent_aqqfd_37 > div._container_np2xz_15 > div._block_np2xz_28 > div._tagsContainerBlock_np2xz_149 > div > div._customTagsContainer_np2xz_255 > div > div._container_1y404_1._customTag_1y404_12')).not.toBeVisible();
    });

    test('C96: Add company to the pipeline', async ({ page }) => {
        await discoverPage.open();
        await page.getByText('Ant Group').nth(1).click();
        await companyPage.addCompanyToThePipeline();
        await expect(page.getByText('1 records added successfully to the pipeline, and 0 are already in the pipeline.')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add to pipeline' })).not.toBeVisible();
    });

    test('C364: Click markets source link', async ({ page }) => {
        await discoverPage.open();
        await page.locator('._companyInfo_tuv9p_7').nth(3).click();
        await companyPage.openMarketSourceReport();
        const pagePromise = page.waitForEvent('popup');
        const newPage = await pagePromise;
        await newPage.waitForLoadState('networkidle');
        await expect(newPage).toHaveURL('https://pdf.marketpublishers.com/bosson_research/global-ridesharing-market-research-report-2024status-n-outlook.pdf');
    });

    test('C366: Add existing tag', async ({ page }) => {
        await discoverPage.open();
        await page.locator('._companyInfo_tuv9p_7').nth(3).click();
        await companyPage.addExistingTag();
        await expect(page.locator('div').filter({ hasText: 'heartbeat' }).nth(1)).toBeVisible();
        await page.waitForLoadState('networkidle');
        await companyPage.deleteTag();
        await expect(page.locator('#root > div > div > div > div._container_aqqfd_1 > div._headerContainer_aqqfd_11 > div._headerContent_aqqfd_37 > div._container_np2xz_15 > div._block_np2xz_28 > div._tagsContainerBlock_np2xz_149 > div > div._customTagsContainer_np2xz_255 > div > div._container_1y404_1._customTag_1y404_12')).not.toBeVisible();
    });
});








