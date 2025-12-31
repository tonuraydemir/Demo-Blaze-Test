import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 

test.describe('S2: Add to Cart (Smoke Test)', () => {

    test('User can successfully add a product to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);

     
        await page.goto('/');

        await productPage.selectFirstProduct();

        
        const alertMessage = await productPage.addToCart();

    
        await productPage.verifyAddToCartSuccess(alertMessage);

        console.log('✅ S2 Completed: Product successfully added to cart.');
    });
});