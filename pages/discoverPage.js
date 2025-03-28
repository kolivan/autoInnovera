const { BasePage } = require("./basePage");
const { Header } = require("./header");
const { Tags } = require("./tags");
const { Filter } = require("./filters");

let header;
exports.DiscoverPage = class DiscoverPage extends BasePage {

    constructor(page) {
        super(page, '/companies');
        header = new Header(page);
        this.tags = new Tags(page);
        this.filter = new Filter(page);
        this.firstCheckboxSelector = page.locator('.discoverPage-companyCheckbox').first();
        this.secondCheckBoxSelector = page.locator('.discoverPage-companyCheckbox').nth(1);
        this.thirdCheckBoxSelector = page.locator('.discoverPage-companyCheckbox').nth(2);
        this.fourthCheckBoxSelector = page.locator('.discoverPage-companyCheckbox').nth(3);
        this.addToPipelineButton = page.locator('#discoverPage-addToPipelineButton');
        this.addTagButton = page.locator('#discoverPage-tagButton');
        this.sortByNameButton = page.locator('#discoverPage-companyNameSort');
        this.sortByFoundingStage = page.locator('#discoverPage-financialStageSort');
        this.sortByTotalFundingButton = page.locator('#discoverPage-totalFundingSort');
        this.sortByFoundingYearButton = page.locator('#discoverPage-foundingDateSort');
        this.notification = page.locator("div.applicationSnackbar-message>p");
        this.addToPipelineMobalButton = page.locator('#discoverPage-addToPipelineModal-saveButton');
        this.goNextPaginationButton = page.locator('#discoverPage-pagination-goNextButton');
        this.goPrevPaginationButton = page.locator('#discoverPage-pagination-goPrevButton');
        this.paginationChangePageButton = page.locator('#discoverPage-pagination-changePageButton');
        this.addAndConditionButton = page.locator('#discoverPage-filtersV2-matchAll-addConditionButton');
        this.addOrConditionButton = page.locator('#discoverPage-filtersV2-matchAny-addConditionButton');
        this.numberOfCompanies = page.locator('#discoverPage-pagination-companiesPool');
        this.addTagButton = page.locator('#discoverPage-tagButton');
        this.tagSaveButton = page.getByRole('button', { name: 'Save' });
        this.addTagField = page.getByPlaceholder('Add tags');
        this.existingTagOption = page.getByText('heartbeat');
        this.deleteTagIcon = page.locator('#root > div._Modal_1ypr0_3._isOpen_1ypr0_74 > div > div > div._modalContent_1ypr0_117 > div:nth-child(1) > div._tagList_i1usn_23 > div > svg');
    }

    async openDiscoverPageFromHeader(){
        await header.openDiscoverPageFromHeader();
    }

    async addCompanyToPipeline() {
        await this.firstCheckboxSelector.click();
        await this.addToPipelineButton.click();
        await this.addToPipelineMobalButton.click();
    }

    async addTwoCompaniesToPipeline(){
        await this.secondCheckBoxSelector.click();
        await this.thirdCheckBoxSelector.click();
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
        await this.filter.openFilterOnDiscoverPage();
    }

    async selectTwoCompanies(){
        await this.firstCheckboxSelector.click();
        await this.secondCheckBoxSelector.click();
    }

    async filterByDescription(description){
        await this.filter.filterByDescription(description);
    }

    async addTag(tag){
        await this.firstCheckboxSelector.click();
        await this.tags.addTagOnDiscoverPage(tag);
    }

    async addExistingTag(){
        await this.secondCheckBoxSelector.click();
        await this.tags.addExistingTagOnDiscoverPage();
    }

    async deleteTag(){
        await this.firstCheckboxSelector.click();
        await this.tags.deleteTagOnDiscoverPage();
    }

    async filterByLocation(location){
        await this.filter.filterByLocation(location);
    }

    async filterByFinStage(){
        await this.filter.filterByFinStage();
    }
}