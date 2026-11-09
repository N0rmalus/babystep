import { describe, expect, it } from 'vitest';

import type { Product, ProductVariant } from '@/actions/types';
import { getCartTotals, resolveCartLines } from '@/business/cart-line-resolution';

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
  images: [],
  subcategory: {
    id: 'subcategory-1',
    name: 'Miegmaišiai',
    categoryId: 'category-1',
    category: { id: 'category-1', name: 'Miegui', billboard: { id: 'billboard-1', label: '', imageUrl: '' } },
  },
} satisfies Partial<Product>;

const createProduct = (overrides: Partial<Pick<Product, 'stockCount' | 'salePrice'>> = {}): Product => ({
  ...BASE_PRODUCT,
  ...overrides,
  hasOptions: false,
  options: [],
  variants: [],
});

type VariantOptions = Pick<ProductVariant, 'id'> & Partial<Pick<ProductVariant, 'price' | 'salePrice' | 'stockCount'>>;

const createVariant = ({ id, price = '20.00', salePrice = null, stockCount = 3 }: VariantOptions): ProductVariant => ({
  id,
  sku: null,
  label: `Dydis: ${id}`,
  optionValueIds: [],
  price,
  salePrice,
  stockCount,
});

const createProductWithVariants = (variants: ProductVariant[]): Product => ({
  ...BASE_PRODUCT,
  price: '1.00',
  stockCount: variants.reduce((total, { stockCount }) => total + stockCount, 0),
  hasOptions: true,
  options: [],
  variants,
});

describe('resolveCartLines', () => {
  it('resolves a line for a product without options to an ok line named after the product', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', quantity: 2 }],
      products: [createProduct({ salePrice: '15.00' })],
      now: NOW,
    });

    expect(line).toMatchObject({
      kind: 'ok',
      name: 'Miegmaišis',
      quantity: 2,
      maxQuantity: 5,
      isSoldOut: false,
      hasInsufficientStock: false,
      pricing: { effectivePrice: 15, regularPrice: 20, isOnSale: true },
    });
  });

  it('resolves a valid variant to an ok line with the variant label, price and stock cap', () => {
    const product = createProductWithVariants([
      createVariant({ id: '0-6', price: '18.00', stockCount: 4 }),
      createVariant({ id: '6-12', price: '24.00', salePrice: '21.00', stockCount: 2 }),
    ]);

    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', variantId: '6-12', quantity: 1 }],
      products: [product],
      now: NOW,
    });

    expect(line).toMatchObject({
      kind: 'ok',
      variant: { id: '6-12' },
      name: 'Miegmaišis – Dydis: 6-12',
      maxQuantity: 2,
      pricing: { effectivePrice: 21, regularPrice: 24, isOnSale: true },
    });
  });

  it('asks for a choice when a line has no variant but the product has active variants', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', quantity: 1 }],
      products: [createProductWithVariants([createVariant({ id: '0-6' })])],
      now: NOW,
    });

    expect(line).toMatchObject({ kind: 'needsChoice', name: 'Miegmaišis', product: { id: 'product-1' } });
  });

  it('marks a line unavailable when its variant is no longer active', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', variantId: 'archived', quantity: 1 }],
      products: [createProductWithVariants([createVariant({ id: '0-6' })])],
      now: NOW,
    });

    expect(line).toMatchObject({ kind: 'unavailable', name: 'Miegmaišis' });
  });

  it('marks a line unavailable when it has a variant but the product no longer has options', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', variantId: '0-6', quantity: 1 }],
      products: [createProduct()],
      now: NOW,
    });

    expect(line).toMatchObject({ kind: 'unavailable', name: 'Miegmaišis' });
  });

  it('gives a sold-out line when every variant is archived and the line has no choice', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', quantity: 1 }],
      products: [createProductWithVariants([])],
      now: NOW,
    });

    expect(line).toMatchObject({ kind: 'soldOut', name: 'Miegmaišis' });
  });

  it('flags a sold-out variant line', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', variantId: '0-6', quantity: 1 }],
      products: [createProductWithVariants([createVariant({ id: '0-6', stockCount: 0 })])],
      now: NOW,
    });

    expect(line).toMatchObject({ kind: 'ok', isSoldOut: true, hasInsufficientStock: false });
  });

  it('flags a line that asks for more than the variant has in stock', () => {
    const [line] = resolveCartLines({
      lines: [{ productId: 'product-1', variantId: '0-6', quantity: 3 }],
      products: [createProductWithVariants([createVariant({ id: '0-6', stockCount: 2 })])],
      now: NOW,
    });

    expect(line).toMatchObject({ kind: 'ok', isSoldOut: false, hasInsufficientStock: true });
  });

  it('gives two lines for two variants of one product', () => {
    const lines = resolveCartLines({
      lines: [
        { productId: 'product-1', variantId: '0-6', quantity: 1 },
        { productId: 'product-1', variantId: '6-12', quantity: 2 },
      ],
      products: [createProductWithVariants([createVariant({ id: '0-6' }), createVariant({ id: '6-12' })])],
      now: NOW,
    });

    expect(lines.map(({ name }) => name)).toEqual(['Miegmaišis – Dydis: 0-6', 'Miegmaišis – Dydis: 6-12']);
  });

  it('leaves out lines whose product has not been resolved', () => {
    const lines = resolveCartLines({
      lines: [{ productId: 'deleted', quantity: 1 }],
      products: [createProduct()],
      now: NOW,
    });

    expect(lines).toEqual([]);
  });
});

