'use client';

import { useMemo } from 'react';

import type { Product } from '@/actions/types';
import { getCartTotals, resolveCartLines } from '@/business/cart-line-resolution';
import {
  getFreeShippingProgress,
  getRemainingForFreeShipping,
  hasFreeShipping as getHasFreeShipping,
} from '@/business/delivery-pricing';
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
    return lines.reduce(
      (quantities, line) => quantities.set(line.productId, (quantities.get(line.productId) ?? 0) + line.quantity),
      new Map<string, number>(),
    );
  }, [lines]);

  const resolvedLines = useMemo(() => resolveCartLines({ lines, products }), [lines, products]);
  const {
    subtotal,
    hasLinesNeedingChoice,
    hasUnavailableLines,
    hasSoldOutLines,
    hasInsufficientStock,
    isCheckoutBlocked,
  } = getCartTotals(resolvedLines);

  const itemCount = getCartItemCount(lines);
  const remainingForFreeShipping = getRemainingForFreeShipping({ subtotal, freeShippingThreshold });
  const freeShippingProgress = getFreeShippingProgress({ subtotal, freeShippingThreshold });
  const hasFreeShipping = itemCount > 0 && getHasFreeShipping({ subtotal, freeShippingThreshold });
  const isCheckoutDisabled =
    itemCount === 0 || isLoading || failedProductIds.length > 0 || products.length === 0 || isCheckoutBlocked;

  return {
    resolvedLines,
    itemCount,
    subtotal,
    quantityByProductId,
    remainingForFreeShipping,
    freeShippingProgress,
    hasFreeShipping,
    hasLinesNeedingChoice,
    hasUnavailableLines,
    hasSoldOutLines,
    hasInsufficientStock,
    isCheckoutDisabled,
  };
};

export type CartSummary = ReturnType<typeof useCartSummary>;
