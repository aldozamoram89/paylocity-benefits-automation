const { test, expect } = require('@playwright/test');
const { API_BASE_URL } = require('../../utils/config');
const token = 'Basic VGVzdFVzZXI3NTE6ZGVIMH19dmJDWyEk';

test.describe.serial('Employee API tests in order', () => {
    let newEmployeId = '';

    test('Get all employes', async ({ request }) => {
        const response = await request.get(API_BASE_URL, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
            },
        });

        expect(response.ok()).toBeTruthy();
    });

    test('Create Employee', async ({ request }) => {
        const response = await request.post(API_BASE_URL, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
            },
            data: {
                firstName: 'API firstName',
                lastName: 'API lastName',
                dependants: 1,
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();

        const employeeId = responseBody.id;

        expect(employeeId).toBeTruthy();

        newEmployeId = employeeId;
    });

    test('Get single employee by id', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/${newEmployeId}`, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
            },
        });

        expect(response.ok()).toBeTruthy();

        const employee = await response.json();

        expect(employee.id).toBe(newEmployeId);
        expect(employee.firstName).toBeTruthy();
        expect(employee.lastName).toBeTruthy();
    });

    test('Update Employee', async ({ request }) => {
        const employeeToUpdate = {
            id: newEmployeId,
            firstName: 'API update firstName',
            lastName: 'API update lastName',
            dependants: 3,
        };

        const response = await request.put(API_BASE_URL, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: employeeToUpdate,
        });

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        expect(responseBody.id).toBe(employeeToUpdate.id);
        expect(responseBody.firstName).toBe(employeeToUpdate.firstName);
        expect(responseBody.lastName).toBe(employeeToUpdate.lastName);
        expect(responseBody.dependants).toBe(employeeToUpdate.dependants);
    });

    test('Delete Employee', async ({ request }) => {
        const response = await request.delete(`${API_BASE_URL}/${newEmployeId}`, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
            },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });
});