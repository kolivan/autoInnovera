const { test, expect } = require('@playwright/test');
const { SigninPage } = require('../pages/signInPage');
const { EmailClient } = require('../utils/mailinator');
const {generatedRegistrationData} = require('../test-data/userData');

let signinPage;
let testEmail;
const userData = generatedRegistrationData();


test.beforeEach(async ({ page }) => {
  signinPage = new SigninPage(page);
  await signinPage.open();
});

test('C19: Sign in as an Investor with valid data', async ({ page }) => {
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        await page.waitForTimeout(300);
        await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'));
});

test('C224: Sign in as a Founder with valid data', async ({ page }) => {
  await signinPage.signIn(process.env.FOUNDER_USER, process.env.PASSWORD);
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(new RegExp('/.*\/founder-company-profile/*'));
});

test('C223: Sign in as an Expert with valid data', async ({ page }) => {
  await signinPage.signIn(process.env.EXPERT_USER, process.env.PASSWORD);
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(new RegExp('/.*\/expert-dashboard/*'));
});

test('C23: Open Forgot password Page', async ({ page }) => {
  await signinPage.openForgotPasswordPage();
  await expect(page).toHaveURL(new RegExp('/.*\/forgot-password/*'));
});

test.only('C24: Reset password', async ({ page }) => {
  testEmail = new EmailClient();
  await signinPage.openForgotPasswordPage();
  await expect(page).toHaveURL(new RegExp('/.*\/forgot-password/*'));
  await signinPage.requestResetPasswordLink(process.env.FORGOT_PASSWORD_USER);
  await expect(page.getByText('If an Innovera account exists for '+process.env.FORGOT_PASSWORD_USER+', an email will be sent with further instructions. ')).toBeVisible();
  await page.waitForTimeout(500);
  const emailid = await testEmail.getEmailId();
  const emailRestorePwdLink = await testEmail.getRestorePasswordLinkFomEmail(emailid);
  await page.goto(emailRestorePwdLink);
  await expect(page).toHaveURL(new RegExp('/.*\/reset-password*'));
  const newPassword = userData.randomPassword;
  await signinPage.restorePassword(newPassword,newPassword);
  await expect(page.getByText('Great! Please log in with your new password')).toBeVisible()
  await expect(page).toHaveURL(new RegExp('/.*\/sign-in*'));
  await signinPage.signIn(process.env.FORGOT_PASSWORD_USER, newPassword);
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(new RegExp('/.*\/dashboard/*'));
  await testEmail.deleteAllEmails();
});


