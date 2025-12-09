import { Page, Locator, expect } from '@playwright/test';

/**
 * RegisterPage sınıfı, Demoblaze sitesindeki kullanıcı kayıt (Sign up) işlemlerini yönetir.
 */
export class RegisterPage {
    readonly page: Page;
    // --- LOCATOR'LAR --- 
    readonly signupLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signupButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        
        // Demoblaze Kayıt Modal Locator'ları
        this.signupLink = page.locator('#signin2'); 
        this.usernameInput = page.locator('#sign-username');
        this.passwordInput = page.locator('#sign-password');
        this.signupButton = page.locator('button').filter({ hasText: 'Sign up' });
    }
    
    // --- METODLAR ---

    async goto() {
        await this.page.goto('/');
        await this.signupLink.click();
        await expect(this.usernameInput).toBeVisible(); 
    }

    /**
     * Yeni bir kullanıcı kaydı işlemini gerçekleştirir (F1).
     * @returns Alert mesajının içeriği.
     */
    async register(userData: { username: string, password: string }): Promise<string> {
        await this.usernameInput.fill(userData.username);
        // KRİTİK DÜZELTME: Alan doldurma sonrası bekleme (Firefox için stabilite)
        await this.page.waitForTimeout(100); 
        
        await this.passwordInput.fill(userData.password);
        await this.page.waitForTimeout(100); // Şifre için de bekle
        
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'), 
            this.signupButton.click() 
        ]);
        
        const message = alert.message();
        await alert.accept(); 
        return message;
    }

    /**
     * Kayıt işleminin başarılı olduğunu, alert mesajını kontrol ederek doğrular.
     */
    async registrationIsSuccessful(alertMessage: string) {
        expect(alertMessage).toContain('Sign up successful.');
    }
    
    /**
     * Negatif kayıt dener (F4).
     * @returns Hata sonrası gelen Alert mesajının içeriği.
     */
    async registerNegative(userData: { username: string, password: string }): Promise<string> {
        await this.usernameInput.fill(userData.username);
        await this.page.waitForTimeout(100); // Firefox stabilizasyonu
        
        await this.passwordInput.fill(userData.password);
        await this.page.waitForTimeout(100); // Firefox stabilizasyonu
        
        const [alert] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.signupButton.click()
        ]);

        const message = alert.message();
        await alert.accept();
        
        // Başarısız kayıt sonrası modalın AÇIK KALMASINI bekleriz.
        await expect(this.signupButton).toBeVisible(); 
        
        return message;
    }
    
    // F14 Testi (Nihai DOM Kontrolü) için checkRequiredField kaldırıldı.
}