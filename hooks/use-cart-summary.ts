'use client';

import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { getProductEffectivePrice } from '@/business/product-pricing';
import type { Product } from '@/actions/types';
import { type CartLine, getCartItemCount, getCheckoutProductIds } from '@/hooks/use-cart';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_PRICE } from '@/lib/consts';

type CheckoutErrorPayload = {
  message?: string;
  invalidProductIds?: string[];
  insufficientStockItems?: {
    productId: string;
    requested: number;
    available: number;
  }[];
};

type Props = {
  lines: CartLine[];
  products: Product[];
  isLoading?: boolean;
  failedProductIds?: string[];
};

export const useCartSummary = ({ lines, products, isLoading = false, failedProductIds = [] }: Props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const quantityByProductId = useMemo(() => {
    return new Map(lines.map((line) => [line.productId, line.quantity]));
  }, [lines]);

  const subtotal = useMemo(() => {
    return products.reduce((total, product) => {
      return total + getProductEffectivePrice(product) * (quantityByProductId.get(product.id) ?? 0);
    }, 0);
  }, [products, quantityByProductId]);

  const itemCount = getCartItemCount(lines);

  const productNameById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product.name]));
  }, [products]);

  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const freeShippingProgress =
    FREE_SHIPPING_THRESHOLD > 0 ? Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100) : 100;
  const hasFreeShipping = itemCount > 0 && remainingForFreeShipping === 0;
  const shippingPrice = itemCount === 0 || hasFreeShipping ? 0 : STANDARD_SHIPPING_PRICE;
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
    hasInsufficientStock ||
    isCheckingOut;

  const onCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds: getCheckoutProductIds(lines) }),
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const errorData = getCheckoutErrorPayload(data);
        const invalidProductIds = errorData.invalidProductIds ?? [];
        const insufficientStockItems = errorData.insufficientStockItems ?? [];

        if (invalidProductIds.length > 0) {
          const productNames = invalidProductIds.map((productId) => {
            return productNameById.get(productId) ?? `prekė (${productId.slice(0, 8)})`;
          });

          toast.error(`Šios prekės nebegalimos: ${productNames.join(', ')}.`);
          return;
        }

        if (insufficientStockItems.length > 0) {
          const stockDetails = insufficientStockItems.map((item) => {
            const productName = productNameById.get(item.productId) ?? `prekė (${item.productId.slice(0, 8)})`;
            return `${productName} (likutis: ${item.available}, pasirinkta: ${item.requested})`;
          });

          toast.error(`Pasikeitė likučiai: ${stockDetails.join('; ')}.`);
          return;
        }

        toast.error(errorData.message ?? 'Nepavyko inicijuoti atsiskaitymo. Bandyk dar kartą.');
        return;
      }

      if (!isRecord(data) || typeof data.url !== 'string') {
        toast.error('Nepavyko inicijuoti atsiskaitymo. Bandyk dar kartą.');
        return;
      }

      window.location.href = data.url;
    } catch {
      toast.error('Nepavyko inicijuoti atsiskaitymo. Bandyk dar kartą.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    itemCount,
    subtotal,
    remainingForFreeShipping,
    freeShippingProgress,
    hasFreeShipping,
    shippingPrice,
    hasOutOfStockProducts,
    hasInsufficientStock,
    isCheckoutDisabled,
    isCheckingOut,
    onCheckout,
  };
};

export type CartSummary = ReturnType<typeof useCartSummary>;

const getCheckoutErrorPayload = (value: unknown): CheckoutErrorPayload => {
  if (!isRecord(value)) {
    return {};
  }

  const payload: CheckoutErrorPayload = {};
  const message = value.message;
  const invalidProductIds = value.invalidProductIds;
  const insufficientStockItems = value.insufficientStockItems;

  if (typeof message === 'string') {
    payload.message = message;
  }

  if (Array.isArray(invalidProductIds)) {
    payload.invalidProductIds = invalidProductIds.filter(isString);
  }

  if (Array.isArray(insufficientStockItems)) {
    payload.insufficientStockItems = insufficientStockItems.filter(isInsufficientStockItem);
  }

  return payload;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isInsufficientStockItem = (
  value: unknown,
): value is NonNullable<CheckoutErrorPayload['insufficientStockItems']>[number] => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.productId === 'string' && typeof value.requested === 'number' && typeof value.available === 'number'
  );
};
