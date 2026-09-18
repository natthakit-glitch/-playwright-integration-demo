import {
  test,
  expect,
  BrowserContext,
  Page,
} from '@playwright/test';

async function driverOpenInventory(
  context: BrowserContext
): Promise<Page> {
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_list')).toBeVisible();

  return page;
}

test('Bottom-Up DRIVER: Driver A -> B Inventory -> E Add Cart', async ({ browser }) => {
  const context = await browser.newContext();

  try {
    const page = await driverOpenInventory(context);

    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
    await expect(page.locator('.shopping_cart_badge'))
      .toHaveText('1');
  } finally {
    await context.close();
  }
});