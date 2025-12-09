import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    // --- LOCATOR'LAR --- 
    readonly productCards: Locator; 
    readonly categoryLinksContainer: Locator; 
    readonly logoLink: Locator; // F10 için eklendi

    constructor(page: Page) {
        this.page = page;
        
        // Ürünler ve Kategoriler
        this.productCards = page.locator('.card-title'); 
        this.categoryLinksContainer = page.locator('#itemc'); 
        
        // Logo Linki (PRODUCT STORE yazısı)
        this.logoLink = page.locator('#nava'); 
    }
    
    // --- METOTLAR ---
    
    async goto() {
        await this.page.goto('/');
        // Ürün kartlarının yüklenmesini bekleyerek sayfanın yüklendiğini kontrol et
        await expect(this.productCards.first()).toBeVisible();
    }

    /**
     * Kategoriye göre filtreleme işlemini gerçekleştirir (S5 & F9 için).
     */
    async search(query: string) {
        const categoryLink = this.page.locator('a').filter({ hasText: query });
        await categoryLink.click();
        
        // Filtreleme sonrası DOM'un güncellenmesini bekle
        await this.page.waitForLoadState('domcontentloaded'); 
    }

    /**
     * Logo linkine tıklayarak ana sayfaya döner (F10 için).
     */
    async clickLogo() {
        await this.logoLink.click();
        // Logoya tıklandıktan sonra sayfanın yeniden yüklenmesini bekle
        await this.page.waitForLoadState('domcontentloaded'); 
        
        // Ana sayfaya dönüldüğünü doğrula (Ürün kartlarını kontrol ederek)
        await expect(this.productCards.first()).toBeVisible();
    }
}