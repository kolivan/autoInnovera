const { BasePage } = require("./basePage");

exports.Tags = class Tags {
    constructor(page) {
        this.page = page;
        this.addTagButtonDiscover = page.locator('#discoverPage-tagButton');
        this.tagSaveButton = page.getByRole('button', { name: 'Save' });
        this.addTagField = page.getByPlaceholder('Add tags');
        this.existingTagOption = page.getByText('heartbeat');
        this.deleteTagIcon = page.locator('#root > div._Modal_1ypr0_3._isOpen_1ypr0_74 > div > div > div._modalContent_1ypr0_117 > div:nth-child(1) > div._tagList_i1usn_23 > div > svg');
        this.modifyTagsButton = page.getByRole('button', { name: 'Modify Tags' });
    }

    async addTagOnCompanyPage(tag) {
        await this.modifyTagsButton.click();
        await this.addTagField.fill(tag);
        await this.addTagField.press('Enter');
        await this.page.waitForTimeout(200);
        await this.tagSaveButton.click();
    }

    async addTag(tag){
        await this.addTagField.fill(tag);
        await this.addTagField.press('Enter');
        await this.page.waitForTimeout(200);
        await this.tagSaveButton.click();
    }

    async addExistingTag(){
        await this.addTagField.click();
        await this.existingTagOption.click();
        await this.page.waitForTimeout(200);
        await this.tagSaveButton.click();
    }

    async addExistingTagOnDiscoverPage() {
        await this.addTagButtonDiscover.click();
        await this.addTagField.click();
        await this.existingTagOption.click();
        await this.page.waitForTimeout(200);
        await this.tagSaveButton.click();
    }

    async addTagOnDiscoverPage(tag) {
        await this.addTagButtonDiscover.click();
        await this.addTagField.fill(tag);
        await this.addTagField.press('Enter');
        await this.page.waitForTimeout(200);
        await this.tagSaveButton.click();
    }

    async deleteTagOnCompanyPage() {
        await this.modifyTagsButton.click();
        await this.deleteTagIcon.click();
        await this.tagSaveButton.click();
    }

    async deleteTagOnDiscoverPage() {
        await this.addTagButtonDiscover.click();
        await this.deleteTagIcon.click();
        await this.tagSaveButton.click();
    }

    async deleteTag() {
        await this.deleteTagIcon.click();
        await this.tagSaveButton.click();
    }

} 