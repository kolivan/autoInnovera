const { test, expect } = require('@playwright/test');
const { ExpertPage } = require('../pages/expertPage');
const { SigninPage } = require('../pages/signInPage');
const { generatedUserData } = require('../test-data/userData');
const path = require('path');

let signinPage;
let expertPage;
const userData = generatedUserData();

test.describe('Expert Tests', () => {
    test.beforeEach(async ({ page }) => {
        signinPage = new SigninPage(page);
        await signinPage.open();
        await signinPage.signIn(process.env.EXPERT_USER, process.env.PASSWORD);
        await page.waitForURL(/.*\/expert-dashboard.*/);
        await page.waitForLoadState('networkidle');
        expertPage = new ExpertPage(page);
    });

    test('C196: Open a dashboard', async ({ page }) => {
        await expect(page.locator('#root > div > div > div > div._wrapper_r9v1g_1 > div._contentTableBlock_r9v1g_4 > div._stickyContainer_43iml_1 > div > div._checkboxContainer_43iml_14 > p')).toContainText('Company');
        await expect(page.getByText('Pipeline stage')).toBeVisible();
        await expect(page.getByText('Financial stage')).toBeVisible();
        await expect(page.getByText('Total funding')).toBeVisible();
        await expect(page.getByText('Investors')).toBeVisible();
        await expect(page.getByText('Location')).toBeVisible();
        await expect(page.getByText('Website')).toBeVisible();
    });

    test('C209: Change organization', async ({ page }) => {
        await expertPage.changeOrganization();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText('No matching companies found')).toBeVisible();
    });

    test('C197: Open a company profile', async ({ page }) => {
        await expertPage.openFirstCompany();
        await page.waitForLoadState('networkidle');
        await expect(page.locator('#root > div > div > div > div._container_e1yoo_1 > div._contentBlock_e1yoo_17 > div > div:nth-child(6) > div > div > div > div:nth-child(3) > div:nth-child(2) > div._contentWrapper_z6uqn_7 > div > div > div._loaderContainer_et4ku_29')).not.toBeVisible();
        await expect(page.getByText('Error fetching similar companies')).not.toBeVisible();
    });

    test('C199: Check documents in the data room', async ({ page }) => {
        await expertPage.openFirstCompany();
        await page.waitForLoadState('networkidle');
        await expertPage.openDataRoom();
        await expect(page.getByRole('button', { name: 'File Upload' })).toBeVisible();
    });

    test('C202: Rename a document as Expert', async ({ page }) => {
        await expertPage.openSecondCompany();
        await page.waitForURL(/.*\/portfolio-company-profile.*/);
        await page.waitForLoadState('networkidle');
        await expertPage.openDataRoom();
        await expertPage.renameFileName('test');
        await expect(page.getByText('Error renaming file')).toBeVisible();
    });

    test('C198: Add a note', async ({ page }) => {
        await expertPage.openFirstCompany();
        await page.waitForURL(/.*\/portfolio-company-profile.*/);
        await page.waitForLoadState('networkidle');
        await expertPage.openNotes();
        await expertPage.addNewNote('blabla');
        await expect(page.getByText('blabla')).toBeVisible();
    });

    test('C210: Edit a note', async ({ page }) => {
        await expertPage.openFirstCompany();
        await page.waitForURL(/.*\/portfolio-company-profile.*/);
        await expertPage.openNotes();
        await page.waitForLoadState('networkidle');
        await expertPage.editNote('blablatest');
        await expect(page.getByText('blablatest')).toBeVisible();
    });

    test('C200: Upload file to data room', async ({ page }) => {
        await expertPage.openFirstCompany();
        await page.waitForURL(/.*\/portfolio-company-profile.*/);
        await page.waitForLoadState('networkidle');
        await expertPage.openDataRoom();
        await expertPage.uploadFileToDataRoom('test-data/pitchDecks/Buddy.ai Series A Teaser Deck (2).pdf');
        await expect(page.locator('#root > div > div > div > div._container_e1yoo_1 > div._contentContainer_e1yoo_64 > div._container_1y1ba_1 > div._container_14z5z_1._containerExpanded_14z5z_68')).toBeVisible();
    });

    test('C211: Delete a note', async ({ page }) => {
        await expertPage.openFirstCompany();
        await page.waitForURL(/.*\/portfolio-company-profile.*/);
        await page.waitForLoadState('networkidle');
        await expertPage.openNotes();
        await expertPage.deleteNote();
        await expect(page.getByText('blablatest')).not.toBeVisible();
        await expect(page.getByText('Note deleted successfully')).toBeVisible();
    });
});
