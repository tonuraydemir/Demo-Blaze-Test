import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js'; 
import { ContactPage } from '../pages/ContactPage.js';
// F4'e özel kullanıcı adını tanımlayalım
const F4_EXISTING_USER = { 
    username: `f4_exist_${Date.now()}`, // Her çalıştırmada benzersiz kullanıcı oluşturur
    password: 'Password123' 
};

// Bu, Chromium'u zorlayan satır.
test.use({ browserName: 'chromium' }); 

test.describe('F4 & F3: Registration Negative Tests (Functional Test)', () => {
    
    // KRİTİK SETUP: F4 testi için gerekli olan mevcut kullanıcıyı kaydet.
    test.beforeAll(async ({ browser }) => {
        
        // Context ve Page oluşturma
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

        // Kullanıcıyı KAYDET (İlk kayıt)
        await registerPage.goto();
        const alertMessage = await registerPage.register(F4_EXISTING_USER);
        
        // Kayıt başarılı olduğunu kontrol et
        if (!alertMessage.includes('Sign up successful.')) {
            throw new Error(`F4 Setup Başarısız: Kullanıcı ilk kez kaydedilemedi. Alert: ${alertMessage}`);
        }
        
        await page.close();
    }, { timeout: 60000 }); // Setup için 60 saniye zaman aşımı

    // ----------------------------------------------------------------------
    // F4 TESTİ: Mevcut Kullanıcı Tekrarı (Negatif)
    // ----------------------------------------------------------------------
    test('F4: Should display alert when registering with an existing user', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

        // 1. Mevcut kullanıcı ile tekrar kayıt olmayı dene ve Alert mesajını yakala
        const alertMessage = await registerPage.registerNegative(F4_EXISTING_USER);

        // 2. KRİTİK DOĞRULAMA: Hata mesajını, siteden gelen küçük harfli versiyonla kontrol et
        // Gelen mesaj: "This user already exist."
        await expect(alertMessage).toContain('This user already exist.'); 

        // 3. Ek Doğrulama: Kayıt modalının hala görünür olduğunu kontrol et
        await expect(registerPage.usernameInput).toBeVisible();

        console.log(`✅ F4 Completed: Existing user registration block verified.`);
    });
    
    // ----------------------------------------------------------------------
    // F3 TESTİ: Tüm Alanlar Boş Bırakma (Negatif)
    // ----------------------------------------------------------------------
    test('F3: Should successfully open and close the Contact modal', async ({ page }) => {
        // Not: ContactPage sınıfının sayfalar klasöründe var olduğunu varsayıyoruz.
        const contactPage = new ContactPage(page);

        // 1. Ana sayfaya git
        await page.goto('/');

        // 2. Aksiyon: Contact linkine tıkla
        await contactPage.contactLink.click();
        
        // 3. Doğrulama: Modal başlığının görünür olduğunu kontrol et
        const modalTitle = page.locator('#exampleModalLabel:has-text("New message")');
        await expect(modalTitle).toBeVisible();

        // 4. Aksiyon: Modalın Close butonuyla kapatıldığını doğrula
        const closeButton = page.locator('#exampleModal button:has-text("Close")').first();
        await closeButton.click();
        
        // 5. Doğrulama: Modalın gizlendiğini kontrol et
        await expect(modalTitle).toBeHidden();

        console.log(`✅ F3 Completed: Contact modal interaction verified.`);
    });
});