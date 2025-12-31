import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js'; 

test.describe('F11: Modal Management (Functional Test)', () => {

    test('F11: User can open and close the Login modal successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

       
        await page.goto('/');

       
        await loginPage.goto(); 
        
       
        await expect(loginPage.loginModalCloseButton).toBeVisible();

      
        await loginPage.closeLoginModal();

       
        await expect(loginPage.loginLink).toBeVisible();

        console.log(`✅ F11 Completed: Login modal closed successfully.`);
    });
});