import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js'; 

test.describe('F6: Product Detail Inspection (Functional Test)', () => {

    test('User can view product details and verify price and description', async ({ page }) => {
        const productPage = new ProductPage(page);

       
        await page.goto('/');


        await productPage.selectFirstProduct();

   
        await productPage.verifyProductDetails();

        console.log(`✅ F6 Completed: Product details verified.`);
    });
});