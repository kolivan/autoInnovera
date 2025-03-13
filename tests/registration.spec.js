const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/registrationPage');
const {generatedUserData} = require('../test-data/userData');
const { EmailClient } = require('../utils/mailinator');
const { UsersPage } = require('../pages/usersPage');
const { ExpertsPage } = require('../pages/expertsPage');
const { SigninPage } = require('../pages/signInPage');
const { DiscoverPage } = require('../pages/discoverPage');

let signinPage;
let usersPage;
let expertsPage;
let testEmail;
let registrationPage;
const userData = generatedUserData();

test('C5: Register a new organization', async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.openOrgRegistrationPage();
    await page.waitForTimeout(200);
    await registrationPage.registerNewOrganization(userData.randomFirstName , userData.randomLastName, userData.randomOrgName, 'qweASD123');
    await page.waitForTimeout(200);
    await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'))
});

test('C9: Invite an Investor', async ({ page }) => {
        testEmail = new EmailClient();
        usersPage = new UsersPage(page);
        await testEmail.deleteAllEmails();
        signinPage = new SigninPage(page);
        const timestamp = Date.now();
        const userEmail = `hanna+${timestamp}@team817651.testinator.com`;
        await signinPage.open();
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        await page.waitForTimeout(300);
        await usersPage.openUsersPageFromHeader();
        await page.waitForTimeout(300);
        await usersPage.addInvestor(userEmail)
        await expect(page.getByText('User invited successfully')).toBeVisible();
});

test('C10: Open registration page', async ({ page }) => {
    testEmail = new EmailClient();
    registrationPage = new RegistrationPage(page);
    const emailid = await testEmail.getEmailId();
    const emailRegistrationLink = await testEmail.getRegistrationLinkFomEmail(emailid);
    await registrationPage.openRegistrationPage(emailRegistrationLink);
    await page.waitForTimeout(200);
    //await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'));
});


test('C13: Register a new investor', async ({ page }) => {
    testEmail = new EmailClient();
    registrationPage = new RegistrationPage(page);
    const emailid = await testEmail.getEmailId();
    const emailRegistrationLink = await testEmail.getRegistrationLinkFomEmail(emailid);
    await registrationPage.openRegistrationPage(emailRegistrationLink);
    await page.waitForTimeout(200);
    await registrationPage.registerNewInvestorOrExpert(userData.randomFirstName , userData.randomLastName, 'qweASD123');
    await page.waitForTimeout(200);
    await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'));
    await testEmail.deleteAllEmails();
});

test('C225: Invite an Expert', async ({ page }) => {
    const timestamp = Date.now();
    const userEmail = `hanna+${timestamp}@team817651.testinator.com`;
    signinPage = new SigninPage(page);
    await signinPage.open();
    await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
    await page.waitForTimeout(200);
    expertsPage = new ExpertsPage(page);
    await expertsPage.openUsersPageFromHeader();
    await expertsPage.addExpert(userEmail)
    await expect(page.getByText('Sent invite to '+userEmail)).toBeVisible();
});

test('C226: Register an Expert', async ({ page }) => {
    testEmail = new EmailClient();
    registrationPage = new RegistrationPage(page);
    const emailid = await testEmail.getEmailId();
    const emailRegistrationLink = await testEmail.getRegistrationLinkFomEmail(emailid);
    await registrationPage.openRegistrationPage(emailRegistrationLink);
    await page.waitForTimeout(200);
    await registrationPage.registerNewInvestorOrExpert(userData.randomFirstName , userData.randomLastName, 'qweASD123');
    await page.waitForTimeout(200);
    await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'));
    await testEmail.deleteAllEmails();
});

test('C14: Click Terms of Use link ', async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.openOrgRegistrationPage();
    await page.waitForTimeout(200);
    await registrationPage.openTCPage();
    await expect(page).toHaveURL(new RegExp('/.*\/terms-of-use/*'))
});

test('C15: Click Privacy Policy link ', async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.openOrgRegistrationPage();
    await page.waitForTimeout(200);
    await registrationPage.openPrivacyPolicyPage();
    await expect(page).toHaveURL(new RegExp('/.*\/privacy-notice/*'))
});