import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 
import { ShoppingCartPage } from '../pages/ShoppingCartPage.js'; 
import { CheckoutPage } from '../pages/CheckoutPage.js'; 

const PAYMENT_DATA = {
    name: 'Test User',
    country: 'Turkey',
    city: 'Sarajevo', // Şehir bilgisi önemli değil, Demoblaze kabul eder
    card: '1234567890123456',
    month: '12',
    year: '2025'
};

test.describe('S4: Checkout Flow (Smoke Test)', () => {

    test('Anonymous user can add product and successfully complete checkout', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new ShoppingCartPage(page);
        const checkoutPage = new CheckoutPage(page);

        // 1. Ürün Seçimi ve Sepete Ekleme (S2'nin mantığı)
        await page.goto('/');
        await productPage.selectFirstProduct();
        const alertMessage = await productPage.addToCart();
        await productPage.verifyAddToCartSuccess(alertMessage);

        // 2. Sepete Git ve Ödeme Başlat
        await cartPage.goto();
        // Sepette ürünün adını alalım (Doğrulama için)
        const productName = await cartPage.productInCart.textContent(); 
        await cartPage.startCheckout();

        // 3. Ödeme Detaylarını Doldur ve Satın Al
        await checkoutPage.fillPaymentDetails(PAYMENT_DATA);
        await checkoutPage.completePurchase();

        // 4. Doğrulama (Assertion)
        await checkoutPage.verifyPurchaseSuccess();

        console.log(`✅ S4 Completed: Checkout successful for product: ${productName}`);
    });
});