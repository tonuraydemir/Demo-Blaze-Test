import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage.js'; 

const CONTACT_DATA = {
    email: `test_contact_${Date.now()}@testmail.com`,
    name: 'Functional Tester',
    message: 'This is a functional test message for contact form verification.'
};

test.describe('F7: Contact Form Tests (Functional Test)', () => {

    test('User can successfully submit the contact form', async ({ page }) => {
        const contactPage = new ContactPage(page);

        // 1. Ana sayfaya git
        await page.goto('/');

        // 2. İletişim modalını aç
        await contactPage.openContactModal();

        // 3. Formu doldur ve alert mesajını yakala
        const alertMessage = await contactPage.sendMessage(CONTACT_DATA);
        
        // 4. Doğrulama (Assertion)
        await contactPage.verifySuccessMessage(alertMessage);
        
        console.log(`✅ F7 Completed: Contact form submission verified.`);
    });
});