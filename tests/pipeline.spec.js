const { test, expect } = require('@playwright/test');
const { PipelinePage } = require('../pages/pipelinePage');
const { SigninPage } = require('../pages/signInPage');
const { generatedUserData } = require('../test-data/userData');

let signinPage;
let pipelinePage;
const userData = generatedUserData();
let tagName;

test.describe('Pipeline Tests', () => {
    test.beforeEach(async ({ page }) => {
        signinPage = new SigninPage(page);
        await signinPage.open();
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        tagName = userData.randomTag
        // wait for navigation and dashboard load
        await page.waitForURL(/.*\/dashboard.*/);
        await page.waitForLoadState('networkidle');
        pipelinePage = new PipelinePage(page);
    });

    test('C26: Open pipeline page from the header', async ({ page }) => {
        await pipelinePage.openPipelinePageFromHeader();
        await expect(page.locator('#pipelinePage-addCompaniesOrangeButton')).toBeVisible();
    });

    test('C31: Create company by .pptx pitch deck upload', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.addCompanyByUploadingPitchDeck('test-data/pitchDecks/Copy of WaterGuru 200909 (1).pptx');
        await expect(page.getByText('Copy of WaterGuru 200909 (1).pptx')).toBeVisible();
        await page.waitForTimeout(3000);
    });

    test('C30: Create company by .pdf pitch deck upload', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.addCompanyByUploadingPitchDeck('test-data/pitchDecks/Buddy.ai Series A Teaser Deck (2).pdf');
        await expect(page.getByText('Buddy.ai Series A Teaser Deck (2).pdf')).toBeVisible();
        await page.waitForTimeout(3000);
    });

    test('C321: Add company by docSend link', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.addCompanyByDockSendLink('https://docsend.com/view/hvezdmir99m7sxb6');
        await expect(pipelinePage.uploadContainer).toBeVisible();
        await page.waitForTimeout(3000);
    });

    test('C29: Click Add Company button', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.clickAddCompanyButton();
        await expect(pipelinePage.fileUploadButton).toBeVisible();
    });

    test('C262: Open Archive page', async ({ page }) => {
        await pipelinePage.openArchivePage();
        await page.waitForURL(/.*\/archived-companies.*/);
        await page.waitForLoadState('networkidle');
    });

    test('C93: Open company profile page', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.openCompanyProfilepage();
        await expect(page).toHaveURL(/.*\/portfolio-company-profile.*/);
    });

    test('C263: Archive company', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.archiveCompany();
        await pipelinePage.openArchivePage();
        await expect(pipelinePage.archivedCompanyContextMenu).toBeVisible();
    });

    test('C264: Unarchive company', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.openArchivePage();
        await pipelinePage.unarchiveCompany();
        await expect(page.getByText('Archive empty')).toBeVisible();
    });

    test('C45: Remove company', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.removeCompany();
        await expect(page.getByText('Successfully deleted company')).toBeVisible();
    });

    test('C228: Add new stage', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        const newStageName = userData.randomStageName;
        await pipelinePage.addNewStage(newStageName);
        await expect(page.locator('div').filter({ hasText: newStageName }).nth(1)).toBeVisible();
    });

    test('C280: Add a pipeline', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        const pipelineName = userData.randomTag;
        await pipelinePage.addNewPipeline(pipelineName);
        await expect(page.getByRole('button', { name: pipelineName })).toBeVisible();
    });

    test('C325: Rename a stage', async ({ page }) => {
        await pipelinePage.open();
        await page.waitForLoadState('networkidle');
        await pipelinePage.renameStage('New stage');
        await expect(page.locator('div').filter({ hasText: /^New stage$/ }).nth(1)).toBeVisible();
    });

    test('C41: Add tag to company', async ({ page }) => {
        await pipelinePage.open();
        await pipelinePage.openPipelineForTesting();
        await page.waitForLoadState('networkidle');
        await pipelinePage.addTagToCompany(tagName);
        await pipelinePage.openCompanyProfilepage();
        await expect(page.getByText(tagName)).toBeVisible();
    });

    test('C526: Delete a tag', async ({ page }) => {
        await pipelinePage.open();
        await pipelinePage.openPipelineForTesting();
        await page.waitForLoadState('networkidle');
        await pipelinePage.deleteTagFromCompany();
        await pipelinePage.openCompanyProfilepage();
        await expect(page.getByText(tagName)).not.toBeVisible();
    });
});



