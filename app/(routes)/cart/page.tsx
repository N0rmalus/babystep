'use client';

import { useCallback, useEffect, useMemo } from 'react';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import { CartItem } from './components/cart-item';
import { CartLoadingState } from './components/cart-loading-state';
import { CartProgress } from './components/cart-progress';
import { Summary } from './components/summary';
import { ProductListFailedBox } from '@/components/product-list-failed-box';
import { PageHeader } from '@/components/page-header';
import { ProductListEmptyBox } from '@/components/product-list-empty-box';

const FREE_SHIPPING_THRESHOLD = 120;

const CartPage = () => {
  const isMounted = useMounted();
  const itemIds = useCart((state) => state.items);
  const setItems = useCart((state) => state.setItems);

  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);

  const subtotal = useMemo(() => {
    return products.reduce((total, product) => total + Number(product.price), 0);
  }, [products]);

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

    const missingProductIdSet = new Set(missingProductIds);
    const nextItemIds = itemIds.filter((itemId) => !missingProductIdSet.has(itemId));
    const didChange =
      nextItemIds.length !== itemIds.length || nextItemIds.some((itemId, index) => itemId !== itemIds[index]);

    if (!didChange) {
      return;
    }

    setItems(nextItemIds);
  }, [itemIds, missingProductIds, setItems]);

  if (!isMounted) {
    return null;
  }

  const isResolvingProducts = isLoading || missingProductIds.length > 0 || failedProductIds.length > 0;
  const isCartEmpty = itemIds.length === 0;

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <PageHeader title="Paruošta atsiskaitymui" description="Pirkinių krepšelis" />

        {isCartEmpty && <ProductListEmptyBox variant="cart" />}

        {!isCartEmpty && isResolvingProducts && !(failedProductIds.length > 0) && <CartLoadingState />}

        {failedProductIds.length > 0 && <ProductListFailedBox onFocusRefresh={onFocusRefresh} />}

        {!isCartEmpty && !isResolvingProducts && (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="space-y-5 lg:col-span-7">
              <CartProgress subtotal={subtotal} freeShippingThreshold={FREE_SHIPPING_THRESHOLD} />

              <ul className="space-y-4">
                {products.map((product) => (
                  <CartItem key={product.id} data={product} />
                ))}
              </ul>
            </div>

            <Summary
              productIds={itemIds}
              products={products}
              isResolvingProducts={isResolvingProducts}
              freeShippingThreshold={FREE_SHIPPING_THRESHOLD}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default CartPage;
