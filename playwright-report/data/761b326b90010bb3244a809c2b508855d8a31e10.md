# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tracking.spec.ts >> Phase 13 & 14: Tracking ID (P0) >> should generate a tracking ID and be trackable publicly without login
- Location: tests\tracking.spec.ts:12:3

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
  10 | test.describe('Phase 13 & 14: Tracking ID (P0)', () => {
  11 | 
  12 |   test('should generate a tracking ID and be trackable publicly without login', async ({ page, context }) => {
  13 | 
  14 |     // 1. LOGIN as admin
  15 |     await page.goto(`${BASE_URL}/auth`);
  16 |     await page.fill('input[type="email"]', ADMIN_EMAIL!);
  17 |     await page.fill('input[type="password"]', ADMIN_PASSWORD!);
  18 |     await page.click('button[type="submit"]');
> 19 |     await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  20 | 
  21 |     // 2. CREATE A REPAIR
  22 |     const timestamp = Date.now();
  23 |     await page.goto(`${BASE_URL}/repairs`);
  24 |     await page.click('button:has-text("Add Repair"), button:has-text("New Repair")');
  25 |     
  26 |     // Fill out generic repair info
  27 |     await page.waitForTimeout(1000);
  28 |     const deviceInput = page.locator('input[name="device"], input[name="product"]');
  29 |     if (await deviceInput.isVisible()) {
  30 |         await deviceInput.fill(`QA Device ${timestamp}`);
  31 |         await page.fill('textarea[name="issue"], input[name="issue"]', `Screen broken ${timestamp}`);
  32 |         await page.click('button[type="submit"]');
  33 |     } else {
  34 |         console.log("Could not find repair modal.");
  35 |         return; // UI might differ
  36 |     }
  37 | 
  38 |     // 3. CAPTURE TRACKING ID
  39 |     // Look for the newly created repair. Often tracking IDs start with something specific or are in the table.
  40 |     await page.waitForTimeout(2000); // Wait for table to reload
  41 |     
  42 |     // Attempt to extract the first row's tracking ID (assuming it's sorted by newest)
  43 |     const trackingIdElement = page.locator('tr').nth(1).locator('td').nth(0); // This is highly dependent on UI table layout.
  44 |     const trackingId = await trackingIdElement.innerText();
  45 |     
  46 |     if (!trackingId || trackingId.length < 5) {
  47 |         console.log("Could not accurately capture tracking ID from table.");
  48 |         return;
  49 |     }
  50 |     console.log(`Captured Tracking ID: ${trackingId}`);
  51 | 
  52 |     // 4. LOGOUT & TEST PUBLIC TRACKING
  53 |     const publicPage = await context.newPage();
  54 |     await publicPage.goto(`${BASE_URL}/track`);
  55 |     
  56 |     // Wait for the tracking input
  57 |     await expect(publicPage.locator('text=Track Your Repair').first()).toBeVisible();
  58 |     await publicPage.fill('input[placeholder*="tracking"], input[name="ticket"]', trackingId);
  59 |     await publicPage.click('button[type="submit"]');
  60 | 
  61 |     // 5. VERIFY PUBLIC RESULTS
  62 |     // It should display the repair status, and NOT sensitive data
  63 |     await expect(publicPage.locator(`text=${trackingId}`).first()).toBeVisible();
  64 |     await expect(publicPage.locator(`text=Screen broken ${timestamp}`).first()).toBeVisible();
  65 | 
  66 |     // Verify it handles invalid tracking IDs
  67 |     await publicPage.fill('input[placeholder*="tracking"], input[name="ticket"]', 'INVALID-12345');
  68 |     await publicPage.click('button[type="submit"]');
  69 |     await expect(publicPage.locator('text=not found').first()).toBeVisible();
  70 | 
  71 |     await publicPage.close();
  72 |   });
  73 | });
  74 | 
```