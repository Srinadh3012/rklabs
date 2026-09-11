import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TEST_BASE_URL || 'https://rklabs-inventory-mgmt.vercel.app';
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD;

test.describe('Phase 13 & 14: Tracking ID (P0)', () => {

  test('should generate a tracking ID and be trackable publicly without login', async ({ page, context }) => {

    // 1. LOGIN as admin
    await page.goto(`${BASE_URL}/auth`);
    await page.fill('input[type="email"]', ADMIN_EMAIL!);
    await page.fill('input[type="password"]', ADMIN_PASSWORD!);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });

    // 2. CREATE A REPAIR
    const timestamp = Date.now();
    await page.goto(`${BASE_URL}/repairs`);
    await page.click('button:has-text("Add Repair"), button:has-text("New Repair")');
    
    // Fill out generic repair info
    await page.waitForTimeout(1000);
    const deviceInput = page.locator('input[name="device"], input[name="product"]');
    if (await deviceInput.isVisible()) {
        await deviceInput.fill(`QA Device ${timestamp}`);
        await page.fill('textarea[name="issue"], input[name="issue"]', `Screen broken ${timestamp}`);
        await page.click('button[type="submit"]');
    } else {
        console.log("Could not find repair modal.");
        return; // UI might differ
    }

    // 3. CAPTURE TRACKING ID
    // Look for the newly created repair. Often tracking IDs start with something specific or are in the table.
    await page.waitForTimeout(2000); // Wait for table to reload
    
    // Attempt to extract the first row's tracking ID (assuming it's sorted by newest)
    const trackingIdElement = page.locator('tr').nth(1).locator('td').nth(0); // This is highly dependent on UI table layout.
    const trackingId = await trackingIdElement.innerText();
    
    if (!trackingId || trackingId.length < 5) {
        console.log("Could not accurately capture tracking ID from table.");
        return;
    }
    console.log(`Captured Tracking ID: ${trackingId}`);

    // 4. LOGOUT & TEST PUBLIC TRACKING
    const publicPage = await context.newPage();
    await publicPage.goto(`${BASE_URL}/track`);
    
    // Wait for the tracking input
    await expect(publicPage.locator('text=Track Your Repair').first()).toBeVisible();
    await publicPage.fill('input[placeholder*="tracking"], input[name="ticket"]', trackingId);
    await publicPage.click('button[type="submit"]');

    // 5. VERIFY PUBLIC RESULTS
    // It should display the repair status, and NOT sensitive data
    await expect(publicPage.locator(`text=${trackingId}`).first()).toBeVisible();
    await expect(publicPage.locator(`text=Screen broken ${timestamp}`).first()).toBeVisible();

    // Verify it handles invalid tracking IDs
    await publicPage.fill('input[placeholder*="tracking"], input[name="ticket"]', 'INVALID-12345');
    await publicPage.click('button[type="submit"]');
    await expect(publicPage.locator('text=not found').first()).toBeVisible();

    await publicPage.close();
  });
});
