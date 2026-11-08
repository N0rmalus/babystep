import { describe, expect, it } from 'vitest';

import type { Product, ProductVariant } from '@/actions/types';
import { resolveCartLines } from '@/business/cart-line-resolution';
import { toCheckoutLines } from './checkout-lines';

const NOW = new Date('2026-06-15T12:00:00Z');

const BASE_PRODUCT = {
  id: 'product-1',
  subcategoryId: 'subcategory-1',
  name: 'Miegmaišis',
  price: '20.00',
  salePrice: null,
  saleStartsAt: null,
  saleEndsAt: null,
  stockCount: 5,
  isFeatured: false,
  description: null,
  images: [{ id: 'image-1', url: 'https://example.com/a.jpg', optionValueId: null }],
  subcategory: {
    id: 'subcategory-1',
    name: 'Miegmaišiai',
    categoryId: 'category-1',
    category: { id: 'category-1', name: 'Miegui', billboard: { id: 'billboard-1', label: '', imageUrl: '' } },
  },
} satisfies Partial<Product>;

const PLAIN_PRODUCT: Product = { ...BASE_PRODUCT, hasOptions: false, options: [], variants: [] };

const createVariant = ({ id, label, price }: Pick<ProductVariant, 'id' | 'label' | 'price'>): ProductVariant => ({
  id,
  sku: null,
  label,
  optionValueIds: [],
  price,
  salePrice: null,
  stockCount: 3,
});

const VARIANT_PRODUCT: Product = {
  ...BASE_PRODUCT,
  id: 'product-2',
  name: 'Antklodė',
  price: '1.00',
  hasOptions: true,
  options: [],
  variants: [
    createVariant({ id: 'small', label: 'Dydis: 0–6 mėn.', price: '25.00' }),
    createVariant({ id: 'large', label: 'Dydis: 6–12 mėn.', price: '30.00' }),
  ],
};

describe('toCheckoutLines', () => {
  it('maps a product without options to one line keyed by product id', () => {
    const resolvedLines = resolveCartLines({
      lines: [{ productId: 'product-1', quantity: 2 }],
      products: [PLAIN_PRODUCT],
      now: NOW,
    });

    expect(toCheckoutLines(resolvedLines)).toEqual([
      {
        key: 'product-1',
        productId: 'product-1',
        name: 'Miegmaišis',
        quantity: 2,
        total: 40,
        imageUrl: 'https://example.com/a.jpg',
      },
    ]);
  });

  it('gives two variants of one product their own lines with label and variant price', () => {
    const resolvedLines = resolveCartLines({
      lines: [
        { productId: 'product-2', variantId: 'small', quantity: 1 },
        { productId: 'product-2', variantId: 'large', quantity: 2 },
      ],
      products: [VARIANT_PRODUCT],
      now: NOW,
    });

    expect(toCheckoutLines(resolvedLines)).toEqual([
      expect.objectContaining({
        key: 'product-2:small',
        variantId: 'small',
        name: 'Antklodė – Dydis: 0–6 mėn.',
        quantity: 1,
        total: 25,
      }),
      expect.objectContaining({
        key: 'product-2:large',
        variantId: 'large',
        name: 'Antklodė – Dydis: 6–12 mėn.',
        quantity: 2,
        total: 60,
      }),
    ]);
  });

  it('leaves out lines that need a choice or are no longer available', () => {
    const resolvedLines = resolveCartLines({
      lines: [
        { productId: 'product-2', quantity: 1 },
        { productId: 'product-2', variantId: 'archived', quantity: 1 },
      ],
      products: [VARIANT_PRODUCT],
      now: NOW,
    });

    expect(toCheckoutLines(resolvedLines)).toEqual([]);
  });
});
