'use client';

import { useMemo } from 'react';

import type { Product } from '@/actions/types';
import {
  getFreeShippingProgress,
  getRemainingForFreeShipping,
  hasFreeShipping as getHasFreeShipping,
} from '@/business/delivery-pricing';
import { getProductEffectivePrice } from '@/business/product-pricing';
import { type CartLine, getCartItemCount } from '@/hooks/use-cart';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

type Props = {
  lines: CartLine[];
  products: Product[];
  isLoading?: boolean;
  failedProductIds?: string[];
  freeShippingThreshold?: number;
};

export const useCartSummary = ({
  lines,
  products,
  isLoading = false,
  failedProductIds = [],
  freeShippingThreshold = FREE_SHIPPING_THRESHOLD,
}: Props) => {
  const quantityByProductId = useMemo(() => {
    return new Map(lines.map((line) => [line.productId, line.quantity]));
  }, [lines]);

  const subtotal = useMemo(() => {
    return products.reduce((total, product) => {
      return total + getProductEffectivePrice(product) * (quantityByProductId.get(product.id) ?? 0);
    }, 0);
  }, [products, quantityByProductId]);

  const itemCount = getCartItemCount(lines);
  const remainingForFreeShipping = getRemainingForFreeShipping({ subtotal, freeShippingThreshold });
  const freeShippingProgress = getFreeShippingProgress({ subtotal, freeShippingThreshold });
  const hasFreeShipping = itemCount > 0 && getHasFreeShipping({ subtotal, freeShippingThreshold });
  const hasOutOfStockProducts = products.some((product) => product.amountInStock <= 0);
  const hasInsufficientStock = products.some((product) => {
    return product.amountInStock > 0 && (quantityByProductId.get(product.id) ?? 0) > product.amountInStock;
  });
  const isCheckoutDisabled =
    itemCount === 0 ||
    isLoading ||
    failedProductIds.length > 0 ||
    products.length === 0 ||
    hasOutOfStockProducts ||
    hasInsufficientStock;

  return {
    itemCount,
    subtotal,
    quantityByProductId,
    remainingForFreeShipping,
    freeShippingProgress,
    hasFreeShipping,
    hasOutOfStockProducts,
    hasInsufficientStock,
    isCheckoutDisabled,
  };
};

export type CartSummary = ReturnType<typeof useCartSummary>;
