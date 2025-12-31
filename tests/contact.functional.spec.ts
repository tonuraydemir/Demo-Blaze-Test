import { test, expect } from '@playwright/test';



test.describe('F7: About Us Content & Modal Tests', () => {

    test('F7: User can access the video modal and verify its content', async ({ page }) => {
   
        await page.goto('/');

 
        await page.getByRole('link', { name: 'About us' }).click();

     
        const videoModal = page.locator('#videoModal');
        await expect(videoModal).toBeVisible({ timeout: 10000 });

    
        const modalTitle = page.locator('#videoModalLabel');
        await expect(modalTitle).toHaveText('About us');

        
        const videoPlayer = page.locator('video.vjs-tech');
        await expect(videoPlayer).toBeAttached(); 
        await expect(videoPlayer).toBeVisible();  

   
        const closeButton = page.locator('#videoModal .modal-footer button:has-text("Close")');
        await closeButton.click();

     
        await expect(videoModal).toBeHidden();

        console.log(`✅ F7 Completed: Video modal and content verified successfully.`);
    });
});