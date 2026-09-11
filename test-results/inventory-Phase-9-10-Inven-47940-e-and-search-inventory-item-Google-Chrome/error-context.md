# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.ts >> Phase 9 & 10: Inventory and Transactions >> should create, update, and search inventory item
- Location: tests\inventory.spec.ts:20:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/dashboard/
Received string:  "https://rklabs-inventory-mgmt.vercel.app/auth"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    23 × locator resolved to <html lang="en" class="light">…</html>
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
  10 | test.describe('Phase 9 & 10: Inventory and Transactions', () => {
  11 | 
  12 |   test.beforeEach(async ({ page }) => {    
  13 |     await page.goto(`${BASE_URL}/auth`);
  14 |     await page.fill('input[type="email"]', ADMIN_EMAIL!);
  15 |     await page.fill('input[type="password"]', ADMIN_PASSWORD!);
  16 |     await page.click('button[type="submit"]');
> 17 |     await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  18 |   });
  19 | 
  20 |   test('should create, update, and search inventory item', async ({ page }) => {
  21 |     const timestamp = Date.now();
  22 |     const productName = `QA Product ${timestamp}`;
  23 |     const productSku = `SKU-QA-${timestamp}`;
  24 | 
  25 |     await page.goto(`${BASE_URL}/inventory`);
  26 |     await expect(page.locator('text=Inventory').first()).toBeVisible();
  27 | 
  28 |     // 1. CREATE
  29 |     await page.click('button:has-text("Add Item"), button:has-text("Add Product")'); // UI dependent
  30 |     
  31 |     // Check if modal appears
  32 |     await page.waitForTimeout(1000);
  33 |     
  34 |     const nameInput = page.locator('input[name="name"]');
  35 |     if (await nameInput.isVisible()) {
  36 |         await nameInput.fill(productName);
  37 |         await page.fill('input[name="sku"]', productSku);
  38 |         await page.fill('input[name="quantity"], input[name="stock"]', '10');
  39 |         await page.fill('input[name="price"]', '99.99');
  40 |         await page.click('button[type="submit"]');
  41 |         
  42 |         // Wait for modal to close
  43 |         await expect(nameInput).not.toBeVisible();
  44 |     } else {
  45 |         console.log("Could not find Add Item modal inputs. UI might differ.");
  46 |         return;
  47 |     }
  48 | 
  49 |     // 2. SEARCH
  50 |     await page.fill('input[placeholder="Search..."], input[placeholder="Search inventory..."]', productSku);
  51 |     await page.waitForTimeout(1000);
  52 |     
  53 |     const productRow = page.locator(`tr:has-text("${productSku}")`);
  54 |     await expect(productRow).toBeVisible();
  55 | 
  56 |     // Verify quantity is 10
  57 |     await expect(productRow.locator('text=10').first()).toBeVisible();
  58 |   });
  59 | });
  60 | 
```