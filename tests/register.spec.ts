import { test, expect } from '@playwright/test';

import { RegisterPage } from '../pages/RegisterPage.js'; 


const generateUniqueUsername = () => {
    const timestamp = Date.now();
    return `user_${timestamp}`; 
}


export const TEST_USER = {
    username: generateUniqueUsername(),
    password: 'Password123' 
}

test.describe('F1: Successful User Registration (Functional Test - Demoblaze)', () => {

    test('New user can successfully register on Demoblaze', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const newUser = {
            username: TEST_USER.username, 
            password: TEST_USER.password 
        };

       
        await registerPage.goto();
     
        const alertMessage = await registerPage.register(newUser);
        
       
        await registerPage.registrationIsSuccessful(alertMessage);
        
        console.log(`✅ F1 Completed: Registered username: ${TEST_USER.username}`);
    });
});