const { test, expect } = require('@playwright/test');
const { PipelinePage } = require('../pages/pipelinePage');
const { SigninPage } = require('../pages/signInPage');
const { ProfilePage } = require('../pages/profilePage');

let signinPage;
let pipelinePage;
let profilePage;

test.beforeEach(async ({ page }) => {
  signinPage = new SigninPage(page);
  await signinPage.open();
  await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
  await page.waitForTimeout(500);
  profilePage = new ProfilePage(page);
});

test('C85: Open profile page', async ({ page }) => {
  await profilePage.openProfilePageFromHeader();
  await expect(profilePage.editNameButton).toBeVisible;
});

test('C88: Change BIO', async ({ page }) => {
    await profilePage.openProfilePageFromHeader();
    await expect(profilePage.editNameButton).toBeVisible;
    let newBio = 'New bio';
    let secondBio = 'Test bio';
    await profilePage.editBio(newBio);
    await expect(profilePage.savedBio).toHaveText(newBio);
    await page.waitForTimeout(200);
    await profilePage.editBio(secondBio);
    await expect(profilePage.savedBio).toHaveText(secondBio);
  });

  test('C87:   Change Name and Last name', async ({ page }) => {
    await profilePage.openProfilePageFromHeader();
    await expect(profilePage.editNameButton).toBeVisible;
    let newFirstName = 'Mia';
    let newLastName = 'Test';
    let secondFirstName = 'Sara';
    let secondLastName = 'Ko';
    await profilePage.editPersonaInfo(newFirstName,newLastName);
    await expect(profilePage.savedPersonalInfo).toHaveText(newFirstName + ' ' + newLastName);
    await profilePage.editPersonaInfo(secondFirstName,secondLastName);
    await expect(profilePage.savedPersonalInfo).toHaveText(secondFirstName + ' ' + secondLastName);
  });

  test('C92: Logout from app', async ({ page }) => {
    await profilePage.logoutFromApp();
    await expect(page).toHaveURL(new RegExp('/.*\/sign-in/*'))
  });

  /*test.only('C86: Change photo', async ({ page }) => {
    await profilePage.openProfilePageFromHeader();
    await expect(profilePage.editNameButton).toBeVisible;
    await profilePage.editPhoto('/Users/hkolyvan/Desktop/innoveraAuto/test-data/pitchDecks/TG_Avatar_Logo.png')
    await this.page.waitForTimeout(2000);
  });*/

