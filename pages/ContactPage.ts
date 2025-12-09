import { Page, Locator, expect } from '@playwright/test';

/**
 * ContactPage sınıfı, Demoblaze'deki Contact modalını yönetir.
 */
export class ContactPage {
    readonly page: Page;

    // --- LOCATOR'LAR --- 
    readonly contactLink: Locator;
    readonly contactEmailInput: Locator;
    readonly contactNameInput: Locator;
    readonly messageTextArea: Locator;
    readonly sendMessageButton: Locator;
    readonly modalTitle: Locator;
    readonly contactModal: Locator;
    readonly closeButton: Locator; // F3 Kapatma için eklendi

    constructor(page: Page) {
        this.page = page;
        
        // Contact Modal Locator'ları
        this.contactLink = page.locator('a:has-text("Contact")');
        this.contactEmailInput = page.locator('#recipient-email');
        this.contactNameInput = page.locator('#recipient-name');
        this.messageTextArea = page.locator('#message-text');
        this.sendMessageButton = page.locator('button:has-text("Send message")');
        this.modalTitle = page.locator('#exampleModalLabel:has-text("New message")');
        this.contactModal = page.locator('#exampleModal');
        // Modalın içindeki ilk Close butonu (Modal Locator'ı ile sınırlandırdık)
        this.closeButton = page.locator('#exampleModal button:has-text("Close")'); 
    }
    
    // --- METODLAR ---
    
    /**
     * Contact modalını açar ve başlığın görünür olduğunu doğrular.
     */
    async openContactModal() {
        await this.contactLink.click();
        await expect(this.modalTitle).toBeVisible(); 
    }

    /**
     * Contact modalını Close butonu ile kapatır (F3 Testi için kullanılır).
     */
    async closeContactModal() {
        await this.closeButton.click();
        await expect(this.contactModal).toBeHidden(); 
    }

    /**
     * İletişim formunu doldurur ve gönderir.
     * @returns Gönderme sonrası gelen alert mesajının içeriği.
     */
    async sendMessage(data: { email: string, name: string, message: string }): Promise<string> {
        await this.contactEmailInput.fill(data.email);
        await this.contactNameInput.fill(data.name);
        await this.messageTextArea.fill(data.message);
        
        // NİHAİ ÇÖZÜM: Alert'i yakalamak için Promise.all kullanıyoruz (Daha güvenilir).
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'), 
            this.sendMessageButton.click()
        ]); 

        const message = alert.message();
        
        // Alert yakalandığı anda hemen kabul et
        await alert.accept();
        
        // Ekstra Güvenlik: Alert kapatıldıktan sonra modalın kaybolmasını bekle
        await expect(this.contactModal).toBeHidden(); 
        
        return message;
    }

    /**
     * Başarı mesajını doğrular.
     */
    async verifySuccessMessage(alertMessage: string) {
        await expect(alertMessage).toContain('Thanks for the message!');
    }
}