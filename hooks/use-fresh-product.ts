'use client';

import { useEffect, useState } from 'react';

import type { Product } from '@/actions/types';
import { fetchProductById } from '@/hooks/use-resolved-products';

export const useFreshProduct = (product: Product | undefined, isEnabled: boolean): Product | undefined => {
  const [freshProduct, setFreshProduct] = useState<Product>();
  const [wasEnabled, setWasEnabled] = useState(isEnabled);
  const productId = product?.id;

  if (wasEnabled !== isEnabled) {
    setWasEnabled(isEnabled);
    setFreshProduct(undefined);
  }

  useEffect(() => {
    if (!productId || !isEnabled) {
      return;
    }

    let isCancelled = false;

    fetchProductById(productId).then((result) => {
      if (!isCancelled && result.status === 'success') {
        setFreshProduct(result.product);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [productId, isEnabled]);

  return freshProduct?.id === productId ? freshProduct : product;
};
