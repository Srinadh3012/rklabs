import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TEST_BASE_URL || 'https://rklabs-inventory-mgmt.vercel.app';
const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD;

test.describe('Phase 7: Customer Management', () => {

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto(`${BASE_URL}/auth`);
    await page.fill('input[type="email"]', ADMIN_EMAIL!);
    await page.fill('input[type="password"]', ADMIN_PASSWORD!);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
  });

  test('should create, read, edit, and delete a unique customer', async ({ page }) => {
    const timestamp = Date.now();
    const customerName = `QA Customer ${timestamp}`;
    const customerEmail = `qa_${timestamp}@example.com`;

    // Navigate to Customers
    await page.goto(`${BASE_URL}/customers`);
    await expect(page.locator('text=Customers').first()).toBeVisible();

    // 1. CREATE
    await page.click('button:has-text("Add Customer")');
    await expect(page.locator('text=New Customer')).toBeVisible();
    await page.fill('input[name="name"]', customerName);
    await page.fill('input[name="email"]', customerEmail);
    await page.fill('input[name="phone"]', '1234567890');
    await page.click('button[type="submit"]');

    // Wait for the modal to close or a success toast
    await expect(page.locator('text=New Customer')).not.toBeVisible();
    
    // 2. READ / SEARCH
    await page.fill('input[placeholder="Search customers..."]', customerName);
    // Wait for debounce/search
    await page.waitForTimeout(1000);
    const customerRow = page.locator(`tr:has-text("${customerName}")`);
    await expect(customerRow).toBeVisible();

    // 3. UPDATE
    await customerRow.locator('button', { hasText: 'Edit' }).click(); // Assuming an Edit button or action menu exists
    await expect(page.locator('text=Edit Customer')).toBeVisible();
    await page.fill('input[name="phone"]', '0987654321');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Edit Customer')).not.toBeVisible();

    // 4. DELETE
    // Depending on UI, it might be an action menu -> delete
    // For this generic QA test, we try to locate a delete button in the row
    await customerRow.locator('button', { hasText: 'Delete' }).click(); // Assuming a Delete button
    // Confirm delete if modal exists
    const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Delete")');
    if (await confirmButton.isVisible()) {
        await confirmButton.click();
    }

    // Verify deletion
    await page.fill('input[placeholder="Search customers..."]', customerName);
    await page.waitForTimeout(1000);
    await expect(page.locator(`text=${customerName}`)).not.toBeVisible();
  });

});
