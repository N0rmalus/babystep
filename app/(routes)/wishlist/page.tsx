'use client';

import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

import Container from '@/components/ui/container';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import useWishlist from '@/hooks/use-wishlist';
import { WishlistLoadingState } from './components/wishlist-loading-state';
import { WishlistToolbar } from './components/wishlist-toolbar';
import { ProductListFailedBox } from '@/components/product-list-failed-box';
import { PageHeader } from '@/components/page-header';
import { EmptyWishlistState } from '@/app/(routes)/wishlist/components/empty-wishlist-state';
import useCart from '@/hooks/use-cart';
import { ProductList } from '@/components/product-list';

const WishlistPage = () => {
  const isMounted = useMounted();

  const itemIds = useWishlist((state) => state.items);
  const setItems = useWishlist((state) => state.setItems);
  const removeAll = useWishlist((state) => state.removeAll);
  const cartItems = useCart((state) => state.items);
  const setCartItems = useCart((state) => state.setItems);
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

  const onClearWishlist = () => {
    if (itemIds.length === 0) {
      return;
    }

    if (!window.confirm('Ar tikrai nori išvalyti visą norų sąrašą?')) {
      return;
    }

    removeAll();
    toast.success('Norų sąrašas išvalytas.');
  };

  const onShareWishlist = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: 'Babystep norų sąrašas',
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    toast.success('Nuoroda nukopijuota.');
  };

  const inStockProducts = products.filter((product) => product.amountInStock > 0);
  const productsToAddToCart = inStockProducts.filter((product) => !cartItems.includes(product.id));

  const onAddAllToCart = () => {
    if (productsToAddToCart.length === 0) {
      return;
    }

    setCartItems([...cartItems, ...productsToAddToCart.map((product) => product.id)]);
    toast.success('Prekės pridėtos į krepšelį.');
  };

  if (!isMounted) {
    return null;
  }

  const isWishlistEmpty = itemIds.length === 0;
  const isResolvingProducts = isLoading || missingProductIds.length > 0 || failedProductIds.length > 0;

  if (isWishlistEmpty) {
    return (
      <Container>
        <EmptyWishlistState />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader
        bigText="Norų sąrašas"
        smallText={
          itemIds.length === 0
            ? 'Sąrašas dar tuščias. Peržiūrėk katalogą ir išsisaugok patikusias prekes.'
            : 'Prekės laukia, kol nuspręsi dėl pirkimo.'
        }
      />

      {!isWishlistEmpty && isResolvingProducts && !(failedProductIds.length > 0) && <WishlistLoadingState />}

      {failedProductIds.length > 0 && <ProductListFailedBox onFocusRefresh={onFocusRefresh} />}

      {!isWishlistEmpty && !isResolvingProducts && (
        <div className="flex flex-col gap-8">
          <WishlistToolbar
            savedCount={products.length}
            inStockCount={inStockProducts.length}
            onShare={onShareWishlist}
            onClearWishlist={onClearWishlist}
            onAddAllToCart={onAddAllToCart}
            canAddAllToCart={productsToAddToCart.length > 0}
          />

          <ProductList items={products} variant="grid" wishlistAction="remove" />
        </div>
      )}
    </Container>
  );
};

export default WishlistPage;
