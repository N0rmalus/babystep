import { describe, expect, it } from 'vitest';

import type { Product } from '@/actions/types';
import { getCardAction } from '@/components/ui/product-card/card-action';

const BASE_PRODUCT = {
  id: 'p1',
  subcategoryId: 's1',
  name: 'Miegmaišis',
  price: '30',
  stockCount: 5,
  isFeatured: false,
  description: null,
  images: [],
  subcategory: {
    id: 's1',
    name: 'Miegmaišiai',
    categoryId: 'c1',
    category: { id: 'c1', name: 'Miegui', billboard: { id: 'b1', label: '', imageUrl: '' } },
  },
};

const SIMPLE_PRODUCT: Product = { ...BASE_PRODUCT, hasOptions: false, options: [], variants: [] };

const OPTIONS_PRODUCT: Product = {
  ...BASE_PRODUCT,
  hasOptions: true,
  options: [{ id: 'size', name: 'Dydis', displayType: 'CHIPS', values: [] }],
  variants: [{ id: 'v1', sku: null, label: 'S', optionValueIds: [], price: '30', salePrice: null, stockCount: 5 }],
};

describe('getCardAction', () => {
  it('opens the quick view to choose options on desktop', () => {
    expect(getCardAction({ product: OPTIONS_PRODUCT, isInCart: false, isMobile: false })).toEqual({
      kind: 'chooseOptions',
      target: 'quickView',
    });
  });

  it('opens the product page to choose options on mobile', () => {
    expect(getCardAction({ product: OPTIONS_PRODUCT, isInCart: false, isMobile: true })).toEqual({
      kind: 'chooseOptions',
      target: 'productPage',
    });
  });

  it('still asks to choose options when a variant is already in the cart', () => {
    expect(getCardAction({ product: OPTIONS_PRODUCT, isInCart: true, isMobile: false })).toEqual({
      kind: 'chooseOptions',
      target: 'quickView',
    });
  });

  it('adds a product without options straight to the cart', () => {
    expect(getCardAction({ product: SIMPLE_PRODUCT, isInCart: false, isMobile: false })).toEqual({ kind: 'add' });
  });

  it('marks a product without options that is already in the cart', () => {
    expect(getCardAction({ product: SIMPLE_PRODUCT, isInCart: true, isMobile: false })).toEqual({ kind: 'inCart' });
  });

  it.each([SIMPLE_PRODUCT, OPTIONS_PRODUCT])('shows a sold out product as sold out', (product) => {
    expect(getCardAction({ product: { ...product, stockCount: 0 }, isInCart: true, isMobile: false })).toEqual({
      kind: 'soldOut',
    });
  });
});
