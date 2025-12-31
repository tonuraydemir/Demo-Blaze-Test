import { Page, Locator, expect } from '@playwright/test';

/**
 * ContactPage sınıfı, Product Store üzerindeki iletişim modalını yönetir.
 */
export class ContactPage {
    readonly page: Page;
    readonly contactLink: Locator;
    readonly contactEmailInput: Locator;
    readonly contactNameInput: Locator;
    readonly messageTextArea: Locator;
    readonly sendMessageButton: Locator;
    readonly contactModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactLink = page.locator('a:has-text("Contact")');
        this.contactEmailInput = page.locator('#recipient-email');
        this.contactNameInput = page.locator('#recipient-name');
        this.messageTextArea = page.locator('#message-text');
        this.sendMessageButton = page.locator('button:has-text("Send message")');
        this.contactModal = page.locator('#exampleModal');
    }

    async openContactModal() {
        await this.contactLink.click();
        await expect(this.page.locator('#exampleModalLabel')).toBeVisible({ timeout: 10000 });
    }

    async sendMessage(data: { email: string, name: string, message: string }): Promise<string> {
        // Form alanlarını doldur
        await this.contactEmailInput.fill(data.email);
        await this.contactNameInput.fill(data.name);
        await this.messageTextArea.fill(data.message);

        // 1. Alert (Dialog) yakalayıcıyı kur
        const dialogPromise = this.page.waitForEvent('dialog');

        // 2. Tıklama kilitlenmesini aşmak için JavaScript tetiklemesi kullan
        await this.page.evaluate(() => {
            if (typeof (window as any).send === 'function') {
                (window as any).send();
            }
        });

        // 3. Alert'i bekle, mesajı al ve onayla
        const dialog = await dialogPromise;
        const message = dialog.message();
        await dialog.accept();

        // 4. Modalın kapandığını doğrula
        await expect(this.contactModal).toBeHidden({ timeout: 10000 });

        return message;
    }

    async verifySuccessMessage(alertMessage: string) {
        expect(alertMessage).toContain('Thanks for the message!');
    }
}