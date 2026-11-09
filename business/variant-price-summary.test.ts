import { describe, expect, it } from 'vitest';

import type { Product, ProductVariant } from '@/actions/types';
import { getProductPricing } from '@/business/product-pricing';
import { getBiggestDiscount, getVariantPriceSummary } from '@/business/variant-price-summary';

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

type ProductOverrides = Partial<Pick<Product, 'price' | 'salePrice' | 'saleStartsAt' | 'saleEndsAt'>>;

const createProduct = (overrides: ProductOverrides = {}): Product => ({
  ...BASE_PRODUCT,
  ...overrides,
  hasOptions: false,
  options: [],
  variants: [],
});

type VariantOptions = Pick<ProductVariant, 'id' | 'price'> & Partial<Pick<ProductVariant, 'salePrice'>>;

const createVariant = ({ id, price, salePrice = null }: VariantOptions): ProductVariant => ({
  id,
  sku: null,
  label: id,
  optionValueIds: [],
  price,
  salePrice,
  stockCount: 1,
});

const createProductWithVariants = (variants: ProductVariant[], overrides: ProductOverrides = {}): Product => ({
  ...BASE_PRODUCT,
  ...overrides,
  hasOptions: true,
  options: [],
  variants,
});

describe('getVariantPriceSummary', () => {
  it('gives a single price when every variant costs the same, ignoring the base price', () => {
    const product = createProductWithVariants(
      [createVariant({ id: 'a', price: '30.00' }), createVariant({ id: 'b', price: '30.00' })],
      {
        price: '5.00',
        salePrice: '1.00',
      },
    );

    expect(getVariantPriceSummary(product, NOW)).toEqual({
      kind: 'single',
      price: 30,
      regularPrice: null,
      badge: { kind: 'none' },
    });
  });

  it('gives a range of effective prices when variants cost differently', () => {
    const product = createProductWithVariants([
      createVariant({ id: 'a', price: '30.00' }),
      createVariant({ id: 'b', price: '24.00', salePrice: '12.99' }),
      createVariant({ id: 'c', price: '40.00' }),
    ]);

    expect(getVariantPriceSummary(product, NOW)).toMatchObject({ kind: 'range', min: 12.99, max: 40 });
  });

  it('gives an exact badge and keeps the regular price when every variant has the same sale', () => {
    const product = createProductWithVariants([
      createVariant({ id: 'a', price: '20.00', salePrice: '15.00' }),
      createVariant({ id: 'b', price: '20.00', salePrice: '15.00' }),
    ]);

    expect(getVariantPriceSummary(product, NOW)).toEqual({
      kind: 'single',
      price: 15,
      regularPrice: 20,
      badge: { kind: 'exact', percent: 25 },
    });
  });

  it('gives an exact badge on a range when every variant has the same discount percent', () => {
    const product = createProductWithVariants([
      createVariant({ id: 'a', price: '20.00', salePrice: '15.00' }),
      createVariant({ id: 'b', price: '40.00', salePrice: '30.00' }),
    ]);

    expect(getVariantPriceSummary(product, NOW)).toEqual({
      kind: 'range',
      min: 15,
      max: 30,
      badge: { kind: 'exact', percent: 25 },
    });
  });

  it('gives an up-to badge with the largest percent when discounts differ', () => {
    const product = createProductWithVariants([
      createVariant({ id: 'a', price: '20.00', salePrice: '15.00' }),
      createVariant({ id: 'b', price: '20.00', salePrice: '10.00' }),
    ]);

    expect(getVariantPriceSummary(product, NOW)).toMatchObject({ badge: { kind: 'upTo', percent: 50 } });
  });

  it('gives an up-to badge when only some variants are on sale', () => {
    const product = createProductWithVariants([
      createVariant({ id: 'a', price: '20.00', salePrice: '15.00' }),
      createVariant({ id: 'b', price: '15.00' }),
    ]);

    expect(getVariantPriceSummary(product, NOW)).toEqual({
      kind: 'single',
      price: 15,
      regularPrice: null,
      badge: { kind: 'upTo', percent: 25 },
    });
  });

  it("ignores variant sales outside the product's sale window", () => {
    const product = createProductWithVariants(
      [
        createVariant({ id: 'a', price: '20.00', salePrice: '15.00' }),
        createVariant({ id: 'b', price: '20.00', salePrice: '10.00' }),
      ],
      {
        saleEndsAt: '2026-06-01T00:00:00Z',
      },
    );

    expect(getVariantPriceSummary(product, NOW)).toEqual({
      kind: 'single',
      price: 20,
      regularPrice: null,
      badge: { kind: 'none' },
    });
  });

  it('is unavailable when every variant is archived', () => {
    expect(getVariantPriceSummary(createProductWithVariants([]), NOW)).toEqual({ kind: 'unavailable' });
  });

  it('matches getProductPricing for a product without options on sale', () => {
    const product = createProduct({ price: '20.00', salePrice: '15.00' });
    const pricing = getProductPricing(product, NOW);

    expect(pricing).toMatchObject({ effectivePrice: 15, regularPrice: 20, discountPercent: 25 });
    expect(getVariantPriceSummary(product, NOW)).toEqual({
      kind: 'single',
      price: pricing.effectivePrice,
      regularPrice: pricing.regularPrice,
      badge: { kind: 'exact', percent: pricing.discountPercent },
    });
  });

  it('gives no badge and no regular price for a product without options and no sale', () => {
    expect(getVariantPriceSummary(createProduct({ price: '20.00' }), NOW)).toEqual({
      kind: 'single',
      price: 20,
      regularPrice: null,
      badge: { kind: 'none' },
    });
  });
});

describe('getBiggestDiscount', () => {
  it("counts a product's largest variant discount", () => {
    const products = [
      createProduct({ price: '20.00', salePrice: '15.00' }),
      createProductWithVariants(
        [
          createVariant({ id: 'a', price: '20.00', salePrice: '18.00' }),
          createVariant({ id: 'b', price: '20.00', salePrice: '8.00' }),
        ],
        {
          price: '20.00',
          salePrice: '19.00',
        },
      ),
    ];

    expect(getBiggestDiscount(products, NOW)).toBe(60);
  });
});
