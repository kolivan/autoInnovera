const { BasePage } = require("./basePage");
const { Header } = require("./header");
const { Tags } = require("./tags");

let header;

exports.PipelinePage = class PipelinePage extends BasePage {

    constructor(page) {
        super(page, '/dashboard');
        this.header = new Header(page);
        this.tags = new Tags(page);
        this.pipelineSelector = page.locator('//*[@id="pipelinePage-pipelineDropdown"]/button');
        this.addPipeline = page.getByRole('button', { name: 'Add Pipeline' });
        this.pipelineNameInput = page.getByPlaceholder('Pipeline name');
        this.addPipelineButton = page.getByRole('button', { name: 'Add Pipeline' }).nth(1);
        this.addStageButton = page.locator('#pipelinePage-addStageButton');
        this.stageName = page.getByPlaceholder('Name');
        this.placeAfterStageDropDown = page.locator('#root > div._Modal_1ypr0_3._isOpen_1ypr0_74 > div > div > div._modalContent_1ypr0_117 > div:nth-child(1) > div._placeAfterContainer_1v0h6_15 > div > div._inputContainer_1122h_6 > div > svg')
        this.inboxStageInDropDown = page.getByText('Inbox').nth(1);
        this.addStageButtonOnModal = page.getByRole('button', { name: 'Add stage' }).nth(1);
        this.addCompanyButton = page.locator('#pipelinePage-addCompaniesOrangeButton');
        this.addCompanyConfirmationButton = page.locator('#addCompaniesModal-confirmButton');
        this.fileUploadButton = page.locator('label[for="file-upload"]');
        this.newStageNameInput = page.getByPlaceholder('Name');  
        this.docSendLinkButton = page.getByRole('button', { name: '🔗 DocSend Link' });
        this.docSendLinkInput = page.getByPlaceholder('Paste DocSend URL here');
        this.addDocSendButton = page.locator('//*[@id="root"]/div[3]/div/div/div[2]/div/div[2]/button[1]');
        this.archiveIcon = page.locator('#pipelinePage-archiveButton');
        this.stageMenuButton = page.locator('#pipelinePage-columnContextMenuButton').nth(1);
        this.renameStageButton = page.locator('//*[@id="columnsWrapperId"]/div[2]/div[2]/div[1]/div/div');
        this.deleteStage = page.getByText('Delete');
        this.stageNameInput = page.getByPlaceholder('Provide a new name for stage');
        this.saveStageNameButton = page.getByRole('button', { name: 'Save' });
        this.firstCompanyCard = page.locator('//*[@id="cardsContainer-0"]/div/div/div[1]');
        this.uploadContainer = page.locator('//*[@id="columnsWrapperId"]/div[8]');
        this.closeAddCompaniesPopUpIcon = page.locator('addCompaniesModal-closeButton');
        this.contextCardMenuButton = page.locator('#pipelinePage-companyContextMenuButton').nth(0);
        this.contextMenuArchive = page.locator('#pipelinePage-companyContextMenuOptionArchive');
        this.contextMenuRemovebutton = page.locator('#pipelinePage-companyContextMenuOptionRemove');
        this.contextMenuAddTag = page.locator('#pipelinePage-companyContextMenuOptionTag');
        this.archiveModalButton = page.getByRole('button', { name: 'Archive' }); 
        this.removeModalButton = page.getByRole('button', { name: 'Remove' }); 
        this.archivedCompanyContextMenu = page.locator('#root > div > div > div > div._headerContainer_jkr2v_6 > div._pageContainer_jkr2v_48 > div._contentContainer_jkr2v_58 > div._content_jkr2v_1 > div > div:nth-child(2) > div > div:nth-child(9) > div > button');
        this.unarchiveButton = page.getByText('Unarchive');
        this.pipelineFortesting = page.getByRole('button', { name: 'Pipeline for testing' });
    }


    async clickAddCompanyButton() {
        await this.addCompanyButton.click();
    }

    async openPipelinePageFromHeader(){
        await this.header.openDiscoverPageFromHeader();
        await this.header.openPipelinePageFromHeader();
    }

    async addNewPipeline(pipelineName) {
        await this.pipelineSelector.click();
        await this.addPipeline.click();
        await this.pipelineNameInput.fill(pipelineName);
        await this.addPipelineButton.click();
    }

    async openPipelineForTesting(){
        await this.pipelineSelector.click();
        await this.pipelineFortesting.click();
    }

    async addCompanyByDockSendLink(link) {
        await this.addCompanyButton.click();
        await this.docSendLinkButton.click();
        await this.docSendLinkInput.fill(link);
        await this.addDocSendButton.click();
        await this.addCompanyConfirmationButton.click();
    }

    async addCompanyByUploadingPitchDeck(file) {
        await this.addCompanyButton.click();
        await this.fileUploadButton.setInputFiles(file);
        await this.page.waitForTimeout(2000);
        await this.addCompanyConfirmationButton.click();
    }

    async addNewStage(stageName) {
        await this.addStageButton.click();
        await this.page.waitForTimeout(200);
        await this.stageName.fill(stageName);
        //await this.placeAfterStageDropDown.click();
        await this.placeAfterStageDropDown.click();
        await this.inboxStageInDropDown.click();
        await this.addStageButtonOnModal.click();
    }

    async openArchivePage(){
        await this.archiveIcon.click();
    }

    async renameStage(newStageName){
        await this.stageMenuButton.click();
        await this.renameStageButton.click();
        await this.stageNameInput.fill(newStageName);
        await this.saveStageNameButton.click();
    }

    async openCompanyProfilepage(){
        await this.firstCompanyCard.click();
    }

    async archiveCompany(){
        await this.contextCardMenuButton.click();
        await this.contextMenuArchive.click();
        await this.archiveModalButton.click();
    }

    async unarchiveCompany(){
        await this.archivedCompanyContextMenu.click();
        await this.unarchiveButton.click();      
    }

    async removeCompany(){
        await this.contextCardMenuButton.click();
        await this.contextMenuRemovebutton.click();
        await this.removeModalButton.click();
    }

    async addTagToCompany(tag){
        await this.contextCardMenuButton.click();
        await this.contextMenuAddTag.click();
        await this.tags.addTag(tag);
    }

    async deleteTagFromCompany(){
        await this.contextCardMenuButton.click();
        await this.contextMenuAddTag.click();
        await this.tags.deleteTag();
    }
}
