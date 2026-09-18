import {
  test,
  expect,
  BrowserContext,
  Page,
} from '@playwright/test';


async function driverOpenShoppingCart(
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
  await page.goto('https://www.saucedemo.com/cart.html');
  await expect(page.locator('.cart_list')).toBeVisible();

  return page;
}

test('Driver: Driver (Login+Inventory) -> F Shopping Cart REAL', async ({ browser }) => {
  const context = await browser.newContext();

  try {
   
    const page = await driverOpenShoppingCart(context);

   
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.title')).toHaveText('Your Cart');
  } finally {
    await context.close();
  }
});