import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';

/**
 * F18: Logo Navigasyonu ve Oturum Koruma Testi
 * Bu test, kullanıcı giriş yaptıktan sonra "PRODUCT STORE" logosuna tıkladığında
 * oturumun (session) sonlanmadığını doğrular.
 */

test.describe('Main Navigation Functional Tests', () => {

    test('F18: User remains logged in after navigating via logo', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        // Sabit test hesabı
        const username = 'test'; 
        const password = 'test';

        // 1. ADIM: Sayfaya git ve giriş yap
        await page.goto('/');
        await loginPage.goto(); 
        await loginPage.login(username, password);
        
        // Giriş yapıldığını doğrula (Welcome mesajını bekle)
        await loginPage.isLoggedIn(username); 

        // 2. ADIM: "PRODUCT STORE" logosuna tıkla
        // Chromium'da navigasyonun tamamlandığından emin olmak için waitForNavigation kullanıyoruz.
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load' }), 
            homePage.clickLogo()
        ]);

        // 3. ADIM: Navigasyon sonrası sayfanın oturmasını bekle
        // Chromium hızından kaynaklı hataları önlemek için kısa bir yükleme durumu bekliyoruz.
        await page.waitForLoadState('domcontentloaded');

        // 4. ADIM: DOĞRULAMA (Assertion)
        // Welcome mesajının ve Logout linkinin hala orada olduğunu kontrol et
        // timeout ekleyerek Chromium'un elementleri render etmesi için süre tanıyoruz.
        await expect(loginPage.welcomeMessage).toBeVisible({ timeout: 10000 });
        await expect(loginPage.welcomeMessage).toHaveText(`Welcome ${username}`);
        await expect(loginPage.logoutLink).toBeVisible();

        console.log(`✅ F18 Completed: Logo navigation on Product Store verified.`);
    });
});