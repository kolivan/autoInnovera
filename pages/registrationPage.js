const { BasePage } = require("./basePage");
const {request} = require('@playwright/test');
const { RegistrationAPI } = require('../utils/api-helpers/registrationAPI');

let registrationAPI;

exports.RegistrationPage = class RegistrationPage extends BasePage {

   // constructor(page) {
        //this.email = page.locator('div').filter({ hasText: /^Email$/ }).getByRole('textbox');
        //this.password = page.locator('input[type="password"]');
        //this.signInButton = page.getByRole('button', { name: 'Log In', exact: true });
   // }

    async openOrgRegistrationPage(){
        registrationAPI = new RegistrationAPI(request);
        let regURL = await registrationAPI.getRegistrationToken('hanna+76546554@innovera.ai'); 
        await this.page.goto(regURL);
    }

    async registerNewOrganization(firstName, lastName, orgName, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
    }

}
