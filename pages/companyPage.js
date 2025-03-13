const { BasePage } = require("./basePage");
const { Header } = require("./header");

let header;
exports.CompanyPage = class CompanyPage extends BasePage {

    constructor(page) {
        super(page, '/company-profile/4192203');
        header = new Header(page);
        this.companyName = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[1]/p');
        this.addToPipelineButton = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/button');
        this.modifyTagsButton = page.getByRole('button', { name: 'Modify Tags' });
        this.overviewSection = page.locator('div').filter({ hasText: /^Overview$/ }).getByRole('paragraph');
        this.financingSection = page.locator('div').filter({ hasText: /^Financing$/ }).getByRole('paragraph');
        this.teamSection = page.locator('div').filter({ hasText: /^Team$/ }).getByRole('paragraph');
        this.marketSection = page.locator('div').filter({ hasText: /^Market$/ }).getByRole('paragraph');
        this.productAndServicesSection = page.locator('div').filter({ hasText: /^Product & Services$/ }).getByRole('paragraph');
        this.similarCompaniesSection = page.locator('div').filter({ hasText: /^Similar Companies$/ }).getByRole('paragraph');
        this.marketAndFiguresSection = page.getByText('Market Facts and Figures');
        this.similarCompaniesShowMoreButton = page.getByRole('button', { name: 'Show more' });
        this.dataRoomTab = page.getByText('Data Room');
        this.noteTab = page.getByText('Notes');
        this.profileTab = page.getByText('Profile');
        this.tagSaveButton = page.getByRole('button', { name: 'Save' });
        this.addTagField = page.getByPlaceholder('Add tags');
        this.deleteTagIcon = page.locator('#root > div._Modal_1ypr0_3._isOpen_1ypr0_74 > div > div > div._modalContent_1ypr0_117 > div:nth-child(1) > div._tagList_i1usn_23 > div > svg');
        this.linkedinIcon = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[2]/div[2]/a');
        this.websiteLink = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[2]/div[1]/button');
    }

    async openDataRoom(){
        await this.dataRoomTab.click();
    }

    async openNotes(){
        await this.noteTab.click();
    }

    async openLinkedIn(){
        await this.linkedinIcon.click();
    }

    async openWebsite(){
        await this.websiteLink.click();
    }

    async addTag(tag){
        await this.modifyTagsButton.click();
        await this.addTagField.click();
        await this.addTagField.fill(tag);
        await this.addTagField.press('Enter');
        await this.page.waitForTimeout(200);
        await this.tagSaveButton.click();
    }

    async deleteTag(){
        await this.modifyTagsButton.click();
        await this.deleteTagIcon.click();
        await this.tagSaveButton.click();
    }

    async clickShowMoreButtonOnSimilarcompanies(){
        await this.similarCompaniesShowMoreButton.click();
    }

    async addCompanyToThePipeline(){
        await this.addToPipelineButton.click();
    }
}