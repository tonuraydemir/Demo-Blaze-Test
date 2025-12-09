import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 

test.describe('F6: Product Detail Inspection (Functional Test)', () => {

    test('User can view product details and verify price and description', async ({ page }) => {
        const productPage = new ProductPage(page);

        // 1. Ana sayfaya git
        await page.goto('/');

        // 2. İlk ürüne tıkla ve detay sayfasına git
        await productPage.selectFirstProduct();

        // 3. Doğrulama (Assertion): Ürün başlığı, fiyatı ve açıklamasının doğru yüklendiğini kontrol et
        await productPage.verifyProductDetails();

        console.log(`✅ F6 Completed: Product details verified.`);
    });
});