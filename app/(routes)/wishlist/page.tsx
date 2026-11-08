'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { PageContainer } from '@/components/ui/page-container';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import useWishlist from '@/hooks/use-wishlist';
import { WishlistLoadingState } from './components/wishlist-loading-state';
import { ProductListFailedBox } from '@/components/product-list-failed-box';
import { EmptyWishlistState } from '@/app/(routes)/wishlist/components/empty-wishlist-state';
import type { Product } from '@/actions/types';
import useCart from '@/hooks/use-cart';
import { ProductCard } from '@/components/ui/product-card/product-card';
import { WishlistAddedStatus } from './components/wishlist-added-status';
import { WishlistGrid } from './components/wishlist-grid';
import { WishlistHeader } from './components/wishlist-header';
import { WishlistSignInNote } from './components/wishlist-sign-in-note';
import { getWishlistBulkAdd } from '@/business/wishlist-bulk-add';

type AddedStatus = {
  addedCount: number;
  soldOutNames: string[];
  needsChoiceProducts: Product[];
};

const WishlistPage = () => {
  const isMounted = useMounted();
  const [addedStatus, setAddedStatus] = useState<AddedStatus | null>(null);

  const itemIds = useWishlist((state) => state.items);
  const setItems = useWishlist((state) => state.setItems);
  const cartItems = useCart((state) => state.items);
  const addCartItems = useCart((state) => state.addItems);
  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);

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

  const bulkAdd = getWishlistBulkAdd({ products, cartProductIds: cartItems.map((item) => item.productId) });

  const handleAddAllToCart = () => {
    if (bulkAdd.productsToAdd.length === 0) {
      return;
    }

    addCartItems(bulkAdd.productsToAdd.map((product) => product.id));
    setAddedStatus({
      addedCount: bulkAdd.addedCount,
      soldOutNames: bulkAdd.soldOutProducts.map((product) => product.name.trim()),
      needsChoiceProducts: bulkAdd.needsChoiceProducts,
    });
  };

  if (!isMounted) {
    return null;
  }

  const isWishlistEmpty = itemIds.length === 0;
  const hasFailedProducts = failedProductIds.length > 0;
  const isResolvingProducts = isLoading || missingProductIds.length > 0 || hasFailedProducts;

  if (isWishlistEmpty) {
    return (
      <PageContainer>
        <WishlistSignInNote />
        <EmptyWishlistState />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section>
        <WishlistHeader
          canAddAllToCart={!isResolvingProducts && bulkAdd.productsToAdd.length > 0}
          onAddAllToCart={handleAddAllToCart}
        />

        {addedStatus && (
          <div className="mt-3 sm:mt-5">
            <WishlistAddedStatus
              addedCount={addedStatus.addedCount}
              soldOutNames={addedStatus.soldOutNames}
              needsChoiceProducts={addedStatus.needsChoiceProducts}
            />
          </div>
        )}

        <WishlistSignInNote className="mt-4 sm:mt-6" />

        <div className="pt-6 sm:pt-10">
          {hasFailedProducts && <ProductListFailedBox onFocusRefresh={onFocusRefresh} />}
          {isResolvingProducts && !hasFailedProducts && <WishlistLoadingState />}
          {!isResolvingProducts && (
            <WishlistGrid>
              {products.map((product) => (
                <div key={product.id} className="min-w-0">
                  <ProductCard data={product} wishlistAction="remove" />
                </div>
              ))}
            </WishlistGrid>
          )}
        </div>

        <div className="flex justify-center pt-9 sm:pt-14">
          <Link
            href="/"
            aria-label="Grįžti į parduotuvę"
            className="group text-link inline-flex min-h-11 items-center gap-1.5 font-semibold"
          >
            <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
            Tęsti apsipirkimą
          </Link>
        </div>
      </section>
    </PageContainer>
  );
};

export default WishlistPage;
