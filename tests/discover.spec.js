const { test, expect } = require('@playwright/test');
const { DiscoverPage } = require('../pages/discoverPage');
const { SigninPage } = require('../pages/signInPage');
const { generatedUserData } = require('../test-data/userData');

let signinPage;
let discoverPage;
const userData = generatedUserData();

test.describe('Discover Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        signinPage = new SigninPage(page);
        await signinPage.open();
        await signinPage.signIn(process.env.INVESTOR_USER, process.env.PASSWORD);
        await page.waitForLoadState('networkidle');
        await page.waitForURL(/.*\/dashboard.*/);
        discoverPage = new DiscoverPage(page);
    });

    test.describe('Navigation', () => {
        test('C65: Open companies page from header', async ({ page }) => {
            await discoverPage.openDiscoverPageFromHeader();
            await expect(page).toHaveURL(/.*\/companies.*/);
        });

        test('C67: Check pagination', async ({ page }) => {
            await discoverPage.open();
            await discoverPage.firstCheckboxSelector.waitFor();
            await discoverPage.clickGoNextPaginationButton();
            await discoverPage.firstCheckboxSelector.waitFor();
            await expect(discoverPage.goPrevPaginationButton).toBeVisible();
            await expect(discoverPage.paginationChangePageButton).toContainText('2');
        });
    });

    test.describe('Company Selection', () => {
        test.beforeEach(async ({ page }) => {
            await discoverPage.open();
            await discoverPage.firstCheckboxSelector.waitFor();
        });

        test('C76: Select one company', async ({ page }) => {
            await discoverPage.firstCheckboxSelector.click();
            await expect(discoverPage.addToPipelineButton).toBeEnabled();
            await expect(discoverPage.addTagButton).toBeEnabled();
        });

        test('C77: Select several companies', async ({ page }) => {
            await discoverPage.firstCheckboxSelector.click();
            await discoverPage.secondCheckBoxSelector.click();
            await expect(discoverPage.addToPipelineButton).toBeEnabled();
            await expect(discoverPage.addTagButton).toBeDisabled();
        });
    });

    test.describe('Pipeline Management', () => {
        test.beforeEach(async ({ page }) => {
            await discoverPage.open();
            await page.waitForLoadState('networkidle');
        });

        test('C78: Add company to pipeline', async ({ page }) => {
            await discoverPage.addCompanyToPipeline();
            await expect(discoverPage.notification).toContainText("1 records added successfully to the pipeline, and 0 are already in the pipeline.");
        });

        test('C80: Add company which already in pipeline to pipeline', async ({ page }) => {
            await discoverPage.addCompanyToPipeline();
            await expect(discoverPage.notification).toContainText("0 records added successfully to the pipeline, and 1 are already in the pipeline.");
        });

        test('C79: Add 2 companies to to pipeline', async ({ page }) => {
            await discoverPage.addTwoCompaniesToPipeline();
            await expect(discoverPage.notification).toContainText("2 records added successfully to the pipeline, and 0 are already in the pipeline.");
        });
    });

    test.describe('Sorting', () => {
        test.beforeEach(async ({ page }) => {
            await discoverPage.open();
            await discoverPage.firstCheckboxSelector.waitFor();
        });

        test('C324: Sort companies by name', async ({ page }) => {
            await discoverPage.sortByName();
            await discoverPage.firstCheckboxSelector.waitFor();
            await expect(page.getByText('* Bank & Trust Company')).toBeVisible();
        });

        test('C270: Sort companies by founding year ask', async ({ page }) => {
            // click again for ascending
            await discoverPage.sortByFoundingYear();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(500);
            
            // get years again
            const yearElementsAsc = page.locator('.discoverPage-foundingDateCell');
            const yearsAsc = await yearElementsAsc.allTextContents();
            const numericYearsAsc = yearsAsc
                .map(year => parseInt(year.trim()))
                .filter(year => !isNaN(year));
            // check ascending order (second click)
            const isAscending = numericYearsAsc.every((year, i) => 
                i === 0 || year >= numericYearsAsc[i - 1]
            );
            expect(isAscending).toBe(true);
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 250+');
        });

        test('C528: Sort companies by founding year desc', async ({ page }) => {
            await discoverPage.sortByFoundingYear();
            await discoverPage.sortByFoundingYear();
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(500);
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 250+');
            const yearElementsDesc = page.locator('.discoverPage-foundingDateCell');
            const yearsDesc = await yearElementsDesc.allTextContents();
            const numericYearsDesc = yearsDesc
                .map(year => parseInt(year.trim()))
                .filter(year => !isNaN(year));
            const isDescending = numericYearsDesc.every((year, i) => 
                i === 0 || year <= numericYearsDesc[i - 1]
            );
            expect(isDescending).toBe(true);
        });

        test('C271: Sort companies by financial stage', async ({ page }) => {
            await discoverPage.sortByFundingStage();
            await discoverPage.firstCheckboxSelector.waitFor();
        });

        test('C272: Sort companies by total funding', async ({ page }) => {
            await discoverPage.sortByTotalFunding();
            await discoverPage.firstCheckboxSelector.waitFor();
        });
    });

    test.describe('Filtering', () => {
        test.beforeEach(async ({ page }) => {
            await discoverPage.open();
            await page.waitForLoadState('networkidle');
        });

        test.only('C291: Open Filter with Empty state', async ({ page }) => {
            await discoverPage.openFilter();
            await expect(discoverPage.filter.clearAllFilterButton).toBeVisible();
        });

        test('C71: Filter by name', async ({ page }) => {
            await discoverPage.openFilter();
            await discoverPage.filterByDescription('Tesla');
            await discoverPage.numberOfCompanies.waitFor();
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 118');
        });

        test('C326: Filter by description', async ({ page }) => {
            await discoverPage.openFilter();
            await discoverPage.filterByDescription('analog semiconductors, III-V products, wireless communications');
            await discoverPage.numberOfCompanies.waitFor();
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 197');
        });

        test('C68: Search existing company', async ({ page }) => {
            await discoverPage.openFilter();
            await discoverPage.filterByDescription('Uber');
            await discoverPage.numberOfCompanies.waitFor();
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 61');
        });

        test('C69: Search not-existing company', async ({ page }) => {
            await discoverPage.openFilter();
            await discoverPage.filterByDescription('lokshourfhf');
            await expect(page.locator('#root > div > div > div > div._wrapper_y03sf_1 > div._container_y03sf_6 > div._content_y03sf_35 > div._contentTableBlockInvestor_y03sf_72 > div._emptyPageContainer_1qqcf_37 > p')).toContainText('No matching companies found');
        });

        test('C355: Filter by location', async ({ page }) => {
            await discoverPage.open();
            await discoverPage.filterByLocation();
            await page.waitForLoadState('networkidle');
            
            // get all location elements
            const locationElements = page.locator('div._location_17hvr_1 p');
            const locations = await locationElements.allTextContents();
            
            // verify we have results
            expect(locations.length).toBeGreaterThan(0);
            
            // verify all locations are New York
            locations.forEach(location => {
                expect(location.trim()).toBe('New York,');
            });
            
            // verify total count as a sanity check
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 250+');
        });

        test('C356: Filter by financial stage', async ({ page }) => {
            await discoverPage.open();
            await discoverPage.filterByFinStage();
            await page.waitForLoadState('networkidle');

            // get all fin stage elements
            const finStageElements = page.locator('.discoverPage-financialStageCell');
            const finStages = await finStageElements.allTextContents();
            
            // verify we have results
            expect(finStages.length).toBeGreaterThan(0);
            
            // verify all locations are New York
            finStages.forEach(finStage => {
                expect(finStage.trim()).toBe('Pre-Seed');
            });
            await expect(discoverPage.numberOfCompanies).toContainText('1-50 of 250+');
            
        });

        test('C357: Filter by financial stage and description', async ({ page }) => {
            await discoverPage.open();
            await discoverPage.filterByFinStage();
            await page.waitForLoadState('networkidle');
            await discoverPage.filterByDescription('Fintech solutions for small business');
            await page.waitForLoadState('networkidle');
            // get all fin stage elements
            const finStageElements = page.locator('.discoverPage-financialStageCell');
            const finStages = await finStageElements.allTextContents();
            
            // verify we have results
            expect(finStages.length).toBeGreaterThan(0);
            
            // verify all locations are New York
            finStages.forEach(finStage => {
                expect(finStage.trim()).toBe('Pre-Seed');
            });
            await expect(discoverPage.numberOfCompanies).toContainText('1-34 of 34');

        });

        test('C527: Filter by location and description', async ({ page }) => {
            await discoverPage.open();
            await discoverPage.filterByLocation();
            await page.waitForLoadState('networkidle');
            await discoverPage.filterByDescription('trading platform');
            await page.waitForLoadState('networkidle');
            // get all fin stage elements
            // get all location elements
            const locationElements = page.locator('div._location_17hvr_1 p');
            const locations = await locationElements.allTextContents();
            
            // verify we have results
            expect(locations.length).toBeGreaterThan(0);
            
            // verify all locations are New York
            locations.forEach(location => {
                expect(location.trim()).toBe('New York,');
            })
            await expect(discoverPage.numberOfCompanies).toContainText('1-16 of 16');
        });
    });

    test.describe('Tags', () => {
        test.beforeEach(async ({ page }) => {
            await discoverPage.open();
            await page.waitForLoadState('networkidle');
        });

        test('C81: Add tag to one company', async ({ page }) => {
            const newTag = userData.randomTag;
            await discoverPage.addTag(newTag);
            await expect(page.getByText('Tags assigned successfully')).toBeVisible();
            await page.getByText('Broadcom Limited').nth(2).click();
            await expect(page.locator('div').filter({ hasText: newTag }).nth(1)).toBeVisible();
        });

        test('C83: Add one tag to several companies', async ({ page }) => {
            await discoverPage.selectTwoCompanies();
            await expect(discoverPage.addTagButton).toBeDisabled();
        });

        test('C133: Add existing tag to company', async ({ page }) => {
            await discoverPage.addExistingTag();
            await expect(page.getByText('Tags assigned successfully')).toBeVisible();
            await page.getByText('Korea Electric Power Corporation').nth(2).click();
            await expect(page.locator('div').filter({ hasText: 'heartbeat' }).nth(1)).toBeVisible();
        });

        test('C134: Delete a tag', async ({ page }) => {
            await discoverPage.deleteTag();
            await expect(page.getByText('Tags assigned successfully')).toBeVisible();
        });
    });
});
