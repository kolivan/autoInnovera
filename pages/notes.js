import { Page } from "@playwright/test";

exports.Notes = class Notes {
    constructor(page) {
        this.page = page;
        this.notesTab = page.getByText('Notes');
        this.notesInput = page.getByPlaceholder('Write your thoughts');
        this.SaveNotesButton = page.getByRole('button', { name: 'Post' });
        this.contextMenuForPrivateNote = page.locator('#root > div > div > div > div._container_aqqfd_1 > div._contentContainer_aqqfd_62 > div._container_9qsbx_1 > div > div > div._card_18fi5_1 > div > div._content_18fi5_17 > div._infoSection_18fi5_51 > div > button')
        this.contextMenuForNote = page.locator('#root > div > div > div > div._container_e1yoo_1 > div._contentContainer_e1yoo_64 > div._container_9qsbx_1 > div > div > div._card_18fi5_1 > div > div._content_18fi5_17 > div._infoSection_18fi5_51 > div > button');
        this.deleteNoteOption = page.getByText('Delete');
        this.deleteNoteConfirmation = page.getByRole('button', { name: 'Delete' });
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.editNoteTextField = page.locator('#root > div > div > div > div._container_e1yoo_1 > div._contentContainer_e1yoo_64 > div._container_9qsbx_1 > div > div > div._card_18fi5_1 > div > div._content_1k6v1_16 > form > div._container_1nplw_1 > textarea');
        this.saveEditedNoteButton = page.getByRole('button', { name: 'Post' }).nth(1);
    }

    async openNotes(){
        await this.notesTab.click();
    }
    
    async addNewNote(note){
        await this.notesInput.fill(note);
        await this.SaveNotesButton.click();
    }

    async deleteNote(){
        await this.contextMenuForNote.click();
        await this.deleteNoteOption.click();
        await this.deleteNoteConfirmation.click();
    }

    async editNote(note){
        await this.contextMenuForNote.click();
        await this.editButton.click();
        await this.editNoteTextField.fill(note);
        await this.saveEditedNoteButton.click();
    }

    async deletePrivateNote(){
        await this.contextMenuForPrivateNote.click();
        await this.deleteNoteOption.click();
        await this.deleteNoteConfirmation.click();
    }       

    async editPrivateNote(note){
        await this.contextMenuForPrivateNote.click();
        await this.editButton.click();
        await this.editNoteTextField.fill(note);
        await this.saveEditedNoteButton.click();
    }   

}