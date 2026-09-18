import { test, expect, Page } from '@playwright/test';

async function loginReal(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
}

test('Stub Shopping Cart: Login REAL -> Inventory REAL -> Add Cart -> Cart STUB (with student name)', async ({ page }) => {
 
  await loginReal(page);


  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(6);


  await page
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');


  await page.setContent(`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Stub Shopping Cart</title>
</head>
<body>
  <h1>Stub Shopping Cart</h1>
  <div class="cart_list" data-test="stub-cart">
    <div class="cart_item">
      <div class="inventory_item_name">Sauce Labs Backpack</div>
      <div data-test="student-name" class="student_name">
        ณัฐกิจ วรรณเลิศ
      </div>
    </div>
  </div>
</body>
</html>
`);

  await expect(page.locator('[data-test="stub-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="student-name"]'))
    .toHaveText('ณัฐกิจ วรรณเลิศ');
});