// /tests/logout_temp.spec.ts dosyasında (DENEME AMAÇLI)

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js'; 

const F10_E2E_USER = { 
    username: `f10_user_${Date.now()}`, 
    password: 'Password123' 
};

// ÇÖZÜM DENEMESİ: Hook'u description string'i olmadan ve options'sız çağırmak.
test.describe('F10: Session Management', () => {
    
    // Setup hook'unu options olmadan çağırıyoruz
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        const alertMessage = await registerPage.register(F10_E2E_USER);
        
        if (!alertMessage.includes('Sign up successful.')) {
            await page.close();
            throw new Error(`F10 Setup Başarısız: Kullanıcı oluşturulamadı. Alert: ${alertMessage}`);
        }
        await page.close();
    });

    test('F10: User can successfully log out after logging in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const username = F10_E2E_USER.username;

        await loginPage.goto();
        await loginPage.login(username, F10_E2E_USER.password); 
        
        await loginPage.isLoggedIn(username); 
        
        await loginPage.logout();

        await expect(loginPage.loginLink).toBeVisible();
        await expect(loginPage.welcomeMessage).toBeHidden(); 

        console.log(`✅ F10 Completed: User logged out successfully.`);
    });
});