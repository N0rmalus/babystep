'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import type { Product } from '@/actions/types';
import { orderImagesBySelection } from '@/business/gallery-order';
import {
  getBuyableValueIds,
  getPurchaseState,
  getSelectionFromVariantId,
  getSelectionPrice,
  getSelectionSummary,
  toggleValue,
} from '@/business/variant-selection';
import useCart from '@/hooks/use-cart';

type ProductPurchase = ReturnType<typeof useProductPurchaseState>;

type Props = {
  product: Product;
  initialVariantId?: string;
  children: ReactNode;
};

const MIN_QUANTITY = 1;

const ProductPurchaseContext = createContext<ProductPurchase | null>(null);

export const ProductPurchaseProvider = ({ product, initialVariantId, children }: Props) => {
  const purchase = useProductPurchaseState(product, initialVariantId);

  return <ProductPurchaseContext.Provider value={purchase}>{children}</ProductPurchaseContext.Provider>;
};

export const useProductPurchase = () => {
  const purchase = useContext(ProductPurchaseContext);

  if (!purchase) {
    throw new Error('useProductPurchase must be used inside ProductPurchaseProvider');
  }

  return purchase;
};

const useProductPurchaseState = (product: Product, initialVariantId: string | undefined) => {
  const addToCart = useCart((state) => state.addItem);
  const [selection, setSelection] = useState(() => getSelectionFromVariantId(product, initialVariantId));
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [isAdded, setIsAdded] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(true);

  const purchaseState = getPurchaseState(product, selection);
  const buyableValueIds = getBuyableValueIds(product, selection);
  const price = getSelectionPrice({ product, selection });
  const selectionSummary = getSelectionSummary(product, selection);
  const images = orderImagesBySelection(product.images, selection);
  const selectedVariantId = purchaseState.kind === 'incomplete' ? undefined : purchaseState.variant?.id;
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
      variantId: selectedVariantId,
      quantity: Math.min(quantity, maxQuantity),
      maxQuantity,
    });
    setIsAdded(true);
  };

  return {
    product,
    selection,
    images,
    selectedVariantId,
    purchaseState,
    buyableValueIds,
    price,
    selectionSummary,
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
