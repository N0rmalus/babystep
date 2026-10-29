import Skeleton from '@/components/ui/skeleton';

import { WishlistGrid } from './wishlist-grid';

const WISHLIST_LOADING_ITEMS = [0, 1, 2, 3];

export const WishlistLoadingState = () => {
  return (
    <WishlistGrid>
      {WISHLIST_LOADING_ITEMS.map((index) => (
        <div key={index} className="border-line shadow-card overflow-hidden rounded-2xl border bg-white sm:rounded-3xl">
          <Skeleton className="aspect-square w-full rounded-none sm:aspect-4/3" />

          <div className="p-3 sm:p-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <Skeleton className="mt-4 h-6 w-20" />
            <Skeleton className="mt-4 h-8 w-full rounded-full" />
          </div>
        </div>
      ))}
    </WishlistGrid>
  );
};
