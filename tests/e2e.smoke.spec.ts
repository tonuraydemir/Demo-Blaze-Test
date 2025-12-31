import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

const generateUniqueUsername = () => `e2e_user_${Date.now()}`;

test.describe('S3: Register & Login (E2E Smoke Test)', () => {

    test('New user can register and immediately log in', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const loginPage = new LoginPage(page);

        const newUser = {
            username: generateUniqueUsername(),
            password: 'Password123' 
        };

      
        await registerPage.goto();
        const alertMessage = await registerPage.register(newUser);
        await expect(alertMessage).toContain('Sign up successful.'); 

     
        await loginPage.goto();
        await loginPage.login(newUser.username, newUser.password);
        
        
        await loginPage.isLoggedIn(newUser.username);

        console.log(`✅ S3 Completed: Registration and immediate login verified for ${newUser.username}`);
    });
});