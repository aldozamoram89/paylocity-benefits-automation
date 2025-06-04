# Paylocity Benefits Automation

This repository contains automated tests for both the API and UI of the Paylocity Benefits Dashboard, created as part of the STE Assessment Challenge.

## Project Structure

The project is organized as follows:

- `tests/api/`: API tests for employee operations (GET, POST, PUT, DELETE).
- `tests/ui/`: UI tests for the Benefits Dashboard interface.
- `utils/config.js`: Stores configuration values such as the API base URL.
- `playwright.config.js`: Playwright configuration file.
- `package.json`: Project metadata and dependencies.
- `README.md`: Project instructions and documentation.

## Prerequisites

Before running the tests, make sure the following are installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- [Playwright](https://playwright.dev/)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/aldozamoram89/paylocity-benefits-automation.git
cd paylocity-benefits-automation
npm install
npx playwright install

Running Tests
Run all tests (API + UI)
npx playwright test

Run only API tests
npx playwright test tests/api

Run only UI tests
npx playwright test tests/ui

Test Coverage
The API tests cover:

Get all employees
Get a single employee
Create employee
Update employee
Delete employee

The UI tests validate the key elements and functionality of the Benefits Dashboard.

Notes:
API responses are validated using assertions.
The delete operation returns 1 when successful.
The update operation sends the employee ID in the body (not in the URL).
Playwright can be run in headless or headed mode using CLI flags (e.g., --headed).

Author
Name: Aldo Zamora

GitHub: https://github.com/aldozamoram89