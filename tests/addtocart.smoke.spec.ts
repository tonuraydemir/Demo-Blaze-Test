import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 

test.describe('S2: Add to Cart (Smoke Test)', () => {

    test('User can successfully add a product to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);

        // 1. Ana sayfaya git (baseURL tarafından yönetilir)
        await page.goto('/');

        // 2. İlk ürüne tıkla
        await productPage.selectFirstProduct();

        // 3. Ürünü sepete ekle ve alert mesajını al
        const alertMessage = await productPage.addToCart();

        // 4. Doğrulama (Assertion): Sepete ekleme işleminin başarılı olduğunu onayla
        await productPage.verifyAddToCartSuccess(alertMessage);

        console.log('✅ S2 Completed: Product successfully added to cart.');
    });
});