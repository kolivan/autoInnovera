const { BasePage } = require("./basePage");
const { Header } = require("./header");

let header;
exports.DiscoverPage = class DiscoverPage extends BasePage {

    constructor(page) {
        super(page, '/companies');
        header = new Header(page);
        this.firstCheckboxSelector = page.locator('._checkboxContainer_1qqcf_12 > ._checkboxContainer_uethg_1 > ._checkbox_uethg_1').first();
        this.secondCheckBoxSelector = page.locator('div:nth-child(2) > ._checkboxContainer_1qqcf_12 > ._checkboxContainer_uethg_1 > ._checkbox_uethg_1');
        this.addToPipelineButton = page.locator('#discoverPage-addToPipelineButton');
        this.addTagButton = page.locator('#discoverPage-tagButton');
        this.filterButton = page.locator('#discoverPage-filterButton');
        this.sortByNameButton = page.locator('#discoverPage-companyNameSort');
        this.sortByFoundingStage = page.locator('#discoverPage-financialStageSort');
        this.sortByTotalFundingButton = page.locator('#discoverPage-totalFundingSort');
        this.sortByFoundingYearButton = page.locator('#discoverPage-foundingDateSort');
        this.notification = page.locator("div.applicationSnackbar-message>p");
        this.addToPipelineMobalButton = page.locator('#discoverPage-addToPipelineModal-saveButton');
        this.goNextPaginationButton = page.locator('#discoverPage-pagination-goNextButton');
        this.goPrevPaginationButton = page.locator('#discoverPage-pagination-goPrevButton');
        this.paginationChangePageButton = page.locator('#discoverPage-pagination-changePageButton');
        this.filterButton = page.locator('#discoverPage-filterButton');
        this.addAndConditionButton = page.locator('#discoverPage-filtersV2-matchAll-addConditionButton');
        this.addOrConditionButton = page.locator('#discoverPage-filtersV2-matchAny-addConditionButton');
        this.clearAllFilterButton = page.locator('#discoverPage-filtersV2-clearAllButton');
        this.filterByDescriptionInput = page.locator('#discoverPage-filtersV2-descriptionInput');
        this.applyFilterButton = page.locator('#discoverPage-filtersV2-saveButton');
        this.numberOfCompanies = page.locator('#discoverPage-pagination-companiesPool');
    }

    async openDiscoverPageFromHeader(){
        await header.openDiscoverPageFromHeader();
    }

    async addCompanyToPipeline() {
        await this.firstCheckboxSelector.click();
        await this.addToPipelineButton.click();
        await this.addToPipelineMobalButton.click();
    }

    async sortByName() {
        await this.sortByNameButton.click();
    }

    async sortByFoundingYear() {
        await this.sortByFoundingYearButton.click();
    }

    async sortByFundingStage() {
        await this.sortByFoundingStage.click();
    }

    async sortByTotalFunding() {
        await this.sortByTotalFundingButton.click();
    }

    async clickGoNextPaginationButton() {
        await this.goNextPaginationButton.click();
    }

    async clickGoPrevPaginationButton() {
        await this.goPrevPaginationButton.click();
    }

    async openFilter(){
        await this.filterButton.click();
    }

    async filterByDescription(description){
        await this.filterByDescriptionInput.fill(description);
        await this.applyFilterButton.click();
    }
}