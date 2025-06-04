const { UI_BASE_URL } = require('../utils/config');

class BenefitsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.url = '/Benefits';

        this.addButton = '#add';
        this.firstNameInput = '#firstName';
        this.lastNameInput = '#lastName';
        this.dependentsInput = '#dependants';
        this.addEmployeeButton = '#addEmployee';
        this.employeesTable = '#employeesTable';
        this.updateEmployeeButton = '#updateEmployee';
        this.deleteEmployeeButton = '#deleteEmployee';
        this.logoutLink = 'a[href*="/Account/LogOut"]';
    }

    async goto() {
        await this.page.goto(`${UI_BASE_URL}${this.url}`, { waitUntil: 'networkidle' });
        await this.page.waitForTimeout(2000);
    }

    async clickAddButton() {
        await this.page.waitForSelector(this.addButton, { state: 'visible' });
        await this.page.click(this.addButton);
    }

    /**
     * 
     * @param {{firstName: string, lastName: string, dependents: string}} employeeData
     */
    async fillEmployeeForm(employeeData) {
        const { firstName, lastName, dependents } = employeeData;
        await this.page.waitForSelector(this.firstNameInput, { state: 'visible' });
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.dependentsInput, dependents);
    }

    async submitEmployeeForm() {
        await this.page.click(this.addEmployeeButton);
        await this.page.waitForTimeout(2000);
    }

    /**
     * @param {string} firstName 
     * @param {string} lastName 
     * @returns {import('@playwright/test').Locator}
     */
    getEmployeeRow(firstName, lastName) {
        return this.page.locator(`${this.employeesTable} tr`)
            .filter({
                has: this.page.locator(`td:has-text("${firstName}")`)
            })
            .filter({
                has: this.page.locator(`td:has-text("${lastName}")`)
            })
            .first();
    }

    async clickEditIconByName(firstName, lastName) {
        const row = await this.page
            .locator(this.employeesTable)
            .locator('tr', { hasText: firstName })
            .filter({ hasText: lastName })
            .first();
        const editIcon = row.locator('.fa-edit');
        await editIcon.click();
        await this.page.waitForSelector('#firstName', { state: 'visible' });
    }

    async submitUpdatedEmployee() {
        await this.page.waitForSelector(this.updateEmployeeButton, { state: 'visible' });
        await this.page.click(this.updateEmployeeButton);
        await this.page.waitForTimeout(2000);
    }

    async clickDeleteIconByName(firstName, lastName) {
        const row = await this.page
            .locator(this.employeesTable)
            .locator('tr', { hasText: firstName })
            .filter({ hasText: lastName })
            .first();
        const editIcon = row.locator('.fa-times');
        await editIcon.click();
        await this.page.waitForSelector('#deleteEmployee', { state: 'visible' });
    }

    async submitDeletedEmployee() {
        await this.page.waitForSelector(this.deleteEmployeeButton, { state: 'visible' });
        await this.page.click(this.deleteEmployeeButton);
        await this.page.waitForTimeout(2000);
    }

    async isEmployeeAbsent(firstName, lastName) {
        const matchingRows = await this.page.locator(`${this.employeesTable} tr`)
            .filter({
                has: this.page.locator(`td:has-text("${firstName}")`)
            })
            .filter({
                has: this.page.locator(`td:has-text("${lastName}")`)
            });

        return (await matchingRows.count()) === 0;
    }

    async logout() {
        await this.page.waitForSelector(this.logoutLink, { state: 'visible' });
        await this.page.click(this.logoutLink);
    }
}

module.exports = { BenefitsPage };