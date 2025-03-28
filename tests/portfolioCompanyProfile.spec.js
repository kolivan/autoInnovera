const { test, expect } = require('@playwright/test');
const { DiscoverPage } = require('../pages/discoverPage');
const { SigninPage } = require('../pages/signInPage');
const { CompanyPage } = require('../pages/companyPage');
const { PipelinePage } = require('../pages/pipelinePage');
const { generatedUserData } = require('../test-data/userData');

let signinPage;
let discoverPage;
let companyPage;
let pipelinePage;
const userData = generatedUserData();

test.describe('Portfolio Company Profile Tests', () => {
    test.beforeEach(async ({ page }) => {
        signinPage = new SigninPage(page);
        await signinPage.open();
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        // wait for navigation and dashboard load
        await page.waitForURL(/.*\/dashboard.*/);
        await page.waitForLoadState('networkidle');
        companyPage = new CompanyPage(page);
        discoverPage = new DiscoverPage(page);  
        pipelinePage = new PipelinePage(page);
    });

    test('C93: Open company page from Pipeline', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await expect(companyPage.marketSection).toBeVisible();
        await expect(companyPage.marketAndFiguresSection).toBeVisible();
        //await expect(companyPage.similarCompaniesShowMoreButton).toBeVisible();
        //await expect(companyPage.addToPipelineButton).toBeVisible();
    });

    test('C124: Upload file to Data room', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.openDataRoom();
        await companyPage.uploadFileToDataRoom('test-data/pitchDecks/Buddy.ai Series A Teaser Deck (2).pdf');
        await expect(page.locator('#root > div > div > div > div._container_aqqfd_1 > div._contentContainer_aqqfd_62 > div._container_1y1ba_1 > div > div._container_1vl30_1._containerExpanded_1vl30_69')).toBeVisible();
        await page.waitForTimeout(500);
    });

    test('C239: Add note', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.openNotes();
        await companyPage.addNewNote('blabla');
        await expect(page.getByText('blabla')).toBeVisible();
    });

    test('C241: Edit note', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.openNotes();
        await companyPage.editPrivateNote('blablatest');
        await expect(page.getByText('blablatest')).toBeVisible();
    });

    test('C245: Delete note', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.openNotes();
        await companyPage.deletePrivateNote();
        await expect(page.getByText('blabla')).not.toBeVisible();
        await expect(page.getByText('Note deleted successfully')).toBeVisible();
    });

    test('C126: Rename file', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.openDataRoom();
        await page.waitForLoadState('networkidle');
        await companyPage.renameFileNamePortfolio('Series A Teaser Deck (2).pdf');
        await expect(page.getByText('Series A Teaser Deck (2).pdf')).toBeVisible();
    });

    test('C125: Delete file', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.openDataRoom();
        await page.waitForLoadState('networkidle');
        await companyPage.deleteFile();
        await expect(page.getByText('File successfully deleted')).toBeVisible();
    });


    test('C415: Click LinkedIn icon', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        const pagePromise = page.waitForEvent('popup');
        await companyPage.clickLinkedInIconOnCompanyPage();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(/https:\/\/www\.linkedin\.com\/company\/verizon/);
    });

    test('C417: Click website', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        const pagePromise = page.waitForEvent('popup');
        await companyPage.clickWebsiteLinkOnCompanyPage();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL('https://www.verizon.com/');
    });

    test('C422: Add a new tag', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        const newTag = userData.randomTag;
        await companyPage.addTag(newTag);
        await expect(page.locator('div').filter({ hasText: newTag }).nth(1)).toBeVisible();
    });

    test('C423: Delete a tag', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.deleteTag();
    });

    test('C421: Add existing tag', async ({ page }) => {
        await pipelinePage.openPipelineForTesting();
        await pipelinePage.openCompanyProfilepage();
        await page.waitForLoadState('networkidle');
        await companyPage.addExistingTag();
        await companyPage.deleteTag();
    });
});







