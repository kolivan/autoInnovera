const { BasePage } = require("./basePage");
const {request} = require('@playwright/test');
const { Header } = require('./header');

let header;

exports.UsersPage = class UsersPage extends BasePage {

    constructor(page) {
        super(page, '/settings?section=Users');
        header = new Header(page);
        this.usersTab = page.getByText('Users');
        this.adduserButton = page.getByRole('button', { name: 'Add User' });
        this.emailField = page.getByPlaceholder('Email');
        this.addEmailButton = page.getByRole('button', { name: 'Add User' }).nth(1);
        
    }

    async openUsersPageFromHeader(){
        await header.openSettingsPage();
        await this.usersTab.click();
    }

    async addInvestor(email) {
        await this.adduserButton.click();
        await this.emailField.fill(email);
        await this.addEmailButton.click();
    }

}
