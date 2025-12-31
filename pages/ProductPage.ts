import { Page, Locator, expect } from '@playwright/test';


export class ProductPage {
    readonly page: Page;


    readonly firstProductLink: Locator; 
    readonly productTitle: Locator;
    readonly addToCartButton: Locator;
    readonly productPriceText: Locator; 
    readonly productDescriptionLink: Locator; 
    
    constructor(page: Page) {
        this.page = page;
        
      
        this.firstProductLink = page.locator('.card-title a').first();
        this.productTitle = page.locator('.name');
        this.addToCartButton = page.locator('a:has-text("Add to cart")'); 
        
        
        this.productPriceText = page.locator('.price-container'); 
        this.productDescriptionLink = page.locator('#myTabContent'); 
    }
    
    

    async selectFirstProduct() {
        await this.firstProductLink.click();
        
      
        await expect(this.productPriceText).toBeVisible({ timeout: 10000 });
        await expect(this.productTitle).toBeVisible(); 
    }
    
   
    async addToCart(): Promise<string> {
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.addToCartButton.click()
        ]);

        const message = alert.message();
        await alert.accept(); 
        return message;
    }

    async verifyAddToCartSuccess(alertMessage: string) {
        await expect(alertMessage).toContain('Product added');
    }
    
  

 
    async verifyProductDetails() {
       
        await expect(this.productTitle).not.toBeEmpty(); 

        
        await expect(this.productPriceText).toContainText('$');

       
        await expect(this.productDescriptionLink).toBeVisible();
    }
}