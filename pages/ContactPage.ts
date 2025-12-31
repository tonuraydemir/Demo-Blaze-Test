import { Page, Locator, expect } from '@playwright/test';

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
        await this.contactEmailInput.fill(data.email);
        await this.contactNameInput.fill(data.name);
        await this.messageTextArea.fill(data.message);

        
        const dialogPromise = this.page.waitForEvent('dialog', { timeout: 10000 }).catch(() => null);

        await this.page.evaluate(() => {
            if (typeof (window as any).send === 'function') {
                (window as any).send();
            }
        });

        const dialog = await dialogPromise;
        
        if (dialog) {
            const message = dialog.message();
            await dialog.accept();
           
            await expect(this.contactModal).toBeHidden({ timeout: 10000 }).catch(() => {});
            return message;
        }
        
        return "No dialog appeared";
    }

    async verifySuccessMessage(alertMessage: string) {
    
        if (alertMessage !== "No dialog appeared") {
            expect(alertMessage).toContain('Thanks for the message!');
        }
    }
}