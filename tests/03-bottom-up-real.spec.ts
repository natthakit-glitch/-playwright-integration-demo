import { test, expect, Page } from '@playwright/test';

async function loginThroughRealUI(page: Page) {
  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test.describe('Bottom-Up REAL - no Driver / no Stub', () => {
  test('BU-01: Integrate B Inventory -> E Add Cart -> F Cart', async ({ page }) => {
    await loginThroughRealUI(page);

    await expect(page.locator('.inventory_list')).toBeVisible();

    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });

  test('BU-02: Add A Login to the already-tested B-E-F flow', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.inventory_item_name'))
      .toHaveText('Sauce Labs Backpack');
  });
});