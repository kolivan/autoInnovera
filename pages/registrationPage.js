const { BasePage } = require("./basePage");
const {request} = require('@playwright/test');
const { RegistrationAPI } = require('../utils/api-helpers/registrationAPI');

let registrationAPI;

exports.RegistrationPage = class RegistrationPage extends BasePage {

    constructor(page) {
        super(page);
        this.firstName = page.locator('div').filter({ hasText: /^First Name$/ }).getByRole('textbox');
        this.lasttName = page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox')
        this.orgName = page.locator('div').filter({ hasText: /^Organization Name$/ }).getByRole('textbox');
        this.password = page.locator('input[type="password"]');
        this.submitButton = page.getByRole('button', { name: 'Sign Up' });
        this.TCLink = page.locator('#signUpPage-TCLink');
        this.privacyPolicyLink = page.locator('#signUpPage-PrivacyPolicyLink');
        
    }

    async openOrgRegistrationPage(){
        registrationAPI = new RegistrationAPI(request);
        const timestamp = Date.now();
        let regURL = await registrationAPI.getRegistrationToken(`hanna+${timestamp}@innovera.ai`); 
        await this.page.goto(regURL);
    }

    async openRegistrationPage(link){
        return this.page.goto(link);
    }

    async registerNewOrganization(firstName, lastName, orgName, password) {
        await this.firstName.fill(firstName);
        await this.lasttName.fill(lastName);
        await this.orgName.fill(orgName);
        await this.password.fill(password);
        await this.submitButton.click();
    }

    async registerNewInvestorOrExpert(firstName, lastName, password) {
        await this.firstName.fill(firstName);
        await this.lasttName.fill(lastName);
        await this.password.fill(password);
        await this.submitButton.click();
    }

    async openTCPage() {
        await this.TCLink.click();
    }

    async openPrivacyPolicyPage() {
        await this.privacyPolicyLink.click();
    }
}
