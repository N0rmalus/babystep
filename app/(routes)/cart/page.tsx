'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

import Button from '@/components/ui/button';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useResolvedProducts from '@/hooks/use-resolved-products';

import CartEmptyState from './components/cart-empty-state';
import { CartItem } from './components/cart-item';
import { CartLoadingState } from './components/cart-loading-state';
import { CartProgress } from './components/cart-progress';
import { Summary } from './components/summary';

const FREE_SHIPPING_THRESHOLD = 120;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const itemIds = useCart((state) => state.items);
  const setItems = useCart((state) => state.setItems);

  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);

  const subtotal = useMemo(() => {
    return products.reduce((total, product) => total + Number(product.price), 0);
  }, [products]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <Container className="pb-16 pt-10 sm:pt-14">
      <div>
        <div className="relative flex flex-col items-start gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tumbleweed-700">Pirkinių krepšelis</p>
          <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Paruošta atsiskaitymui</h1>
        </div>
      </div>

      {isCartEmpty && <CartEmptyState />}

      {!isCartEmpty && isResolvingProducts && !(failedProductIds.length > 0) && <CartLoadingState />}

      {failedProductIds.length > 0 && (
        <div className="flex items-center justify-center">
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex rounded-full bg-rose-100 p-2 text-rose-600">
                <AlertTriangle size={16} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-rose-700">Nepavyko atnaujinti dalies krepšelio prekių</p>

                <Button
                  size="sm"
                  variant="secondary"
                  label="Bandyti iš naujo"
                  elementBefore={<RotateCcw size={14} />}
                  className="mt-3 rounded-lg border-rose-200 bg-white text-rose-700 hover:bg-rose-100"
                  onClick={onFocusRefresh}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {!isCartEmpty && !isResolvingProducts && (
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start">
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
            className="lg:col-span-5"
          />
        </div>
      )}
    </Container>
  );
};

export default CartPage;
