import { describe, expect, it } from 'vitest';

import type { Product } from '@/actions/types';
import { getWishlistBulkAdd } from '@/business/wishlist-bulk-add';

const BASE_PRODUCT = {
  subcategoryId: 'subcategory-1',
  price: '20.00',
  salePrice: null,
  saleStartsAt: null,
  saleEndsAt: null,
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

type ProductOptions = Pick<Product, 'id' | 'name'> & Partial<Pick<Product, 'stockCount'>>;

const createProduct = ({ id, name, stockCount = 5 }: ProductOptions): Product => ({
  ...BASE_PRODUCT,
  id,
  name,
  stockCount,
  hasOptions: false,
  options: [],
  variants: [],
});

const createProductWithVariants = (options: ProductOptions): Product => {
  const { id, stockCount } = createProduct(options);
  const variant = {
    id: `${id}-v1`,
    sku: null,
    label: 'Dydis: 0-6 mėn.',
    optionValueIds: [],
    price: '20.00',
    salePrice: null,
    stockCount,
  };

  return { ...createProduct(options), hasOptions: true, options: [], variants: [variant] };
};

describe('getWishlistBulkAdd', () => {
  it('asks for a choice on an in-stock product with variants instead of adding it', () => {
    const plain = createProduct({ id: 'plain', name: 'Pledas' });
    const withVariants = createProductWithVariants({ id: 'sized', name: 'Miegmaišis' });

    const bulkAdd = getWishlistBulkAdd({ products: [plain, withVariants], cartProductIds: [] });

    expect(bulkAdd.productsToAdd).toEqual([plain]);
    expect(bulkAdd.needsChoiceProducts).toEqual([withVariants]);
  });

  it('lists sold-out products as sold out, with or without variants, and adds neither', () => {
    const soldOutPlain = createProduct({ id: 'plain', name: 'Pledas', stockCount: 0 });
    const soldOutWithVariants = createProductWithVariants({ id: 'sized', name: 'Miegmaišis', stockCount: 0 });

    const bulkAdd = getWishlistBulkAdd({ products: [soldOutPlain, soldOutWithVariants], cartProductIds: [] });

    expect(bulkAdd.productsToAdd).toEqual([]);
    expect(bulkAdd.needsChoiceProducts).toEqual([]);
    expect(bulkAdd.soldOutProducts).toEqual([soldOutPlain, soldOutWithVariants]);
  });

  it('skips products already in the cart but counts them as in the cart', () => {
    const inCart = createProduct({ id: 'in-cart', name: 'Pledas' });
    const notInCart = createProduct({ id: 'not-in-cart', name: 'Antklodė' });

    const bulkAdd = getWishlistBulkAdd({ products: [inCart, notInCart], cartProductIds: ['in-cart'] });

    expect(bulkAdd.productsToAdd).toEqual([notInCart]);
    expect(bulkAdd.addedCount).toBe(2);
  });

  it('does not ask for a choice on a product with variants that already has a line in the cart', () => {
    const chosen = createProductWithVariants({ id: 'chosen', name: 'Miegmaišis' });
    const notChosen = createProductWithVariants({ id: 'not-chosen', name: 'Pledukas' });

    const bulkAdd = getWishlistBulkAdd({ products: [chosen, notChosen], cartProductIds: ['chosen'] });

    expect(bulkAdd.needsChoiceProducts).toEqual([notChosen]);
  });
});
