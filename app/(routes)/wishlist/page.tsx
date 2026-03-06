'use client';

import { useCallback, useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useWishlist from '@/hooks/use-wishlist';
import useResolvedProducts from '@/hooks/use-resolved-products';
import WishlistCard from '@/app/(routes)/wishlist/components/wishlist-item';

const WishlistPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const itemIds = useWishlist((state) => state.items);
  const setItems = useWishlist((state) => state.setItems);
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

  const isWishlistEmpty = itemIds.length === 0;
  const isResolvingProducts = isLoading || missingProductIds.length > 0 || failedProductIds.length > 0;

  return (
    <Container>
      <div className="mb-16 mt-16">
        <h1 className="text-3xl font-bold text-gray-900"> Norų sąrašas ({itemIds.length}) </h1>
        <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-12 lg:grid-cols-4">
            {isWishlistEmpty && <p className="text-neutral-500"> Norų sąrašas tuščias. </p>}
            {!isWishlistEmpty && isResolvingProducts && (
              <p className="text-sm text-neutral-500">Atnaujiname norų sąrašo prekes...</p>
            )}
            {failedProductIds.length > 0 && (
              <p className="text-sm text-rose-500">
                Nepavyko atnaujinti kai kurių prekių. Patikrinkite API ryšį ir bandykite atnaujinti puslapį.
              </p>
            )}
            {products.map((item) => (
              <WishlistCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WishlistPage;
