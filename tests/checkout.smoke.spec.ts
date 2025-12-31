import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 
import { ShoppingCartPage } from '../pages/ShoppingCartPage.js'; 
import { CheckoutPage } from '../pages/CheckoutPage.js'; 

const PAYMENT_DATA = {
    name: 'Test User',
    country: 'Turkey',
    city: 'Sarajevo',
    card: '1234567890123456',
    month: '12',
    year: '2025'
};

test.describe('S4: Checkout Flow (Smoke Test)', () => {

    test('Anonymous user can add product and successfully complete checkout', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new ShoppingCartPage(page);
        const checkoutPage = new CheckoutPage(page);

       
        await page.goto('/');
        await productPage.selectFirstProduct();
        const alertMessage = await productPage.addToCart();
        await productPage.verifyAddToCartSuccess(alertMessage);

      
        await cartPage.goto();
      
        const productName = await cartPage.productInCart.textContent(); 
        await cartPage.startCheckout();

        
        await checkoutPage.fillPaymentDetails(PAYMENT_DATA);
        await checkoutPage.completePurchase();

        
        await checkoutPage.verifyPurchaseSuccess();

        console.log(`✅ S4 Completed: Checkout successful for product: ${productName}`);
    });
});