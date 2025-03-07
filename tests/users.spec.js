const { test, expect } = require('@playwright/test');
const { UsersPage } = require('../pages/usersPage');
const { SigninPage } = require('../pages/signInPage');

let signinPage;
let usersPage;

test.beforeEach(async ({ page }) => {
    signinPage = new SigninPage(page);
    await signinPage.open();
    await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
    await page.waitForTimeout(500);
    usersPage = new UsersPage(page);
});

test('C89: Open users page', async ({ page }) => {
    await usersPage.openUsersPageFromHeader();
    await page.waitForTimeout(300);
    await expect(page.getByRole('button', { name: 'Add User' })).toBeVisible();
       //await expect(page.locator('#pipelineDropdown > button')).toContainText('New auto pipeline');
});

