import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js'; 
import { ContactPage } from '../pages/ContactPage.js';

const F4_EXISTING_USER = { 
    username: `f4_exist_${Date.now()}`, 
    password: 'Password123' 
};


test.use({ browserName: 'chromium' }); 

test.describe('F4 & F3: Registration Negative Tests (Functional Test)', () => {
    
   
    test.beforeAll(async ({ browser }) => {
        
      
        const context = await browser.newContext();
        const page = await context.newPage();
        const registerPage = new RegisterPage(page);

       
        await registerPage.goto();
        const alertMessage = await registerPage.register(F4_EXISTING_USER);
        
      
        if (!alertMessage.includes('Sign up successful.')) {
            throw new Error(`F4 Setup Başarısız: Kullanıcı ilk kez kaydedilemedi. Alert: ${alertMessage}`);
        }
        
        await page.close();
    }, { timeout: 60000 }); 

    
    test('F4: Should display alert when registering with an existing user', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.goto();

       
        const alertMessage = await registerPage.registerNegative(F4_EXISTING_USER);

       
        await expect(alertMessage).toContain('This user already exist.'); 

        
        await expect(registerPage.usernameInput).toBeVisible();

        console.log(`✅ F4 Completed: Existing user registration block verified.`);
    });
    
   
    test('F3: Should successfully open and close the Contact modal', async ({ page }) => {
       
        const contactPage = new ContactPage(page);

        
        await page.goto('/');

        
        await contactPage.contactLink.click();
        
        
        const modalTitle = page.locator('#exampleModalLabel:has-text("New message")');
        await expect(modalTitle).toBeVisible();

       
        const closeButton = page.locator('#exampleModal button:has-text("Close")').first();
        await closeButton.click();
        
        
        await expect(modalTitle).toBeHidden();

        console.log(`✅ F3 Completed: Contact modal interaction verified.`);
    });
});