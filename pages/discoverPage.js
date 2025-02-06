const { BasePage } = require("./basePage");
const { Header } = require("./header");
exports.DiscoverPage = class DiscoverPage extends BasePage {

    constructor(page) {
        super(page, '/companies');
        this.firstCheckboxSelector = page.locator('._checkboxContainer_36n1u_12 > ._checkboxContainer_lzfwt_1 > ._checkbox_lzfwt_1').first();
        this.addToPipelineButton = page.getByRole('button', { name: 'Add to Pipeline' });
        this.notification = page.locator("div.applicationSnackbar-message>p");
    }

    async addCompanyToPipeline() {
        await this.firstCheckboxSelector.click();
        await this.addToPipelineButton.click();
    }

    
}