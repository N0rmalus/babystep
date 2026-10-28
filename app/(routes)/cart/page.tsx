'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { PageContainer } from '@/components/ui/page-container';
import useCart from '@/hooks/use-cart';
import { useCartSummary } from '@/hooks/use-cart-summary';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import { CartItem } from './components/cart-item';
import { CartLoadingState } from './components/cart-loading-state';
import { CartProgress } from './components/cart-progress';
import { Summary } from './components/summary';
import { ProductListFailedBox } from '@/components/product-list-failed-box';
import { PageHeader } from '@/components/page-header';
import { CartEmptyState } from '@/app/(routes)/cart/components/cart-empty-state';

const CartPage = () => {
  const isMounted = useMounted();
  const lines = useCart((state) => state.items);
  const removeItems = useCart((state) => state.removeItems);
  const productIdsKey = lines.map((line) => line.productId).join(',');
  const itemIds = useMemo(() => (productIdsKey ? productIdsKey.split(',') : []), [productIdsKey]);

  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);
  const quantityByProductId = new Map(lines.map((line) => [line.productId, line.quantity]));
  const cartSummary = useCartSummary({
    lines,
    products,
    isLoading,
    failedProductIds,
  });

  const onFocusRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useFocusRefresh({
    onRefresh: onFocusRefresh,
    enabled: isMounted,
  });

  useEffect(() => {
    if (missingProductIds.length === 0) {
      return;
    }

    if (!missingProductIds.some((productId) => itemIds.includes(productId))) {
      return;
    }

    removeItems(missingProductIds);
  }, [itemIds, missingProductIds, removeItems]);

  if (!isMounted) {
    return null;
  }

  const isResolvingProducts = isLoading || missingProductIds.length > 0 || failedProductIds.length > 0;
  const isCartEmpty = itemIds.length === 0;

  if (isCartEmpty) {
    return (
      <PageContainer className="flex flex-col gap-8">
        <CartEmptyState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader bigText="Paruošta atsiskaitymui" smallText="Tavo krepšelis" />

      {!isCartEmpty && isResolvingProducts && !(failedProductIds.length > 0) && <CartLoadingState />}

      {failedProductIds.length > 0 && <ProductListFailedBox onFocusRefresh={onFocusRefresh} />}

      {!isCartEmpty && !isResolvingProducts && (
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-5 lg:col-span-7">
            <CartProgress
              freeShippingProgress={cartSummary.freeShippingProgress}
              remainingForFreeShipping={cartSummary.remainingForFreeShipping}
            />

            <ul className="space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} data={product} quantity={quantityByProductId.get(product.id) ?? 1} />
              ))}
            </ul>
          </div>

          <Summary lines={lines} products={products} cartSummary={cartSummary} />
        </div>
      )}
    </PageContainer>
  );
};

export default CartPage;
