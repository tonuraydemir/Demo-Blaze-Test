

import { test, expect } from '@playwright/test';
import { ShoppingCartPage } from '../pages/ShoppingCartPage.js'; 

test.describe('F12: Cart Navigation (Functional Test)', () => {

    test('F12: User can navigate to the Cart page successfully', async ({ page }) => {
        const cartPage = new ShoppingCartPage(page);

      
        await cartPage.goto(); 
        
      
        await expect(page).toHaveURL(/cart\.html/);

       
        await expect(cartPage.placeOrderButton).toBeVisible();

        console.log(`✅ F12 Completed: Cart page navigation verified.`);
    });
});