const { BasePage } = require("./basePage");
const { DataRoom } = require("./dataRoom");
const { Notes } = require("./notes");

exports.ExpertPage = class ExpertPage extends BasePage {

    constructor(page) {
        super(page, '/expert-dashboard');
        this.dataRoom = new DataRoom(page);
        this.notes = new Notes(page);
        this.orgSelector = page.locator('#root > div > div > div > div._wrapper_r9v1g_1 > div._container_1fifx_1 > div:nth-child(3) > div > div:nth-child(4) > div._iconsContainer_1fifx_121 > button');
        this.orgOption = page.getByText('test auto');
        this.firstCompany = page.locator('#root > div > div > div > div._wrapper_r9v1g_1 > div._contentTableBlock_r9v1g_4 > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div > div > div > p._text_cqwm6_1._label-3_cqwm6_24._greyscale900_cqwm6_97._label_cqwm6_14');
        this.secondCompany = page.locator('#root > div > div > div > div._wrapper_r9v1g_1 > div._contentTableBlock_r9v1g_4 > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div > p._text_cqwm6_1._label-3_cqwm6_24._greyscale900_cqwm6_97._label_cqwm6_14');
        this.secondCompany = page.locator('#root > div > div > div > div._wrapper_r9v1g_1 > div._contentTableBlock_r9v1g_4 > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div > div > div');
        this.dataRoomTab = page.getByText('Data room');
    }

    async changeOrganization(){
        await this.orgSelector.click();
        await this.orgOption.click();
    } 

    async openFirstCompany(){
        await this.firstCompany.click();
    }

    async openSecondCompany(){
        await this.secondCompany.click();
    }

    async openDataRoom(){
        await this.dataRoom.openDataRoom();
    }
    
    async renameFileName(newFileName){
        await this.dataRoom.renameFileName(newFileName);
    }

    async uploadFileToDataRoom(file) {
        await this.dataRoom.uploadFileToDataRoom(file);
    }

    async openNotes(){
        await this.notes.openNotes();
    }

    async addNewNote(note){
        await this.notes.addNewNote(note);
    }

    async deleteNote(){
        await this.notes.deleteNote();
    }
}