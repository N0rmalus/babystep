import { expect, test, type Page } from '@playwright/test';

const mockApiBaseUrl = 'http://127.0.0.1:4010';
const initialName = 'Test Product Name';
const wishlistUpdatedName = 'Wishlist Updated Product';
const cartUpdatedName = 'Cart Updated Product';

const triggerTabFocus = async (page: Page) => {
  await page.bringToFront();
  await page.evaluate(() => {
    window.dispatchEvent(new Event('focus'));
    document.dispatchEvent(new Event('visibilitychange'));
  });
};

test.beforeEach(async ({ request }) => {
  await request.post(`${mockApiBaseUrl}/__test/reset`);
});

test('refreshes wishlist and cart product data when tab gets focus', async ({ page, request }) => {
  await page.goto('/product/product-1');
  await expect(page.getByRole('heading', { name: initialName })).toBeVisible();

  await page.getByRole('button', { name: /^Pridėti į krepšelį$/ }).first().click();
  await page.getByRole('button', { name: /^Į norų sąrašą$/ }).first().click();

  await page.goto('/wishlist');
  await expect(page.getByText(initialName)).toBeVisible();

  await request.post(`${mockApiBaseUrl}/__test/update-product`, {
    data: {
      id: 'product-1',
      name: wishlistUpdatedName,
      price: '29.99',
    },
  });

  const wishlistRefetchPromise = page.waitForResponse((response) => {
    return response.url().includes('/api/test-store/products/product-1') && response.status() === 200;
  });

  await triggerTabFocus(page);
  await wishlistRefetchPromise;
  await expect(page.getByText(wishlistUpdatedName)).toBeVisible({ timeout: 10000 });

  await page.goto('/cart');
  await expect(page.getByText(wishlistUpdatedName)).toBeVisible();

  await request.post(`${mockApiBaseUrl}/__test/update-product`, {
    data: {
      id: 'product-1',
      name: cartUpdatedName,
      price: '39.99',
    },
  });

  const cartRefetchPromise = page.waitForResponse((response) => {
    return response.url().includes('/api/test-store/products/product-1') && response.status() === 200;
  });

  await triggerTabFocus(page);
  await cartRefetchPromise;
  await expect(page.getByText(cartUpdatedName)).toBeVisible({ timeout: 10000 });
});
