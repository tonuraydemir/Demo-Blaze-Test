import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';



test.describe('Main Navigation Functional Tests', () => {

    test('F18: User remains logged in after navigating via logo', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

       
        const username = 'test'; 
        const password = 'test';

        
        await page.goto('/');
        await loginPage.goto(); 
        await loginPage.login(username, password);
        
       
        await loginPage.isLoggedIn(username); 

        
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load' }), 
            homePage.clickLogo()
        ]);

       
        await page.waitForLoadState('domcontentloaded');

       
        await expect(loginPage.welcomeMessage).toBeVisible({ timeout: 10000 });
        await expect(loginPage.welcomeMessage).toHaveText(`Welcome ${username}`);
        await expect(loginPage.logoutLink).toBeVisible();

        console.log(`✅ F18 Completed: Logo navigation on Product Store verified.`);
    });
});