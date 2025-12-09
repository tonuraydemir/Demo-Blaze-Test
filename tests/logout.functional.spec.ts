// /tests/logout.functional.spec.ts dosyasında

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js'; // Setup için RegisterPage'i içeri al

// F10'a özel kullanıcı oluşturma
const F10_E2E_USER = { 
    username: `f10_user_${Date.now()}`, 
    password: 'Password123' 
};

// Testin her worker'ı için kullanıcı oluşturulur
test.describe('F10: Session Management (Functional Test)', () => {
    
    // KRİTİK SETUP: Her worker için kullanıcıyı kaydet.
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        // Kullanıcıyı KAYDET
        await registerPage.goto();
        const alertMessage = await registerPage.register(F10_E2E_USER);
        
        if (!alertMessage.includes('Sign up successful.')) {
            // Eğer kayıt başarılı olmazsa, ana testi çalıştırmadan hata fırlat.
            await page.close();
            throw new Error(`F10 Setup Başarısız: Kullanıcı oluşturulamadı. Alert: ${alertMessage}`);
        }
        await page.close();
    }, { timeout: 60000 }); // Setup için 60 saniye zaman aşımı

    test('F10: User can successfully log out after logging in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const username = F10_E2E_USER.username; // Kendi setup'ından gelen kullanıcıyı kullan

        // 1. ÖN KOŞUL: Başarılı bir şekilde giriş yap
        await loginPage.goto();
        await loginPage.login(username, F10_E2E_USER.password); // Giriş yap ve Alert yoksa devam et
        
        await loginPage.isLoggedIn(username); // Girişin başarılı olduğunu doğrula
        
        // 2. Aksiyon: Logout işlemini gerçekleştir
        await loginPage.logout();

        // 3. Doğrulama: Oturumun sonlandığını kontrol et
        await expect(loginPage.loginLink).toBeVisible();
        await expect(loginPage.welcomeMessage).toBeHidden(); 

        console.log(`✅ F10 Completed: User logged out successfully.`);
    });
});