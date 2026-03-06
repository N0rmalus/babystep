'use client';

import { useCallback, useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useResolvedProducts from '@/hooks/use-resolved-products';

import Summary from './components/summary';
import CartItem from './components/cart-item';
import { cn } from '@/lib/utils';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const itemIds = useCart((state) => state.items);
  const setItems = useCart((state) => state.setItems);
  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);

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
    <Container>
      <div className="mb-16 mt-16">
        <h1 className="pb-4 text-3xl font-bold text-black"> Pirkinių krepšelis </h1>
        <div className="gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            {isCartEmpty && <p className="text-neutral-500"> Pirkinių krepšelis tuščias. </p>}
            {!isCartEmpty && isResolvingProducts && (
              <p className="text-sm text-neutral-500">Atnaujiname krepšelio prekes...</p>
            )}
            {failedProductIds.length > 0 && (
              <p className="text-sm text-rose-500">
                Nepavyko atnaujinti kai kurių prekių. Patikrinkite API ryšį ir bandykite atnaujinti puslapį.
              </p>
            )}
            <ul>
              {products.map((item, index) => (
                <div key={`${item.id}-${index}`} className={cn(index !== products.length - 1 && 'border-b')}>
                  <CartItem data={item} />
                </div>
              ))}
            </ul>
          </div>
          <Summary productIds={itemIds} products={products} isResolvingProducts={isResolvingProducts} />
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
