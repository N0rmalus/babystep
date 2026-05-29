'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import Container from '@/components/ui/container';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import useWishlist from '@/hooks/use-wishlist';
import { WishlistItem } from './components/wishlist-item';
import { WishlistLoadingState } from './components/wishlist-loading-state';
import { StockFilter, WishlistSort, WishlistToolbar } from './components/wishlist-toolbar';
import { getProductEffectivePrice } from '@/business/product-pricing';
import Button from '@/components/ui/button';
import { LinkButton } from '@/components/ui/link-button';
import { ProductListFailedBox } from '@/components/product-list-failed-box';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { PageHeader } from '@/components/page-header';
import { EmptyWishlistState } from '@/app/(routes)/wishlist/components/empty-wishlist-state';

const WishlistPage = () => {
  const isMounted = useMounted();
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [sortBy, setSortBy] = useState<WishlistSort>('price-desc');

  const itemIds = useWishlist((state) => state.items);
  const setItems = useWishlist((state) => state.setItems);
  const removeAll = useWishlist((state) => state.removeAll);
  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const matchesSearch = (value: string) => value.toLowerCase().includes(normalizedSearch);

    const filtered = products.filter((item) => {
      const searchPass =
        normalizedSearch.length === 0 ||
        matchesSearch(item.name) ||
        matchesSearch(item.subcategory.name) ||
        matchesSearch(item.subcategory.category.name);

      const stockPass =
        stockFilter === 'all' ||
        (stockFilter === 'in-stock' && item.amountInStock > 0) ||
        (stockFilter === 'low-stock' && item.amountInStock > 0 && item.amountInStock <= 3);

      return searchPass && stockPass;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return getProductEffectivePrice(a) - getProductEffectivePrice(b);
      }

      if (sortBy === 'price-desc') {
        return getProductEffectivePrice(b) - getProductEffectivePrice(a);
      }

      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name, 'lt-LT');
      }

      return b.amountInStock - a.amountInStock;
    });
  }, [products, searchQuery, sortBy, stockFilter]);

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

  const onResetFilters = () => {
    setSearchQuery('');
    setStockFilter('all');
    setSortBy('price-desc');
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
    )
  }

  return (
    <Container>
      <PageHeader
        title="Norų sąrašas"
        description={
          itemIds.length === 0
            ? 'Sąrašas dar tuščias. Peržiūrėk katalogą ir išsisaugok patikusias prekes.'
            : `${products.length} prekės laukia, kol nuspręsi dėl pirkimo.`
        }
      />

      {!isWishlistEmpty && isResolvingProducts && !(failedProductIds.length > 0) && <WishlistLoadingState />}

      {failedProductIds.length > 0 && <ProductListFailedBox onFocusRefresh={onFocusRefresh} />}

      {!isWishlistEmpty && !isResolvingProducts && (
        <div className="flex flex-col gap-8">
          <WishlistToolbar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            visibleCount={filteredItems.length}
            totalCount={products.length}
          />

          {!(filteredItems.length > 0) && !isResolvingProducts ? (
            <div className="flex flex-col items-center justify-center gap-5 py-20">
              <p className="text-lg font-semibold text-neutral-900">Prekių nerasta</p>
              <p className="text-sm text-neutral-600">Pabandykite pakoreguoti paiešką arba atstatyti filtrus.</p>
              <button
                onClick={onResetFilters}
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-80"
              >
                Atstatyti filtrus
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <WishlistItem key={item.id} data={item} />
              ))}
            </div>
          )}

          <PaperWrapper className="flex flex-col items-center gap-4 border-dashed md:flex-row md:justify-between">
            <p className="text-neutral-600">Dar neradai ko ieškai? Peržiūrėk visas kategorijas.</p>
            <div className="flex items-center gap-2">
              <LinkButton href="/" label="Tęsti naršymą" variant="secondary" size="sm" />
              <Button
                onClick={onClearWishlist}
                elementBefore={<Trash2 size={15} />}
                variant="danger"
                size="sm"
                label="Išvalyti sąrašą"
              />
            </div>
          </PaperWrapper>
        </div>
      )}
    </Container>
  );
};

export default WishlistPage;
