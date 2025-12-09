import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 
import { ShoppingCartPage } from '../pages/ShoppingCartPage.js'; 

test.describe('F5: Shopping Cart Management (Functional Test)', () => {

    test('User can successfully delete an item from the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new ShoppingCartPage(page);

        // 1. ÖN KOŞUL: Ürünü sepete ekle (S2 mantığı)
        await page.goto('/');
        await productPage.selectFirstProduct();
        const alertMessage = await productPage.addToCart();
        await productPage.verifyAddToCartSuccess(alertMessage); // Başarılı eklendiğini doğrula

        // 2. Sepete Git
        await cartPage.goto();
        
        // 3. Silme İşlemi
        await cartPage.deleteFirstProduct();

        // 4. Doğrulama (Assertion): Sepetin boş olduğunu kontrol et
        await cartPage.verifyCartIsEmpty();

        console.log(`✅ F5 Completed: Item successfully deleted from cart.`);
    });
});