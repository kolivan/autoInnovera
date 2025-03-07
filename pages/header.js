import { Page } from "@playwright/test";

exports.Header = class Header {
    constructor(page) {
        this.discoverTab = page.locator('#innoveraHeader-investor-discoverButton');
        this.pipelineTab = page.locator('#innoveraHeader-investor-pipelineButton');
        this.settingIcon = page.locator('#innoveraHeader-settingsMenuButton');
        this.profileIcon = page.locator('#innoveraHeader-avatar');
        this.logoutButton = page.locator('#innoveraHeader-logoutButton');
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

    async openSettingsPage() {
        await this.settingIcon.click();
    }

    async logoutFromApp() {
        await this.profileIcon.click();
        await this.logoutButton.click();
    }
}