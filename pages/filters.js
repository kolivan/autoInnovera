import { Page } from "@playwright/test";

exports.Filter = class Filter {
    constructor(page) {
        this.pipelineFilterIcon = page.locator('#pipelinePage-filterIcon');
        this.discoverFilterButton = page.locator('#discoverPage-filterButton');
        this.basicFilterButton = page.getByRole('button', {name:'Basic'});
        this.advancedFilterButton = page.getByRole('button', {name:'Advanced'});
        this.locationInput = page.getByPlaceholder('Enter location');
        this.existingLocationOption = page.getByText('New York');
        this.filterByDescriptionInput = page.locator('#discoverPage-filtersV2-descriptionInput');
        this.preSeedStageOption = page.locator('//*[@id="root"]/div/div/div/div[1]/div[2]/div[1]/div/div/div[5]/div[2]/div[1]/div/div');
        this.clearAllFilterButton = page.locator('#discoverPage-filtersV2-clearAllButton');

    }

    async filterByLocation() {
        await this.locationInput.click();
        await this.existingLocationOption.click();
    }

    async filterByFinStage() {
        await this.preSeedStageOption.click();
    }

    async filterByDescription(description) {
        await this.filterByDescriptionInput.fill(description);
    }
    
    async openFilterOnDiscoverPage() {
        await this.discoverFilterButton.click();
    }

    async clearAllFilters() {
        await this.clearAllFilterButton.click();
    }
}