import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Konfigürasyonu
 */
export default defineConfig({
  testDir: './tests',
  
  /* Test dosyalarını paralel koşturur */
  fullyParallel: true,

  // Test başına genel zaman aşımı (90 saniye - Karmaşık testler için ideal)
  timeout: 90 * 1000, 
  
  expect: {
    // Assert'lerin (expect) eleman bekleme süresi (10 saniye - Yavaş render olan modal'lar için)
    timeout: 10000, 
  },
  
  forbidOnly: !!process.env.CI,

  /* * KRİTİK DÜZELTME: Kararsızlığı (Flakiness) önlemek için.
   * Yerel ortamda bile bir test hata verirse 1 kez daha dener.
   */
  retries: process.env.CI ? 2 : 1,

  /* * İşçi (Worker) sayısı: Aynı anda kaç tarayıcı penceresi açılacak?
   * CI ortamında 1, yerel ortamda ise bilgisayarının gücüne göre otomatik ayarlanır.
   */
  workers: process.env.CI ? 1 : undefined,

  /* Raporlama formatı: 'html' raporu detaylı analiz sağlar. */
  reporter: 'html',
  
  use: {
    // Temel URL
    baseURL: 'https://www.demoblaze.com/', 

    // Tıklama, doldurma gibi aksiyonlar için bekleme süresi
    actionTimeout: 15 * 1000, // 30 saniye çok uzun, 15 saniye idealdir.
    
    // Sayfa navigasyonu (goto) bekleme süresi
    navigationTimeout: 30 * 1000,

    /* Hata durumunda analiz için izleme (Trace) kaydı tutar */
    trace: 'on-first-retry',

    // Ekran görüntüsü ayarı: Sadece hata aldığında ekran görüntüsü al
    screenshot: 'only-on-failure',
  },

  /* Tarayıcı konfigürasyonları */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});