import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js'; 
import { LoginPage } from '../pages/LoginPage.js'; 
import { TEST_USER } from './register.spec.js'; 

test.describe('F9 & F10: Navigation and Category Tests (Functional Tests)', () => {

    test('F9: User can switch between two different categories successfully', async ({ page }) => {
        const homePage = new HomePage(page);
        
       
        const FIRST_CATEGORY = 'Laptops'; 
        const FIRST_EXPECTED_PRODUCT = 'MacBook Pro'; 
        
        const SECOND_CATEGORY = 'Phones'; 
        const SECOND_EXPECTED_PRODUCT = 'Samsung galaxy s6'; 

        await homePage.goto();

      
        await homePage.search(FIRST_CATEGORY);

       
        const laptopProductLocator = page.locator(`a:has-text("${FIRST_EXPECTED_PRODUCT}")`);
        await expect(laptopProductLocator).toBeVisible(); 
        
      
        await homePage.search(SECOND_CATEGORY);
        
       
        const phoneProductLocator = page.locator(`a:has-text("${SECOND_EXPECTED_PRODUCT}")`);
        await expect(phoneProductLocator).toBeVisible();

        
        await expect(laptopProductLocator).toBeHidden(); 

        console.log(`✅ F9 Completed: Category switching verified.`);
    });
});