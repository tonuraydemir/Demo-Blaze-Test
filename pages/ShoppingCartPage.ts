import { Page, Locator, expect } from '@playwright/test';

/**
 * ShoppingCartPage sınıfı, Demoblaze'de Sepet (Cart) sayfasındaki işlemleri yönetir.
 */
export class ShoppingCartPage {
    readonly page: Page;

    // --- LOCATOR'LAR --- 
    readonly cartLink: Locator;
    readonly placeOrderButton: Locator;
    readonly productInCart: Locator;
    readonly totalValue: Locator; 

    constructor(page: Page) {
        this.page = page;
        
        // Demoblaze locator'ları
        this.cartLink = page.locator('#cartur'); // Ana menüdeki Cart linki
        this.placeOrderButton = page.locator('button:has-text("Place Order")');
        // Sepetteki ilk ürünün adı
        this.productInCart = page.locator('.success > td:nth-child(2)'); 
        // Tablodaki toplam tutar hücresi
        this.totalValue = page.locator('h3#totalm'); 
    }
    
    // --- METODLAR ---
    
    /**
     * Sepet sayfasına gider.
     */
    async goto() {
        // KRİTİK DÜZELTME: Tıklamadan önce sayfanın ana içeriğinin yüklendiğini garanti edelim.
        // Bu, F12 testindeki 30 saniyelik tıklama zaman aşımını çözer.
        await this.page.goto('/');
        await this.page.waitForLoadState('domcontentloaded');

        // Sepet linkine tıklanabilirliği bekle ve tıkla
        await expect(this.cartLink).toBeEnabled();
        await this.cartLink.click();
        
        // Navigasyon sonrası bekleme
        await this.page.waitForLoadState('domcontentloaded');
        // Başlık kontrolü (Case-insensitive)
        await expect(this.page).toHaveTitle(/Store/i); 
    }

    /**
     * Ürünün sepette listelendiğini doğrular.
     */
    async verifyProductInCart(expectedProductName: string) {
        await expect(this.productInCart).toBeVisible();
        await expect(this.productInCart).toHaveText(expectedProductName); 
    }

    /**
     * "Place Order" butonuna tıklayarak ödeme modalını açar.
     */
    async startCheckout() {
        await this.placeOrderButton.click();
        // Ödeme formunun açıldığını kontrol et
        await expect(this.page.locator('#name')).toBeVisible(); 
    }
    
    /**
     * Sepetten ilk ürünü siler (F5 Functional Testi için).
     */
    async deleteFirstProduct() {
        const deleteLink = this.page.locator('.success a:has-text("Delete")').first();
        
        await deleteLink.click();
        
        // Silme işlemi sonrası DOM'un güncellenmesi için bekleme (Zorunlu bekleme)
        await this.page.waitForTimeout(1000); 
    }

    /**
     * Sepette ürün kalmadığını doğrular (F5 Functional Testi için).
     */
    async verifyCartIsEmpty() {
        const productRow = this.page.locator('.success');
        
        // Assertion: Sepet boşsa, ürün satırının DOM'da bulunmadığını doğrula.
        await expect(productRow).toHaveCount(0, { timeout: 5000 });
    }
}