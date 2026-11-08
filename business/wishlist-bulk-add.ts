import type { Product } from '@/actions/types';

type WishlistBulkAddOptions = {
  products: Product[];
  cartProductIds: string[];
};

type WishlistBulkAdd = {
  productsToAdd: Product[];
  addedCount: number;
  soldOutProducts: Product[];
  needsChoiceProducts: Product[];
};

export const getWishlistBulkAdd = ({ products, cartProductIds }: WishlistBulkAddOptions): WishlistBulkAdd => {
  const cartProductIdSet = new Set(cartProductIds);
  const inStockProducts = products.filter(isInStock);
  const addableProducts = inStockProducts.filter((product) => !product.hasOptions);

  return {
    productsToAdd: addableProducts.filter((product) => !cartProductIdSet.has(product.id)),
    addedCount: addableProducts.length,
    soldOutProducts: products.filter((product) => !isInStock(product)),
    needsChoiceProducts: inStockProducts.filter((product) => product.hasOptions),
  };
};

const isInStock = (product: Product) => product.stockCount > 0;
