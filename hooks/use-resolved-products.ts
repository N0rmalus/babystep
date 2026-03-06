'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Product } from '@/actions/types';

type UseResolvedProductsResult = {
  products: Product[];
  missingProductIds: string[];
  failedProductIds: string[];
  isLoading: boolean;
  refetch: () => void;
};

type ResolvedProductFetchResult =
  | { status: 'success'; product: Product }
  | { status: 'missing' }
  | { status: 'error' };

const getUniqueProductIds = (productIds: string[]) => {
  return Array.from(new Set(productIds));
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const PRODUCT_RESOLVE_TIMEOUT_MS = 8000;

const fetchProductById = async (productId: string): Promise<ResolvedProductFetchResult> => {
  if (!apiUrl) {
    return { status: 'error' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PRODUCT_RESOLVE_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiUrl}/products/${productId}`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    if (response.status === 404) {
      return { status: 'missing' };
    }

    if (!response.ok) {
      return { status: 'error' };
    }

    const product = (await response.json()) as Product | null;

    if (!product?.id) {
      return { status: 'missing' };
    }

    return { status: 'success', product };
  } catch {
    return { status: 'error' };
  } finally {
    clearTimeout(timeout);
  }
};

const useResolvedProducts = (productIds: string[]): UseResolvedProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [missingProductIds, setMissingProductIds] = useState<string[]>([]);
  const [failedProductIds, setFailedProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);

  const sanitizedProductIds = useMemo(() => {
    return productIds.filter((productId): productId is string => typeof productId === 'string' && productId.trim().length > 0);
  }, [productIds]);

  const refetch = useCallback(() => {
    setRefreshVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const resolveProducts = async () => {
      if (!apiUrl) {
        if (!isCancelled) {
          setProducts([]);
          setMissingProductIds([]);
          setFailedProductIds([]);
          setIsLoading(false);
        }

        return;
      }

      if (sanitizedProductIds.length === 0) {
        setProducts([]);
        setMissingProductIds([]);
        setFailedProductIds([]);
        setIsLoading(false);

        return;
      }

      setIsLoading(true);

      const uniqueProductIds = getUniqueProductIds(sanitizedProductIds);
      const productEntries = await Promise.all(
        uniqueProductIds.map(async (productId) => {
          const result = await fetchProductById(productId);
          return [productId, result] as const;
        }),
      );

      if (isCancelled) {
        return;
      }

      const productById = new Map<string, Product>();
      const missingIds: string[] = [];
      const failedIds: string[] = [];

      productEntries.forEach((entry) => {
        if (!entry) {
          return;
        }

        const [productId, result] = entry;

        if (result.status === 'success') {
          productById.set(productId, result.product);
          return;
        }

        if (result.status === 'missing') {
          missingIds.push(productId);
          return;
        }

        failedIds.push(productId);
      });

      const resolvedProducts = sanitizedProductIds
        .map((productId) => productById.get(productId))
        .filter((product): product is Product => Boolean(product));

      setProducts(resolvedProducts);
      setMissingProductIds(getUniqueProductIds(missingIds));
      setFailedProductIds(getUniqueProductIds(failedIds));
      setIsLoading(false);
    };

    resolveProducts();

    return () => {
      isCancelled = true;
    };
  }, [refreshVersion, sanitizedProductIds]);

  return {
    products,
    missingProductIds,
    failedProductIds,
    isLoading,
    refetch,
  };
};

export default useResolvedProducts;
