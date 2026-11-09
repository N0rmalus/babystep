import { describe, expect, it } from 'vitest';

import type { Product } from '@/actions/types';
import { resolveCartLines } from '@/business/cart-line-resolution';
import { getCartLineHref, getProductHref } from '@/lib/product-href';

describe('getProductHref', () => {
  it('links to the product page without a variant', () => {
    expect(getProductHref({ productId: 'p1' })).toBe('/product/p1');
  });

  it('keeps the chosen variant in the link', () => {
    expect(getProductHref({ productId: 'p1', variantId: 'v2' })).toBe('/product/p1?variantId=v2');
  });
});

describe('getCartLineHref', () => {
  const product = {
    id: 'p1',
    subcategoryId: 's1',
    name: 'Miegmaišis',
    price: '20.00',
    stockCount: 3,
    isFeatured: false,
    description: null,
    images: [],
    subcategory: {
      id: 's1',
      name: 'Miegmaišiai',
      categoryId: 'c1',
      category: { id: 'c1', name: 'Miegui', billboard: { id: 'b1', label: '', imageUrl: '' } },
    },
    hasOptions: true,
    options: [],
    variants: [
      {
        id: 'v2',
        sku: null,
        label: 'Dydis: 0–6 mėn.',
        optionValueIds: [],
        price: '20.00',
        salePrice: null,
        stockCount: 3,
      },
    ],
  } satisfies Product;

  it('keeps the variant of a line that has one', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'p1', variantId: 'v2', quantity: 1 }],
      products: [product],
    });

    expect(line && getCartLineHref(line)).toBe('/product/p1?variantId=v2');
  });

  it('drops a variant that is no longer available', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'p1', variantId: 'gone', quantity: 1 }],
      products: [product],
    });

    expect(line && getCartLineHref(line)).toBe('/product/p1');
  });
});
