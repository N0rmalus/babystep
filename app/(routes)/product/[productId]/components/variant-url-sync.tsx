'use client';

import { useEffect } from 'react';

import { useProductPurchase } from '@/components/product/product-purchase-provider';
import { VARIANT_ID_PARAM } from '@/lib/consts';

export const VariantUrlSync = () => {
  const { selectedVariantId } = useProductPurchase();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.get(VARIANT_ID_PARAM) === (selectedVariantId ?? null)) {
      return;
    }

    if (selectedVariantId) {
      url.searchParams.set(VARIANT_ID_PARAM, selectedVariantId);
    } else {
      url.searchParams.delete(VARIANT_ID_PARAM);
    }

    window.history.replaceState(null, '', url);
  }, [selectedVariantId]);

  return null;
};
