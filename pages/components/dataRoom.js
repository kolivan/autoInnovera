import { Page } from "@playwright/test";

exports.DataRoom = class DataRoom {
    constructor(page) {
        this.page = page;
        this.dataRoomTab = page.getByText('Data room');
        this.dataRoomContextMenu = page.locator('#root > div > div > div > div._container_e1yoo_1 > div._contentContainer_e1yoo_64 > div._container_1y1ba_1 > div > div._tableContainer_1y1ba_27 > div._container_ejna4_1 > div:nth-child(1) > div._actionsLabelContainer_ejna4_26 > button');
        this.dataRoomContextMenuPortfolio = page.locator('#root > div > div > div > div._container_aqqfd_1 > div._contentContainer_aqqfd_62 > div._container_1y1ba_1 > div > div > div._tableContainer_1y1ba_27 > div._container_pm6t8_1 > div._row_pm6t8_17 > div._actionsLabelContainer_pm6t8_27 > button');
        this.dataRoomRenameFileInput = page.getByPlaceholder('Enter new filename');
        this.dataRoomSaveChangesButton = page.getByRole('button', { name: 'Save' });
        this.dataRoomRenameOption = page.getByText('Rename');
        this.fileInput = page.locator('input[type="file"]');
        this.dataRoomDeleteOption = page.getByText('Delete');
        this.deleteConfirmationButton = page.getByRole('button', { name: 'Delete' });

    }

    async openDataRoom(){
        await this.dataRoomTab.click();
    }
    
    async renameFileName(newFileName){
        await this.dataRoomContextMenu.click();
        await this.dataRoomRenameOption.click();
        await this.dataRoomRenameFileInput.fill(newFileName);
        await this.dataRoomSaveChangesButton.click();
    }

    async renameFileNamePortfolio(newFileName){
        await this.dataRoomContextMenuPortfolio.click();
        await this.dataRoomRenameOption.click();
        await this.dataRoomRenameFileInput.fill(newFileName);
        await this.dataRoomSaveChangesButton.click();
    }

    async uploadFileToDataRoom(file) {
        await this.fileInput.setInputFiles(file);
        await this.page.waitForTimeout(2000);
    }

    async deleteFile(){
        await this.dataRoomContextMenuPortfolio.click();
        await this.dataRoomDeleteOption.click();
        await this.deleteConfirmationButton.click();
    }


}