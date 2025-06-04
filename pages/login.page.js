const { expect } = require('@playwright/test');
const { UI_BASE_URL } = require('../utils/config');
const { TEST_USER } = require('../utils/test-data');

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#Username');
        this.passwordInput = page.locator('#Password');
        this.loginButton = page.locator('text=Log In');
    }

    async goto() {
        await this.page.goto(UI_BASE_URL + '/Account/LogIn', { waitUntil: 'networkidle' });
    }

    async login(username = TEST_USER.username, password = TEST_USER.password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await expect(this.page.locator('#add')).toBeVisible();
    }
}

module.exports = { LoginPage };