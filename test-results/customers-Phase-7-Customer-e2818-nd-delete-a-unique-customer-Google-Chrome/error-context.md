# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: customers.spec.ts >> Phase 7: Customer Management >> should create, read, edit, and delete a unique customer
- Location: tests\customers.spec.ts:21:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/dashboard/
Received string:  "https://rklabs-inventory-mgmt.vercel.app/auth"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    22 × locator resolved to <html lang="en" class="light">…</html>
       - unexpected value "https://rklabs-inventory-mgmt.vercel.app/auth"

```

```yaml
- main:
  - link "RK Labs":
    - /url: /
  - heading "Repair Management System" [level=1]
  - paragraph: Sign in to your shop dashboard.
  - tablist:
    - tab "Sign in" [selected]
    - tab "Create account"
  - tabpanel "Sign in":
    - text: Email
    - textbox "Email"
    - text: Password
    - textbox "Password"
    - button "Sign in"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import * as dotenv from 'dotenv';
  3  | 
  4  | dotenv.config();
  5  | 
  6  | const BASE_URL = process.env.TEST_BASE_URL || 'https://rklabs-inventory-mgmt.vercel.app';
  7  | const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL;
  8  | const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD;
  9  | 
  10 | test.describe('Phase 7: Customer Management', () => {
  11 | 
  12 |   test.beforeEach(async ({ page }) => {
  13 |     // Login before each test
  14 |     await page.goto(`${BASE_URL}/auth`);
  15 |     await page.fill('input[type="email"]', ADMIN_EMAIL!);
  16 |     await page.fill('input[type="password"]', ADMIN_PASSWORD!);
  17 |     await page.click('button[type="submit"]');
> 18 |     await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  19 |   });
  20 | 
  21 |   test('should create, read, edit, and delete a unique customer', async ({ page }) => {
  22 |     const timestamp = Date.now();
  23 |     const customerName = `QA Customer ${timestamp}`;
  24 |     const customerEmail = `qa_${timestamp}@example.com`;
  25 | 
  26 |     // Navigate to Customers
  27 |     await page.goto(`${BASE_URL}/customers`);
  28 |     await expect(page.locator('text=Customers').first()).toBeVisible();
  29 | 
  30 |     // 1. CREATE
  31 |     await page.click('button:has-text("Add Customer")');
  32 |     await expect(page.locator('text=New Customer')).toBeVisible();
  33 |     await page.fill('input[name="name"]', customerName);
  34 |     await page.fill('input[name="email"]', customerEmail);
  35 |     await page.fill('input[name="phone"]', '1234567890');
  36 |     await page.click('button[type="submit"]');
  37 | 
  38 |     // Wait for the modal to close or a success toast
  39 |     await expect(page.locator('text=New Customer')).not.toBeVisible();
  40 |     
  41 |     // 2. READ / SEARCH
  42 |     await page.fill('input[placeholder="Search customers..."]', customerName);
  43 |     // Wait for debounce/search
  44 |     await page.waitForTimeout(1000);
  45 |     const customerRow = page.locator(`tr:has-text("${customerName}")`);
  46 |     await expect(customerRow).toBeVisible();
  47 | 
  48 |     // 3. UPDATE
  49 |     await customerRow.locator('button', { hasText: 'Edit' }).click(); // Assuming an Edit button or action menu exists
  50 |     await expect(page.locator('text=Edit Customer')).toBeVisible();
  51 |     await page.fill('input[name="phone"]', '0987654321');
  52 |     await page.click('button[type="submit"]');
  53 |     
  54 |     await expect(page.locator('text=Edit Customer')).not.toBeVisible();
  55 | 
  56 |     // 4. DELETE
  57 |     // Depending on UI, it might be an action menu -> delete
  58 |     // For this generic QA test, we try to locate a delete button in the row
  59 |     await customerRow.locator('button', { hasText: 'Delete' }).click(); // Assuming a Delete button
  60 |     // Confirm delete if modal exists
  61 |     const confirmButton = page.locator('button:has-text("Confirm"), button:has-text("Delete")');
  62 |     if (await confirmButton.isVisible()) {
  63 |         await confirmButton.click();
  64 |     }
  65 | 
  66 |     // Verify deletion
  67 |     await page.fill('input[placeholder="Search customers..."]', customerName);
  68 |     await page.waitForTimeout(1000);
  69 |     await expect(page.locator(`text=${customerName}`)).not.toBeVisible();
  70 |   });
  71 | 
  72 | });
  73 | 
```