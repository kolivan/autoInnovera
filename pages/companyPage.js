const { BasePage } = require("./basePage");
const { Header } = require("./header");
const { DataRoom } = require("./dataRoom");
const { Notes } = require("./notes");
const { Tags } = require("./tags");


exports.CompanyPage = class CompanyPage extends BasePage {

    constructor(page) {
        super(page, '/company-profile/4192203');
        this.header = new Header(page);
        this.dataRoom = new DataRoom(page);
        this.notes = new Notes(page);
        this.tags = new Tags(page);
        this.companyName = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[1]/p');
        this.addToPipelineButton = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/button');
        this.addCompanyToPipelineModalButton = page.locator('#addToPipelineModal-saveButton');
        this.modifyTagsButton = page.getByRole('button', { name: 'Modify Tags' });
        this.overviewSection = page.locator('div').filter({ hasText: /^Overview$/ }).getByRole('paragraph');
        this.financingSection = page.locator('div').filter({ hasText: /^Financing$/ }).getByRole('paragraph');
        this.teamSection = page.locator('div').filter({ hasText: /^Team$/ }).getByRole('paragraph');
        this.marketSection = page.locator('div').filter({ hasText: /^Market$/ }).getByRole('paragraph');
        this.productAndServicesSection = page.locator('div').filter({ hasText: /^Product & Services$/ }).getByRole('paragraph');
        this.similarCompaniesSection = page.locator('div').filter({ hasText: /^Similar Companies$/ }).getByRole('paragraph');
        this.marketAndFiguresSection = page.getByText('Market Facts and Figures');
        this.similarCompaniesShowMoreButton = page.getByRole('button', { name: 'Show more' }).nth(2);
        this.dataRoomTab = page.getByText('Data Room');
        this.noteTab = page.getByText('Notes');
        this.profileTab = page.getByText('Profile');
        this.tagSaveButton = page.getByRole('button', { name: 'Save' });
        this.addTagField = page.getByPlaceholder('Add tags');
        this.viewMarketSourceReportButton = page.getByText('View Source');
        this.deleteTagIcon = page.locator('#root > div._Modal_1ypr0_3._isOpen_1ypr0_74 > div > div > div._modalContent_1ypr0_117 > div:nth-child(1) > div._tagList_i1usn_23 > div > svg');
        this.linkedinIcon = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[2]/div[2]/a');
        this.linkedinIconOnCompanyPage = page.locator('#root > div > div > div > div._container_aqqfd_1 > div._headerContainer_aqqfd_11 > div._headerContent_aqqfd_37 > div._container_ylja1_15 > div._block_ylja1_28 > div._upperContent_ylja1_59 > div._infoContainer_ylja1_103 > div._titleContainer_ylja1_103 > div._info_ylja1_103 > div._iconsContainer_ylja1_381 > a._linkedinIconContainer_ylja1_399');
        this.websiteLink = page.locator('//*[@id="root"]/div/div/div/div[1]/div/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[1]/div[2]/div[1]/button');
        this.websiteLinkPipeline= page.locator('#root > div > div > div > div._container_aqqfd_1 > div._headerContainer_aqqfd_11 > div._headerContent_aqqfd_37 > div._container_ylja1_15 > div._block_ylja1_28 > div._upperContent_ylja1_59 > div._infoContainer_ylja1_103 > div._titleContainer_ylja1_103 > div._info_ylja1_103 > div._websiteContainerBlock_ylja1_469 > button');
    }

    async openLinkedIn(){
        await this.linkedinIcon.click();
    }

    async openWebsite(){
        await this.websiteLink.click();
    }

    async addTag(tag){
        await this.tags.addTagOnCompanyPage(tag);
    }

    async deleteTag(){
        await this.tags.deleteTagOnCompanyPage();
    }

    async clickShowMoreButtonOnSimilarcompanies(){
        await this.similarCompaniesShowMoreButton.click();
    }

    async addCompanyToThePipeline(){
        await this.addToPipelineButton.click();
        await this.addCompanyToPipelineModalButton.click();
    }

    async openDataRoom(){
        await this.dataRoomTab.click();
    }

    async openNotes(){
        await this.noteTab.click();
    }   

    async uploadFileToDataRoom(file){
        await this.dataRoom.uploadFileToDataRoom(file);
    }

    async editNote(note){
        await this.notes.editNote(note);
    }

    async deletePrivateNote(){
        await this.notes.deletePrivateNote();
    }

    async editPrivateNote(note){
        await this.notes.editPrivateNote(note);
    }
    
    async renameFileName(newFileName){
        await this.dataRoom.renameFileName(newFileName);
    }

    async addNewNote(note){
        await this.notes.addNewNote(note);
    }

    async openMarketSourceReport(){
        await this.viewMarketSourceReportButton.click();
    }
    
    async renameFileNamePortfolio(newFileName){
        await this.dataRoom.renameFileNamePortfolio(newFileName);
    }

    async clickLinkedInIconOnCompanyPage(){
        await this.linkedinIconOnCompanyPage.click();
    }   

    async clickWebsiteLinkOnCompanyPage(){
        await this.websiteLinkPipeline.click();
    }

    async addExistingTag(){
        await this.modifyTagsButton.click();
        await this.tags.addExistingTag();
    }
}