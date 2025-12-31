import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js'; 

test.describe('S5: Simple Search (Smoke Test)', () => {

    test('User can successfully filter products by category', async ({ page }) => {
        const homePage = new HomePage(page);
        
        const SEARCH_TERM = 'Laptops'; 
        const EXPECTED_PRODUCT = 'MacBook Pro'; 

        await homePage.goto();

       
        await homePage.search(SEARCH_TERM);

    
        const expectedProductLocator = page.locator('a:has-text("MacBook Pro")');
        await expect(expectedProductLocator).toBeVisible(); 
        
     
        await expect(homePage.productCards.first()).toBeVisible();
        
        console.log(`✅ S5 Completed: Filtered by category '${SEARCH_TERM}' verified.`);
    });
});