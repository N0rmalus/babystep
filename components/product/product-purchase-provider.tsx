'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import type { Product } from '@/actions/types';
import useCart from '@/hooks/use-cart';
import { MOCK_PRODUCT_COLORS, MOCK_PRODUCT_SIZES } from '@/lib/mocks/product';

type ProductPurchase = ReturnType<typeof useProductPurchaseState>;

type Props = {
  product: Product;
  children: ReactNode;
};

const ProductPurchaseContext = createContext<ProductPurchase | null>(null);

export const ProductPurchaseProvider = ({ product, children }: Props) => {
  const purchase = useProductPurchaseState(product);

  return <ProductPurchaseContext.Provider value={purchase}>{children}</ProductPurchaseContext.Provider>;
};

export const useProductPurchase = () => {
  const purchase = useContext(ProductPurchaseContext);

  if (!purchase) {
    throw new Error('useProductPurchase must be used inside ProductPurchaseProvider');
  }

  return purchase;
};

const useProductPurchaseState = (product: Product) => {
  const addToCart = useCart((state) => state.addItem);
  // MOCK: size and color options until "Product variants".
  const [sizeId, setSizeId] = useState(getFirstAvailableId(MOCK_PRODUCT_SIZES));
  const [colorId, setColorId] = useState(getFirstAvailableId(MOCK_PRODUCT_COLORS));
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(true);

  // MOCK: variant availability until "Product variants".
  const size = MOCK_PRODUCT_SIZES.find((option) => option.id === sizeId);
  const color = MOCK_PRODUCT_COLORS.find((option) => option.id === colorId);
  const isVariantAvailable = Boolean(size?.isAvailable && color?.isAvailable);
  const stockCount = product.amountInStock;
  const isInStock = stockCount > 0 && isVariantAvailable;
  const maxQuantity = Math.max(stockCount, 1);

  const selectSize = (id: string) => {
    setSizeId(id);
    setIsAdded(false);
  };

  const selectColor = (id: string) => {
    setColorId(id);
    setIsAdded(false);
  };

  const changeQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(value, 1), maxQuantity));
    setIsAdded(false);
  };

  const addSelectionToCart = () => {
    if (!isInStock) {
      return;
    }

    addToCart({ productId: product.id, quantity: Math.min(quantity, stockCount), maxQuantity: stockCount });
    setIsAdded(true);
  };

  return {
    product,
    size,
    color,
    quantity: Math.min(quantity, maxQuantity),
    maxQuantity,
    stockCount,
    isInStock,
    isAdded,
    isCtaVisible,
    setIsCtaVisible,
    selectSize,
    selectColor,
    changeQuantity,
    addSelectionToCart,
  };
};

const getFirstAvailableId = (options: { id: string; isAvailable: boolean }[]) => {
  return options.find((option) => option.isAvailable)?.id ?? options.at(0)?.id ?? '';
};
