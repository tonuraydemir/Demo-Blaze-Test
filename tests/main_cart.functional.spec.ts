// /tests/cart.functional.spec.ts dosyasına eklenecek yeni test

import { test, expect } from '@playwright/test';
import { ShoppingCartPage } from '../pages/ShoppingCartPage.js'; 

test.describe('F12: Cart Navigation (Functional Test)', () => {

    test('F12: User can navigate to the Cart page successfully', async ({ page }) => {
        const cartPage = new ShoppingCartPage(page);

        // 1. Aksiyon: Sepet linkine tıkla
        await cartPage.goto(); 
        
        // 2. Doğrulama (Assertion): Sayfanın Cart başlığını içerdiğini kontrol et.
        // Daha önce /Store/i başlığını kullanmıştık. Sepet linki /cart.html'e gider.
        await expect(page).toHaveURL(/cart\.html/);

        // 3. Ek Doğrulama: "Place Order" butonunun görünür olduğunu kontrol et.
        await expect(cartPage.placeOrderButton).toBeVisible();

        console.log(`✅ F12 Completed: Cart page navigation verified.`);
    });
});