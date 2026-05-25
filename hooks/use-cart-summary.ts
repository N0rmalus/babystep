'use client';

import axios from 'axios';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { Product } from '@/actions/types';
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
  productIds: string[];
  products: Product[];
  isLoading?: boolean;
  failedProductIds?: string[];
};

export const useCartSummary = ({ productIds, products, isLoading = false, failedProductIds = [] }: Props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = useMemo(() => {
    return products.reduce((total, product) => total + Number(product.price), 0);
  }, [products]);

  const productNameById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product.name]));
  }, [products]);

  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const freeShippingProgress =
    FREE_SHIPPING_THRESHOLD > 0 ? Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100) : 100;
  const hasFreeShipping = productIds.length > 0 && remainingForFreeShipping === 0;
  const shippingPrice = productIds.length === 0 || hasFreeShipping ? 0 : STANDARD_SHIPPING_PRICE;
  const hasOutOfStockProducts = products.some((product) => product.amountInStock <= 0);
  const isCheckoutDisabled =
    productIds.length === 0 ||
    isLoading ||
    failedProductIds.length > 0 ||
    products.length === 0 ||
    hasOutOfStockProducts ||
    isCheckingOut;

  const onCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds,
      });

      window.location.href = response.data.url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = getCheckoutErrorPayload(error.response?.data);
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

        if (errorData.message) {
          toast.error(errorData.message);
          return;
        }
      }

      toast.error('Nepavyko inicijuoti atsiskaitymo. Bandyk dar kartą.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    subtotal,
    remainingForFreeShipping,
    freeShippingProgress,
    hasFreeShipping,
    shippingPrice,
    hasOutOfStockProducts,
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
