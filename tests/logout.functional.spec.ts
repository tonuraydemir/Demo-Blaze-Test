import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';

/**
 * F10: Session Management (Logout) Testi
 * Bu test, dinamik bir kullanıcı oluşturur, giriş yapar 
 * ve güvenli bir şekilde çıkış yapılabildiğini doğrular.
 */

// Her çalışmada benzersiz bir kullanıcı oluşturur
const F10_USER = { 
    username: `f10_logout_${Date.now()}`, 
    password: 'Password123' 
};

test.describe('F10: Session Management', () => {
    
    // ÖN KOŞUL: Test başlamadan önce yeni bir kullanıcı kaydet
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        await registerPage.goto();
        const alertMessage = await registerPage.register(F10_USER);
        
        // Alert mesajı kontrolü (Boş veya başarısızsa hata fırlat)
        if (!alertMessage.includes('Sign up successful.')) {
            await page.close();
            throw new Error(`F10 Kayıt Hatası: ${alertMessage}`);
        }
        await page.close();
        await context.close();
    }, { timeout: 60000 }); // Kayıt işlemi bazen yavaş olabilir, 60sn süre tanıyoruz

    test('F10: User can successfully log out after logging in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const username = F10_USER.username;

        // 1. ADIM: Başarılı bir şekilde giriş yap
        await loginPage.goto();
        await loginPage.login(username, F10_USER.password);
        
        // Giriş yapıldığını doğrula
        await loginPage.isLoggedIn(username); 
        
        // 2. ADIM: Logout (Çıkış) işlemini gerçekleştir
        await loginPage.logout();

        // 3. ADIM: DOĞRULAMA (Assertion)
        // Login butonu geri gelmeli, Welcome mesajı silinmeli
        await expect(loginPage.loginLink).toBeVisible({ timeout: 10000 });
        await expect(loginPage.welcomeMessage).toBeHidden(); 

        console.log(`✅ F10 Completed: User logged out successfully.`);
    });
});