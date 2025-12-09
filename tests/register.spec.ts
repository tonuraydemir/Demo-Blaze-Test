import { test, expect } from '@playwright/test';
// Demoblaze'e özel RegisterPage sınıfını import ediyoruz.
import { RegisterPage } from '../pages/RegisterPage.js'; 

// Her test çalıştığında benzersiz bir kullanıcı adı oluşturur.
const generateUniqueUsername = () => {
    const timestamp = Date.now();
    return `user_${timestamp}`; 
}

// Global kullanıcıyı diğer testlerde (Örn: Login) kullanmak için dışa aktarıyoruz.
// KRİTİK DEĞİŞİKLİK: E-posta yerine 'username' kullanıldı.
export const TEST_USER = {
    username: generateUniqueUsername(),
    password: 'Password123' 
}

test.describe('F1: Successful User Registration (Functional Test - Demoblaze)', () => {

    test('New user can successfully register on Demoblaze', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const newUser = {
            username: TEST_USER.username, // username kullanılıyor
            password: TEST_USER.password 
        };

        // 1. Kayıt modalını aç
        await registerPage.goto();
        
        // 2. Kayıt işlemini yap ve tarayıcıdan gelen alert mesajını yakala
        // Metot artık alert mesajını döndürür.
        const alertMessage = await registerPage.register(newUser);
        
        // 3. Doğrulama (Assertion): Alert mesajını kontrol et
        // RegisterPage sınıfındaki yeni doğrulama metodunu kullanıyoruz.
        await registerPage.registrationIsSuccessful(alertMessage);
        
        console.log(`✅ F1 Completed: Registered username: ${TEST_USER.username}`);
    });
});