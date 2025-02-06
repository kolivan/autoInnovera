const { BasePage } = require("./basePage");
const { Header } = require("./header");
exports.PipelinePage = class PipelinePage extends BasePage {

    constructor(page) {
        super(page, '/dashboard');
        this.pipelineSelector = page.locator('#pipelineDropdown > button').nth(0);
        this.addPipeline = page.getByRole('button', { name: 'Add Pipeline' });
        this.pipelineNameInput = page.getByPlaceholder('Pipeline name');
        this.addPipelineButton = page.getByRole('button', { name: 'Add Pipeline' }).nth(1);
        this.addStageButton = page.locator('#pipelinePage-addStageButton');
        this.newStageNameInput = page.getByPlaceholder('Name');
        this.stagesDropDown = page.getByPlaceholder('Select Stage');
        
    }


    async addNewPipeline(pipelineName) {
        await this.pipelineSelector.click();
        await this.addPipeline.click();
        await this.pipelineNameInput.fill(pipelineName);
        await this.addPipelineButton.click();
    }
  
}