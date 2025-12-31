import { Page, Locator, expect } from '@playwright/test';


export class ShoppingCartPage {
    readonly page: Page;

    
    readonly cartLink: Locator;
    readonly placeOrderButton: Locator;
    readonly productInCart: Locator;
    readonly totalValue: Locator; 

    constructor(page: Page) {
        this.page = page;
        
       
        this.cartLink = page.locator('#cartur'); 
        this.placeOrderButton = page.locator('button:has-text("Place Order")');
       
        this.productInCart = page.locator('.success > td:nth-child(2)'); 
      
        this.totalValue = page.locator('h3#totalm'); 
    }
    
   
    async goto() {
        
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');

        
        await expect(this.cartLink).toBeEnabled();
        await this.cartLink.click();
        
        
        await this.page.waitForLoadState('domcontentloaded');
       
        await expect(this.page).toHaveTitle(/Store/i); 
    }

    
    async verifyProductInCart(expectedProductName: string) {
        await expect(this.productInCart).toBeVisible();
        await expect(this.productInCart).toHaveText(expectedProductName); 
    }

 
    async startCheckout() {
        await this.placeOrderButton.click();
       
        await expect(this.page.locator('#name')).toBeVisible(); 
    }
    
    
    async deleteFirstProduct() {
        const deleteLink = this.page.locator('.success a:has-text("Delete")').first();
        
        await deleteLink.click();
        
        
        await this.page.waitForTimeout(1000); 
    }

    
    async verifyCartIsEmpty() {
        const productRow = this.page.locator('.success');
        
    
        await expect(productRow).toHaveCount(0, { timeout: 5000 });
    }
}