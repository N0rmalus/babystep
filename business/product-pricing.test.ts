import { describe, expect, it } from 'vitest';

import { getProductPricing } from '@/business/product-pricing';

const NOW = new Date('2026-06-15T12:00:00Z');
const BEFORE_NOW = '2026-06-01T00:00:00Z';
const AFTER_NOW = '2026-06-30T00:00:00Z';

describe('getProductPricing', () => {
  it('uses the regular price when there is no sale price', () => {
    expect(getProductPricing({ price: '20.00', salePrice: null }, NOW)).toEqual({
      regularPrice: 20,
      salePrice: null,
      effectivePrice: 20,
      discountPercent: 0,
      isOnSale: false,
    });
  });

  it('applies a sale inside its window', () => {
    const pricing = getProductPricing(
      { price: '20.00', salePrice: '15.00', saleStartsAt: BEFORE_NOW, saleEndsAt: AFTER_NOW },
      NOW,
    );

    expect(pricing).toEqual({
      regularPrice: 20,
      salePrice: 15,
      effectivePrice: 15,
      discountPercent: 25,
      isOnSale: true,
    });
  });

  it('ignores a sale that has not started yet', () => {
    const pricing = getProductPricing({ price: '20.00', salePrice: '15.00', saleStartsAt: AFTER_NOW }, NOW);

    expect(pricing.isOnSale).toBe(false);
    expect(pricing.effectivePrice).toBe(20);
    expect(pricing.discountPercent).toBe(0);
  });

  it('ignores a sale that has already ended', () => {
    const pricing = getProductPricing({ price: '20.00', salePrice: '15.00', saleEndsAt: BEFORE_NOW }, NOW);

    expect(pricing.isOnSale).toBe(false);
    expect(pricing.effectivePrice).toBe(20);
  });

  it('ignores a sale price that is not below the regular price', () => {
    expect(getProductPricing({ price: '20.00', salePrice: '20.00' }, NOW).isOnSale).toBe(false);
    expect(getProductPricing({ price: '20.00', salePrice: '25.00' }, NOW).effectivePrice).toBe(20);
  });

  it('rounds the discount percent and never shows less than 1%', () => {
    expect(getProductPricing({ price: '30.00', salePrice: '19.99' }, NOW).discountPercent).toBe(33);
    expect(getProductPricing({ price: '1000.00', salePrice: '999.99' }, NOW).discountPercent).toBe(1);
  });

  it("prices a variant's resolved pair with the product's sale window", () => {
    const product = { saleStartsAt: AFTER_NOW, saleEndsAt: null };
    const variant = { price: '24.00', salePrice: '18.00' };

    expect(getProductPricing({ ...variant, ...product }, NOW).effectivePrice).toBe(24);
  });
});
