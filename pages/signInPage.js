const { BasePage } = require("./basePage");
exports.SigninPage = class SigninPage extends BasePage {

    constructor(page) {
        super(page, '/sign-in');
        this.email = page.locator('div').filter({ hasText: /^Email$/ }).getByRole('textbox');
        this.password = page.locator('input[type="password"]');
        this.signInButton = page.getByRole('button', { name: 'Log In', exact: true });
        this.forgotPasswordButton = page.getByRole('button', { name: 'Forgot Password?', exact: true });
        this.emailForRestorePwd = page.locator('//*[@id="root"]/div/div/div/div[1]/div/form/div/div[2]/div/input');
        this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password', exact: true });
        this.newPasswordField = page.locator('//*[@id="root"]/div/div/div/form/div/div[1]/input');
        this.confirmPasswordField = page.locator('//*[@id="root"]/div/div/div/form/div/div[2]/input');
        this.resetPasswordSubmitButton = page.getByRole('button', { name: 'Submit', exact: true });
    }

    async signIn(email,password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async openForgotPasswordPage() {
        await this.forgotPasswordButton.click();
    }

    async requestResetPasswordLink(email){
        await this.emailForRestorePwd.fill(email);
        await this.resetPasswordButton.click();
    }

    async restorePassword(newPassword, confirmPassword){
        await this.newPasswordField.fill(newPassword);
        await this.confirmPasswordField.fill(confirmPassword);
        await this.resetPasswordSubmitButton.click();
    }

}
