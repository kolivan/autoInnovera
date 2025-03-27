const { BasePage } = require("./basePage");
const {request} = require('@playwright/test');
const { Header } = require('./header');

let header;

exports.ExpertsPage = class ExpertsPage extends BasePage {

    constructor(page) {
        super(page, '/settings?section=Experts');
        header = new Header(page);
        this.expertsTab = page.getByText('Experts');
        this.addExpertButton = page.getByRole('button', { name: 'Add Expert' });
        this.emailField = page.getByPlaceholder('Enter email');
        this.sendInvite = page.getByRole('button', { name: 'Send invite' });
    }

    async openUsersPageFromHeader(){
        await header.openSettingsPage();
        await this.expertsTab.click();
    }

    async addExpert(email) {
        await this.addExpertButton.click();
        await this.emailField.fill(email);
        await this.sendInvite.click();
    }

}
