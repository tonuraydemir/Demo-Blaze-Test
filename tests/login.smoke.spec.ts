import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';

// Her çalıştırmada benzersiz olacak bir kullanıcı verisi
const SMOKE_USER = { 
    username: `smoke_user_${Date.now()}`, 
    password: 'Password123' 
};

test.describe('S1: Successful User Login (Smoke Test)', () => {

    // TEST ÖNCESİ HAZIRLIK: Önce kullanıcıyı kaydet
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        const alertMessage = await registerPage.register(SMOKE_USER);
        
        // Kayıt başarılı değilse hata fırlat
        if (!alertMessage.includes('Sign up successful.')) {
            throw new Error(`Ön Koşul Başarısız: Kayıt yapılamadı. Alert: ${alertMessage}`);
        }
        
        await page.close();
        await context.close();
    });

    test('Registered user can successfully log in', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Giriş modalına git
        await loginPage.goto();

        // 2. beforeAll içinde oluşturduğumuz kullanıcı ile giriş yap
        await loginPage.login(SMOKE_USER.username, SMOKE_USER.password);

        // 3. DOĞRULAMA: Welcome mesajı ve Logout linki
        await loginPage.isLoggedIn(SMOKE_USER.username);
        await expect(loginPage.logoutLink).toBeVisible();
        
        console.log(`✅ S1 Başarıyla Tamamlandı: ${SMOKE_USER.username}`);
    });
});