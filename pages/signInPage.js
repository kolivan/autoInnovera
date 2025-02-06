const { BasePage } = require("./basePage");
exports.SigninPage = class SigninPage extends BasePage {

    constructor(page) {
        super(page, '/sign-in');
        this.email = page.locator('div').filter({ hasText: /^Email$/ }).getByRole('textbox');
        this.password = page.locator('input[type="password"]');
        this.signInButton = page.getByRole('button', { name: 'Log In', exact: true });
    }

    async signIn(email,password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
    }

}
