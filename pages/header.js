import { Page } from "@playwright/test";

exports.Header = class Header {
    constructor(page) {
        this.discoverTab = page.getByText('Discover');
        this.pipelineTab = page.getByText('Pipeline');
        this.portfolioTab = page.getByText('Portfolio');
    }

    async openDiscoverPageFromHeader() {
        await this.discoverTab.click();
    }

    async openPipelinePageFromHeader() {
        await this.pipelineTab.click();
    }

    async openPortfolioPageFromHeader() {
        await this.portfolioTab.click();
    }

}