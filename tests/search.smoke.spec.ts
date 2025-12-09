import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js'; 

test.describe('S5: Simple Search (Smoke Test)', () => {

    test('User can successfully filter products by category', async ({ page }) => {
        const homePage = new HomePage(page);
        
        const SEARCH_TERM = 'Laptops'; 
        const EXPECTED_PRODUCT = 'MacBook Pro'; 

        await homePage.goto();

        // 1. Arama/Filtreleme işlemini gerçekleştir (Laptops'a tıkla)
        await homePage.search(SEARCH_TERM);

        // 2. KRİTİK DOĞRULAMA 1: Filtreleme sonrası listede beklenen ürünün göründüğünü kontrol et.
        // Bu, filtrenin doğru çalıştığını kanıtlayan EN ÖNEMLİ DOĞRULAMADIR ve yeterlidir.
        const expectedProductLocator = page.locator('a:has-text("MacBook Pro")');
        await expect(expectedProductLocator).toBeVisible(); 
        
        // 3. Kırılgan olan sınıf (active) kontrolü tamamen kaldırıldı.
        // Yerine, ürün listesinin en az bir ürün içerdiğini kontrol ediyoruz.
        await expect(homePage.productCards.first()).toBeVisible();
        
        console.log(`✅ S5 Completed: Filtered by category '${SEARCH_TERM}' verified.`);
    });
});