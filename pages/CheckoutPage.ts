import { Page, Locator, expect } from '@playwright/test';


export class CheckoutPage {
    readonly page: Page;

  
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly creditCardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;
    readonly successConfirmation: Locator; 

    constructor(page: Page) {
        this.page = page;
        
       
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.creditCardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.locator('button:has-text("Purchase")');
      
        this.successConfirmation = page.locator('.sweet-alert h2:has-text("Thank you for your purchase!")'); 
    }
    
    
    
 
    async fillPaymentDetails(data: { name: string, country: string, city: string, card: string, month: string, year: string }) {
        await this.nameInput.fill(data.name);
        await this.countryInput.fill(data.country);
        await this.cityInput.fill(data.city);
        await this.creditCardInput.fill(data.card);
        await this.monthInput.fill(data.month);
        await this.yearInput.fill(data.year);
    }

 
    async completePurchase() {
        await this.purchaseButton.click();
    }

   
    async verifyPurchaseSuccess() {
     
        await expect(this.successConfirmation).toBeVisible(); 
        
       
        const okButton = this.page.locator('button:has-text("OK")');
        await okButton.click();
        await expect(this.successConfirmation).toBeHidden();
    }
}