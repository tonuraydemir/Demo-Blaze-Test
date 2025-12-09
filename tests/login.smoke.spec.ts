import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js'; 
// KRİTİK: Kayıt Testinde oluşturulan kullanıcıyı buraya import ediyoruz.
import { TEST_USER } from './register.spec.js'; 


// Test, import edilen TEST_USER nesnesini kullanacağı için, 
// artık sabit bir VALID_USER tanımlamaya gerek yok.

test.describe('S1: Successful User Login (Smoke Test - Demoblaze)', () => {

    test('Registered user can successfully log in', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Kullanıcı verilerini register.spec.js dosyasından alıyoruz.
        const username = TEST_USER.username;
        const password = TEST_USER.password;

        // 1. Login modalını aç
        await loginPage.goto();

        // 2. Geçerli kullanıcı bilgileri ile giriş yap
        await loginPage.login(username, password);

        // 3. Girişin başarılı olduğunu doğrula
        await loginPage.isLoggedIn(username);

        console.log(`✅ S1 Completed: Login successful for user: ${username}`);
    });
});