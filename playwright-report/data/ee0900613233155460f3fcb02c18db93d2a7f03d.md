# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Phase 3 & 4: Authentication and RBAC >> should login successfully with valid credentials and maintain session
- Location: tests\auth.spec.ts:50:3

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
  10 | test.describe('Phase 3 & 4: Authentication and RBAC', () => {
  11 | 
  12 |   test.beforeEach(async ({ page }) => {
  13 |     await page.goto(`${BASE_URL}/auth`);
  14 |   });
  15 | 
  16 |   test('should display login page correctly', async ({ page }) => {
  17 |     await expect(page.locator('text=Sign In').first()).toBeVisible();
  18 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  19 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  20 |   });
  21 | 
  22 |   test('should show error on empty credentials', async ({ page }) => {
  23 |     await page.click('button[type="submit"]');
  24 |     // Depending on frontend validation, it might show HTML5 required tooltips or custom errors.
  25 |     // We check if the URL is still /auth, meaning login was prevented.
  26 |     await expect(page).toHaveURL(/.*\/auth/);
  27 |   });
  28 | 
  29 |   test('should show error on invalid credentials', async ({ page }) => {
  30 |     await page.fill('input[type="email"]', 'invalid@example.com');
  31 |     await page.fill('input[type="password"]', 'wrongpassword');
  32 |     await page.click('button[type="submit"]');
  33 | 
  34 |     // Wait for error toast or message
  35 |     const errorMsg = page.locator('text=Invalid credentials').first();
  36 |     await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => {
  37 |         console.log("No specific 'Invalid credentials' message found, but checking URL...");
  38 |     });
  39 |     
  40 |     // Ensure we are still on the auth page
  41 |     await expect(page).toHaveURL(/.*\/auth/);
  42 |   });
  43 | 
  44 |   test('should prevent direct access to protected routes', async ({ page }) => {
  45 |     await page.goto(`${BASE_URL}/dashboard`);
  46 |     // Should redirect to auth or show unauthorized
  47 |     await expect(page).toHaveURL(/.*\/auth/);
  48 |   });
  49 | 
  50 |   test('should login successfully with valid credentials and maintain session', async ({ page, context }) => {
  51 | 
  52 |     await page.fill('input[type="email"]', ADMIN_EMAIL!);
  53 |     await page.fill('input[type="password"]', ADMIN_PASSWORD!);
  54 |     await page.click('button[type="submit"]');
  55 | 
  56 |     // Should redirect to dashboard
> 57 |     await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  58 |     await expect(page.locator('text=Dashboard').first()).toBeVisible();
  59 | 
  60 |     // Verify session persistence by opening a new page in the same context
  61 |     const newPage = await context.newPage();
  62 |     await newPage.goto(`${BASE_URL}/dashboard`);
  63 |     await expect(newPage).toHaveURL(/.*\/dashboard/);
  64 |     await newPage.close();
  65 |   });
  66 | 
  67 | });
  68 | 
```