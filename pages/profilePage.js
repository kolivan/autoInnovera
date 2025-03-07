import { Page } from "@playwright/test";
const { Header } = require("./header");
const { BasePage } = require("./basePage");

let header;

exports.ProfilePage = class ProfilePage extends BasePage {
    constructor(page) {
        super(page, '/settings');
        header = new Header(page);
        this.editPhotoIcon = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div/div[1]/div');
        this.changePhotoButton = page.getByRole('button', { name: 'Change' })
        this.editNameButton = page.getByText('Edit').first();
        this.editBioButton = page.getByText('Edit').nth(1);
        this.firstNameField = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div/div[2]/div[1]/div[2]/div[1]/div[1]/input');
        this.lastNameField = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div/div[2]/div[1]/div[2]/div[1]/div[2]/input');
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.editBioField = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[2]/textarea');
        this.savedBio = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div/div[2]/div[3]/div[2]/p');
        this.savedPersonalInfo = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[2]/div/div[2]/div[1]/p');
    }

    async openProfilePageFromHeader(){
        await header.openSettingsPage();
    }

    async editPersonaInfo(firstName, lastName) {
        await this.editNameButton.click();
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.saveButton.click();
    }

    async editBio(newBio) {
        await this.editBioButton.click();
        await this.editBioField.fill(newBio);
        await this.saveButton.click();
    }

   /* async editPhoto(photo) {
        await this.editPhotoIcon.click();
        await this.changePhotoButton.click();
        await fileChooserPromise;
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(photo);
        //await this.fileUploadButton.setInputFiles(photo);
        await this.page.waitForTimeout(2000);
    }*/

    async logoutFromApp(){
        await header.logoutFromApp();
    }

}