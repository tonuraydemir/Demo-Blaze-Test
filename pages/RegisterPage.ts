import { Page, Locator, expect } from '@playwright/test';


export class RegisterPage {
    readonly page: Page;
   
    readonly signupLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signupButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
       
        this.signupLink = page.locator('#signin2'); 
        this.usernameInput = page.locator('#sign-username');
        this.passwordInput = page.locator('#sign-password');
        this.signupButton = page.locator('button').filter({ hasText: 'Sign up' });
    }
    


    async goto() {
        await this.page.goto('/');
        await this.signupLink.click();
        await expect(this.usernameInput).toBeVisible(); 
    }

 
   
    async register(userData: { username: string, password: string }): Promise<string> {
        await this.usernameInput.fill(userData.username);
 
        await this.page.waitForTimeout(100); 
        
        await this.passwordInput.fill(userData.password);
        await this.page.waitForTimeout(100); 
        
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'), 
            this.signupButton.click() 
        ]);
        
        const message = alert.message();
        await alert.accept(); 
        return message;
    }

   
    async registrationIsSuccessful(alertMessage: string) {
        expect(alertMessage).toContain('Sign up successful.');
    }
    

    async registerNegative(userData: { username: string, password: string }): Promise<string> {
        await this.usernameInput.fill(userData.username);
        await this.page.waitForTimeout(100); 
        
        await this.passwordInput.fill(userData.password);
        await this.page.waitForTimeout(100); 
        
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.signupButton.click()
        ]);

        const message = alert.message();
        await alert.accept();
        
      
        await expect(this.signupButton).toBeVisible(); 
        
        return message;
    }
    
  
}