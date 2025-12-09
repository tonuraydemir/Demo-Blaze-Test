import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js'; 
import { LoginPage } from '../pages/LoginPage.js'; // F10 için eklendi
import { TEST_USER } from './register.spec.js'; // F10 için geçerli kullanıcı

test.describe('F9 & F10: Navigation and Category Tests (Functional Tests)', () => {

    test('F9: User can switch between two different categories successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        
        // Test Verileri
        const FIRST_CATEGORY = 'Laptops'; 
        const FIRST_EXPECTED_PRODUCT = 'MacBook Pro'; 
        
        const SECOND_CATEGORY = 'Phones'; 
        const SECOND_EXPECTED_PRODUCT = 'Samsung galaxy s6'; 

        await homePage.goto();

        // --- BÖLÜM 1: İLK KATEGORİYE GEÇİŞ (Laptops) ---
        await homePage.search(FIRST_CATEGORY);

        // 2. Doğrulama: Laptop listesinin yüklendiğini kontrol et (MacBook görünür mü?)
        const laptopProductLocator = page.locator(`a:has-text("${FIRST_EXPECTED_PRODUCT}")`);
        await expect(laptopProductLocator).toBeVisible(); 
        
        // --- BÖLÜM 2: İKİNCİ KATEGORİYE GEÇİŞ (Phones) ---
        await homePage.search(SECOND_CATEGORY);
        
        // 4. Doğrulama 1: Telefon listesinin yüklendiğini kontrol et (Samsung görünür mü?)
        const phoneProductLocator = page.locator(`a:has-text("${SECOND_EXPECTED_PRODUCT}")`);
        await expect(phoneProductLocator).toBeVisible();

        // 5. Doğrulama 2: Eski kategoriye ait ürünün (MacBook Pro) GİZLENDİĞİNİ kontrol et
        await expect(laptopProductLocator).toBeHidden(); 

        console.log(`✅ F9 Completed: Category switching verified.`);
    });
});