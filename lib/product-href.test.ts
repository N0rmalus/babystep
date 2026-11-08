import { describe, expect, it } from 'vitest';

import { getProductHref } from '@/lib/product-href';

describe('getProductHref', () => {
  it('links to the product page without a variant', () => {
    expect(getProductHref({ productId: 'p1' })).toBe('/product/p1');
  });

  it('keeps the chosen variant in the link', () => {
    expect(getProductHref({ productId: 'p1', variantId: 'v2' })).toBe('/product/p1?variantId=v2');
  });
});
