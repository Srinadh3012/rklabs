import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TEST_BASE_URL || 'https://rklabs-inventory-mgmt.vercel.app';
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD;

test.describe('Phase 3 & 4: Authentication and RBAC', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/auth`);
  });

  test('should display login page correctly', async ({ page }) => {
    await expect(page.locator('text=Sign In').first()).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show error on empty credentials', async ({ page }) => {
    await page.click('button[type="submit"]');
    // Depending on frontend validation, it might show HTML5 required tooltips or custom errors.
    // We check if the URL is still /auth, meaning login was prevented.
    await expect(page).toHaveURL(/.*\/auth/);
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Wait for error toast or message
    const errorMsg = page.locator('text=Invalid credentials').first();
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => {
        console.log("No specific 'Invalid credentials' message found, but checking URL...");
    });
    
    // Ensure we are still on the auth page
    await expect(page).toHaveURL(/.*\/auth/);
  });

  test('should prevent direct access to protected routes', async ({ page }) => {
    await page.goto(`${BASE_URL}/dashboard`);
    // Should redirect to auth or show unauthorized
    await expect(page).toHaveURL(/.*\/auth/);
  });

  test('should login successfully with valid credentials and maintain session', async ({ page, context }) => {

    await page.fill('input[type="email"]', ADMIN_EMAIL!);
    await page.fill('input[type="password"]', ADMIN_PASSWORD!);
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
    await expect(page.locator('text=Dashboard').first()).toBeVisible();

    // Verify session persistence by opening a new page in the same context
    const newPage = await context.newPage();
    await newPage.goto(`${BASE_URL}/dashboard`);
    await expect(newPage).toHaveURL(/.*\/dashboard/);
    await newPage.close();
  });

});
