const { test, expect } = require('@playwright/test');
const { SigninPage } = require('../pages/signInPage');
const { ProfilePage } = require('../pages/profilePage');
const {generatedUserData} = require('../test-data/userData');


let signinPage;
let pipelinePage;
let profilePage;
const userData = generatedUserData();

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
    let newBio = userData.randomBio;
    await profilePage.editBio(newBio);
    await expect(profilePage.savedBio).toHaveText(newBio);
  });

  test('C87:   Change Name and Last name', async ({ page }) => {
    await profilePage.openProfilePageFromHeader();
    await expect(profilePage.editNameButton).toBeVisible;
    let newFirstName = userData.randomFirstName;
    let newLastName = userData.randomLastName;
    await profilePage.editPersonaInfo(newFirstName,newLastName);
    await expect(profilePage.savedPersonalInfo).toHaveText(newFirstName + ' ' + newLastName);
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

