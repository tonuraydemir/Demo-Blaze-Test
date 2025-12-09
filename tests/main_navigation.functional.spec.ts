// /tests/main_navigation.functional.spec.ts dosyasında F10 test bloğu

test('F10: User remains logged in after navigating via logo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    const username = TEST_USER.username;

    // 1. ÖN KOŞUL: Başarılı bir şekilde giriş yap
    await loginPage.goto();
    await loginPage.login(username, TEST_USER.password);
    
    // KRİTİK EKLEME 1: Login sonrası 1 saniye bekle (DOM güncelleme süresi)
    await page.waitForTimeout(1000); 
    
    await loginPage.isLoggedIn(username); // Giriş başarılı olduğunu kontrol et

    // 2. Aksiyon: Logoya tıkla ve ana sayfayı yeniden yükle
    await homePage.clickLogo();
    
    // KRİTİK EKLEME 2: Logo navigasyonu sonrası 1 saniye bekle
    await page.waitForTimeout(1000); 

    // 3. Doğrulama (Assertion): Oturumun devam ettiğini kontrol et
    await loginPage.isLoggedIn(username); 

    console.log(`✅ F10 Completed: Logo navigation and session persistence verified.`);
});