import { Page } from "@playwright/test";

exports.Notes = class Notes {
    constructor(page) {
        this.page = page;
        this.notesTab = page.getByText('Notes');
        this.notesInput = page.getByPlaceholder('Write your thoughts');
        this.SaveNotesButton = page.getByRole('button', { name: 'Post' });
        this.contextMenuForNote = page.locator('#root > div > div > div > div._container_e1yoo_1 > div._contentContainer_e1yoo_64 > div._container_9qsbx_1 > div > div > div._card_18fi5_1 > div > div._content_18fi5_17 > div._infoSection_18fi5_51 > div > button');
        this.deleteNoteOption = page.getByText('Delete');
        this.deleteNoteConfirmation = page.getByRole('button', { name: 'Delete' });
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

}