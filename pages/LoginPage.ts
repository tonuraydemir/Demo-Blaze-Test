import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly welcomeMessage: Locator; 
    readonly loginModalCloseButton: Locator; 
    readonly logoutLink: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator('#login2');
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.locator('button:has-text("Log in")');
        this.welcomeMessage = page.locator('#nameofuser'); 
        this.loginModalCloseButton = page.locator('#logInModal button:has-text("Close")'); 
        this.logoutLink = page.locator('#logout2'); 
    }

    async goto() {
        await this.page.goto('/');
        await this.loginLink.click();
        await expect(this.usernameInput).toBeVisible(); 
    }

 
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        
        
        const dialogPromise = this.page.waitForEvent('dialog').catch(() => null); 
        
        await this.loginButton.click();
        
        const dialog = await dialogPromise;

        if (dialog) {
         
            const message = dialog.message();
            await dialog.accept();
         
            throw new Error(`Login failed in setup: ${message}`);
        }
        
        
        await expect(this.usernameInput).toBeHidden({ timeout: 15000 }); 
    }

    async isLoggedIn(username: string) {
     
        await expect(this.welcomeMessage).toHaveText(`Welcome ${username}`, { timeout: 15000 });
        await expect(this.welcomeMessage).toBeVisible(); 
    }
    

    async loginNegative(username: string, password: string): Promise<string> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.loginButton.click()
        ]);

        const message = alert.message();
        await alert.accept();
        
        await expect(this.loginButton).toBeVisible(); 
        
        return message;
    }
    
    
    
    async closeLoginModal() {
        await this.loginModalCloseButton.click();
        await expect(this.loginModalCloseButton).toBeHidden(); 
    }
    
    async logout() {
        await this.logoutLink.click();
        await expect(this.loginLink).toBeVisible();
        await expect(this.welcomeMessage).toBeHidden();
    }
}