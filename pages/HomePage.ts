import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    readonly productCards: Locator; 
    readonly categoryLinksContainer: Locator; 
    readonly logoLink: Locator; 

    constructor(page: Page) {
        this.page = page;
        
        this.productCards = page.locator('.card-title'); 
        this.categoryLinksContainer = page.locator('#itemc'); 
        
        
        this.logoLink = page.locator('#nava'); 
    }
    

    
    async goto() {
        await this.page.goto('/');
        
        await expect(this.productCards.first()).toBeVisible();
    }

    
    async search(query: string) {
        const categoryLink = this.page.locator('a').filter({ hasText: query });
        await categoryLink.click();
        
  
        await this.page.waitForLoadState('domcontentloaded'); 
    }

  
    async clickLogo() {
        await this.logoLink.click();
     
        await this.page.waitForLoadState('domcontentloaded'); 
        
       
        await expect(this.productCards.first()).toBeVisible();
    }
}