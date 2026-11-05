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

type ResolvedProductFetchResult = { status: 'success'; product: Product } | { status: 'missing' } | { status: 'error' };

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

type ResolvedState = {
  productById: Map<string, Product>;
  missingIds: Set<string>;
  failedIds: Set<string>;
};

const INITIAL_STATE: ResolvedState = {
  productById: new Map(),
  missingIds: new Set(),
  failedIds: new Set(),
};

const isSameProduct = (current: Product, next: Product) => JSON.stringify(current) === JSON.stringify(next);

const mergeResults = (
  previous: ResolvedState,
  entries: (readonly [string, ResolvedProductFetchResult])[],
): ResolvedState => {
  const productById = new Map(previous.productById);
  const missingIds = new Set(previous.missingIds);
  const failedIds = new Set(previous.failedIds);
  let hasChanged = false;

  entries.forEach(([productId, result]) => {
    if (result.status === 'success') {
      const cached = productById.get(productId);

      if (!cached || !isSameProduct(cached, result.product)) {
        productById.set(productId, result.product);
        hasChanged = true;
      }

      hasChanged = missingIds.delete(productId) || hasChanged;
      hasChanged = failedIds.delete(productId) || hasChanged;
      return;
    }

    if (result.status === 'missing') {
      hasChanged = productById.delete(productId) || hasChanged;
      hasChanged = failedIds.delete(productId) || hasChanged;

      if (!missingIds.has(productId)) {
        missingIds.add(productId);
        hasChanged = true;
      }

      return;
    }

    if (productById.has(productId) || failedIds.has(productId)) {
      return;
    }

    failedIds.add(productId);
    hasChanged = true;
  });

  return hasChanged ? { productById, missingIds, failedIds } : previous;
};

const useResolvedProducts = (productIds: string[]): UseResolvedProductsResult => {
  const [state, setState] = useState(INITIAL_STATE);
  const [refreshVersion, setRefreshVersion] = useState(0);

  const sanitizedProductIds = useMemo(() => {
    return productIds.filter(
      (productId): productId is string => typeof productId === 'string' && productId.trim().length > 0,
    );
  }, [productIds]);
  const uniqueIdsKey = getUniqueProductIds(sanitizedProductIds).join(',');

  const refetch = useCallback(() => {
    setRefreshVersion((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!uniqueIdsKey) {
      return;
    }

    let isCancelled = false;

    const resolveProducts = async () => {
      const entries = await Promise.all(
        uniqueIdsKey.split(',').map(async (productId) => [productId, await fetchProductById(productId)] as const),
      );

      if (!isCancelled) {
        setState((previous) => mergeResults(previous, entries));
      }
    };

    resolveProducts();

    return () => {
      isCancelled = true;
    };
  }, [refreshVersion, uniqueIdsKey]);

  return useMemo(() => {
    const { productById, missingIds, failedIds } = state;

    return {
      products: sanitizedProductIds
        .map((productId) => productById.get(productId))
        .filter((product): product is Product => Boolean(product)),
      missingProductIds: getUniqueProductIds(sanitizedProductIds.filter((productId) => missingIds.has(productId))),
      failedProductIds: getUniqueProductIds(sanitizedProductIds.filter((productId) => failedIds.has(productId))),
      isLoading: sanitizedProductIds.some(
        (productId) => !productById.has(productId) && !missingIds.has(productId) && !failedIds.has(productId),
      ),
      refetch,
    };
  }, [refetch, sanitizedProductIds, state]);
};

export default useResolvedProducts;
