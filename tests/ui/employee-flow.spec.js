const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');
const { BenefitsPage } = require('../../pages/benefits.page');
const { EMPLOYEE_DATA, NEW_EMPLOYEE_DATA } = require('../../utils/test-data');

test('Employee CRUD flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const benefitsPage = new BenefitsPage(page);

    await test.step('Login to the system', async () => {
        await loginPage.goto();
        await loginPage.login();
    });

    await test.step('Add new employee', async () => {
        await benefitsPage.goto();
        await benefitsPage.clickAddButton();
        await benefitsPage.fillEmployeeForm(EMPLOYEE_DATA);
        await benefitsPage.submitEmployeeForm();

        await expect(benefitsPage.getEmployeeRow(EMPLOYEE_DATA.firstName, EMPLOYEE_DATA.lastName)).toBeVisible();
    });

    await test.step('Edit employee', async () => {
        await benefitsPage.goto();
        await benefitsPage.clickEditIconByName(EMPLOYEE_DATA.firstName, EMPLOYEE_DATA.lastName);
        await benefitsPage.fillEmployeeForm(NEW_EMPLOYEE_DATA);
        await benefitsPage.submitUpdatedEmployee();

        await expect(
            benefitsPage.getEmployeeRow(NEW_EMPLOYEE_DATA.firstName, NEW_EMPLOYEE_DATA.lastName)
        ).toBeVisible();
    });

    await test.step('Delete employee', async () => {
        await benefitsPage.goto();
        await benefitsPage.clickDeleteIconByName(NEW_EMPLOYEE_DATA.firstName, NEW_EMPLOYEE_DATA.lastName);
        await benefitsPage.submitDeletedEmployee();

        const isAbsent = await benefitsPage.isEmployeeAbsent(
            NEW_EMPLOYEE_DATA.firstName,
            NEW_EMPLOYEE_DATA.lastName
        );

        expect(isAbsent).toBe(true);
    });
});