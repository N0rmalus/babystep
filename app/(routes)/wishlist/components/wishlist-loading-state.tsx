import Skeleton from '@/components/ui/skeleton';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

const WISHLIST_LOADING_ITEMS = [0, 1, 2, 3, 4, 5];

export const WishlistLoadingState = () => {
  return (
    <div className="flex flex-col gap-8">
      <PaperWrapper>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full lg:max-w-lg">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-2 h-10 w-full rounded-xl" />
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] lg:w-auto lg:min-w-[360px]">
            <div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-8 w-28 rounded-full" />
          ))}
          <Skeleton className="ml-auto h-4 w-32" />
        </div>
      </PaperWrapper>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {WISHLIST_LOADING_ITEMS.map((index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <Skeleton className="h-52 w-full" />

            <div className="p-4">
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <div className="mt-4 flex items-center justify-between gap-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>

              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                <Skeleton className="h-9 w-full rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaperWrapper className="flex flex-col items-center gap-4 border-dashed md:flex-row md:justify-between">
        <Skeleton className="h-4 w-72 max-w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 rounded-full" />
          <Skeleton className="h-9 w-36 rounded-full" />
        </div>
      </PaperWrapper>
    </div>
  );
};
