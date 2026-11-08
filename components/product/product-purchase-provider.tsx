'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import type { Product } from '@/actions/types';
import {
  getBuyableValueIds,
  getInitialSelection,
  getPurchaseState,
  getSelectionPrice,
  toggleValue,
} from '@/business/variant-selection';
import useCart from '@/hooks/use-cart';

type ProductPurchase = ReturnType<typeof useProductPurchaseState>;

type Props = {
  product: Product;
  children: ReactNode;
};

const MIN_QUANTITY = 1;

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
  const [selection, setSelection] = useState(() => getInitialSelection(product));
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [isAdded, setIsAdded] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(true);

  const purchaseState = getPurchaseState(product, selection);
  const buyableValueIds = getBuyableValueIds(product, selection);
  const price = getSelectionPrice({ product, selection });
  const maxQuantity = purchaseState.kind === 'buyable' ? purchaseState.maxQuantity : MIN_QUANTITY;

  const selectValue = (groupId: string, valueId: string) => {
    setSelection((current) => toggleValue({ product, selection: current, groupId, valueId }));
    setIsAdded(false);
  };

  const changeQuantity = (value: number) => {
    setQuantity(Math.min(Math.max(value, MIN_QUANTITY), maxQuantity));
    setIsAdded(false);
  };

  const addSelectionToCart = () => {
    if (purchaseState.kind !== 'buyable') {
      return;
    }

    addToCart({
      productId: product.id,
      variantId: purchaseState.variant?.id,
      quantity: Math.min(quantity, maxQuantity),
      maxQuantity,
    });
    setIsAdded(true);
  };

  return {
    product,
    selection,
    purchaseState,
    buyableValueIds,
    price,
    quantity: Math.min(quantity, maxQuantity),
    maxQuantity,
    isAdded,
    isCtaVisible,
    setIsCtaVisible,
    selectValue,
    changeQuantity,
    addSelectionToCart,
  };
};
