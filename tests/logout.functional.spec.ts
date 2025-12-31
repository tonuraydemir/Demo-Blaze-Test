import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';


const F10_USER = { 
    username: `f10_logout_${Date.now()}`, 
    password: 'Password123' 
};

test.describe('F10: Session Management', () => {
   
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        const alertMessage = await registerPage.register(F10_USER);
        
    
        if (!alertMessage.includes('Sign up successful.')) {
            await page.close();
            throw new Error(`F10 Kayıt Hatası: ${alertMessage}`);
        }
        await page.close();
        await context.close();
    }, { timeout: 60000 }); 

    test('F10: User can successfully log out after logging in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const username = F10_USER.username;

       
        await loginPage.goto();
        await loginPage.login(username, F10_USER.password);
        
      
        await loginPage.isLoggedIn(username); 
        
       
        await loginPage.logout();

     
        await expect(loginPage.loginLink).toBeVisible({ timeout: 10000 });
        await expect(loginPage.welcomeMessage).toBeHidden(); 

        console.log(`✅ F10 Completed: User logged out successfully.`);
    });
});