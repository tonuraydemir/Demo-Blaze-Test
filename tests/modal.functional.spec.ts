import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js'; 

test.describe('F11: Modal Management (Functional Test)', () => {

    test('F11: User can open and close the Login modal successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. ÖN KOŞUL: Ana sayfaya git
        await page.goto('/');

        // 2. Aksiyon: Login modalını aç (goto metodu modalı açar ve hazırlar)
        await loginPage.goto(); 
        
        // 3. Doğrulama (Setup): Kapatma butonunun görünür olduğunu kontrol et
        await expect(loginPage.loginModalCloseButton).toBeVisible();

        // 4. Aksiyon: Login modalını kapat
        await loginPage.closeLoginModal();

        // 5. Doğrulama (Assertion): Login linki tekrar görünür olmalı (Modalın kaybolduğunu teyit eder)
        await expect(loginPage.loginLink).toBeVisible();

        console.log(`✅ F11 Completed: Login modal closed successfully.`);
    });
});