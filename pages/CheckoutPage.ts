import { Page, Locator, expect } from '@playwright/test';

/**
 * CheckoutPage sınıfı, Demoblaze'deki Place Order modalı ve ödeme işlemini yönetir.
 */
export class CheckoutPage {
    readonly page: Page;

    // --- LOCATOR'LAR --- 
    // Place Order Modalındaki Alanlar
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly creditCardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;
    readonly successConfirmation: Locator; // Başarılı sipariş sonrası çıkan modal

    constructor(page: Page) {
        this.page = page;
        
        // Place Order Formu Locator'ları
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.creditCardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.locator('button:has-text("Purchase")');
        // Başarılı ödeme sonrası çıkan modal
        this.successConfirmation = page.locator('.sweet-alert h2:has-text("Thank you for your purchase!")'); 
    }
    
    // --- METODLAR ---
    
    /**
     * Ödeme formunu geçerli verilerle doldurur.
     */
    async fillPaymentDetails(data: { name: string, country: string, city: string, card: string, month: string, year: string }) {
        await this.nameInput.fill(data.name);
        await this.countryInput.fill(data.country);
        await this.cityInput.fill(data.city);
        await this.creditCardInput.fill(data.card);
        await this.monthInput.fill(data.month);
        await this.yearInput.fill(data.year);
    }

    /**
     * Satın alma işlemini tamamlar.
     */
    async completePurchase() {
        await this.purchaseButton.click();
    }

    /**
     * Siparişin başarılı olduğunu doğrular.
     */
    async verifyPurchaseSuccess() {
        // Başarı modalının göründüğünü doğrular
        await expect(this.successConfirmation).toBeVisible(); 
        
        // Modal üzerindeki OK butonuna tıkla ve modalın kaybolmasını bekle
        const okButton = this.page.locator('button:has-text("OK")');
        await okButton.click();
        await expect(this.successConfirmation).toBeHidden();
    }
}