describe('getCartTotals', () => {
  it('sums the subtotal from the variant prices of ok lines', () => {
    const lines = resolveCartLines({
      lines: [
        { productId: 'product-1', variantId: '0-6', quantity: 2 },
        { productId: 'product-1', variantId: '6-12', quantity: 1 },
      ],
      products: [
        createProductWithVariants([
          createVariant({ id: '0-6', price: '18.00' }),
          createVariant({ id: '6-12', price: '24.00', salePrice: '21.00' }),
        ]),
      ],
      now: NOW,
    });

    expect(getCartTotals(lines)).toMatchObject({ subtotal: 57, isCheckoutBlocked: false });
  });

  it('blocks checkout while a line needs a choice', () => {
    const lines = resolveCartLines({
      lines: [{ productId: 'product-1', quantity: 1 }],
      products: [createProductWithVariants([createVariant({ id: '0-6' })])],
      now: NOW,
    });

    expect(getCartTotals(lines)).toMatchObject({ hasLinesNeedingChoice: true, isCheckoutBlocked: true });
  });

  it('blocks checkout while a line is unavailable', () => {
    const lines = resolveCartLines({
      lines: [{ productId: 'product-1', variantId: 'archived', quantity: 1 }],
      products: [createProductWithVariants([createVariant({ id: '0-6' })])],
      now: NOW,
    });

    expect(getCartTotals(lines)).toMatchObject({ hasUnavailableLines: true, isCheckoutBlocked: true });
  });

  it('blocks checkout for sold-out lines, including a product with every variant archived', () => {
    const lines = resolveCartLines({
      lines: [
        { productId: 'product-1', variantId: '0-6', quantity: 1 },
        { productId: 'product-2', quantity: 1 },
      ],
      products: [
        createProductWithVariants([createVariant({ id: '0-6', stockCount: 0 })]),
        { ...createProductWithVariants([]), id: 'product-2' },
      ],
      now: NOW,
    });

    expect(getCartTotals(lines)).toMatchObject({ hasSoldOutLines: true, isCheckoutBlocked: true });
  });

  it('blocks checkout when a line asks for more than is in stock', () => {
    const lines = resolveCartLines({
      lines: [{ productId: 'product-1', quantity: 6 }],
      products: [createProduct()],
      now: NOW,
    });

    expect(getCartTotals(lines)).toMatchObject({ hasInsufficientStock: true, isCheckoutBlocked: true });
  });
});
