import { test, expect } from '@playwright/test';

test('keystatic admin dashboard loads without renderer errors', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  const response = await page.goto('/keystatic');
  
  // Expect NO Astro error overlay
  await expect(page.locator('text=NoMatchingRenderer')).toHaveCount(0);
  await expect(page.locator('text=No matching renderer found')).toHaveCount(0);
  
  // Ensure the page didn't throw a 500 error from Vite
  expect(response?.status()).toBe(200);
});
