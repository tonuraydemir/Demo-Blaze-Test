import { Page, Locator, expect } from '@playwright/test';

/**
 * ProductPage sınıfı, Demoblaze'de ürün seçimi ve sepete ekleme işlemlerini yönetir.
 */
export class ProductPage {
    readonly page: Page;

    // --- LOCATOR'LAR --- 
    readonly firstProductLink: Locator; 
    readonly productTitle: Locator;
    readonly addToCartButton: Locator;
    readonly productPriceText: Locator; 
    readonly productDescriptionLink: Locator; 
    
    constructor(page: Page) {
        this.page = page;
        
        // Demoblaze locator'ları
        this.firstProductLink = page.locator('.card-title a').first();
        this.productTitle = page.locator('.name');
        this.addToCartButton = page.locator('a:has-text("Add to cart")'); 
        
        // F6 için LOCATOR TANIMLARI
        this.productPriceText = page.locator('.price-container'); 
        this.productDescriptionLink = page.locator('#myTabContent'); 
    }
    
    // --- METOTLAR ---
    
    /**
     * Ana sayfadan ilk ürüne tıklar ve ürün detay sayfasına gider.
     * KRİTİK: Fiyat elemanının görünür olmasını bekleyerek sayfanın tamamen yüklendiğini garanti eder.
     */
    async selectFirstProduct() {
        await this.firstProductLink.click();
        
        // SADECE BURADA BEKLEME YAPILIR: Fiyat elemanının yüklenmesini bekleyerek 
        // sayfanın kullanıma hazır olduğunu garanti ediyoruz.
        await expect(this.productPriceText).toBeVisible({ timeout: 10000 });
        await expect(this.productTitle).toBeVisible(); 
    }
    
    /**
     * Ürünü sepete ekleme işlemini yapar ve alert (uyarı) mesajını kontrol eder.
     */
    async addToCart(): Promise<string> {
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.addToCartButton.click()
        ]);

        const message = alert.message();
        await alert.accept(); 
        return message;
    }

    /**
     * Sepete ekleme işleminin başarılı olduğunu doğrular.
     */
    async verifyAddToCartSuccess(alertMessage: string) {
        await expect(alertMessage).toContain('Product added');
    }
    
    // --- YENİ METOT (F6 Functional Testi için) ---

    /**
     * Ürün detay sayfasındaki fiyat ve açıklama gibi ana bilgileri doğrular.
     * NOT: Bekleme işlemi 'selectFirstProduct' metodunda yapıldığı için burada sadece doğrulama yapılır.
     */
    async verifyProductDetails() {
        // Assertion 1: Ürün başlığının boş olmadığını kontrol et
        await expect(this.productTitle).not.toBeEmpty(); 

        // Assertion 2: Fiyat bilgisinin ekranda olduğunu ve dolar ($) işaretini içerdiğini kontrol et
        // toBeVisible kontrolü selectFirstProduct'ta yapıldığı için burası stabil çalışmalıdır.
        await expect(this.productPriceText).toContainText('$');

        // Assertion 3: Ürün açıklama/detay alanının ekranda göründüğünü kontrol et
        await expect(this.productDescriptionLink).toBeVisible();
    }
}