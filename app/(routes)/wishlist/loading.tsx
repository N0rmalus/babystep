import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

import { WishlistLoadingState } from './components/wishlist-loading-state';

const Loading = () => {
  return (
    <Container className="pb-16 pt-10 sm:pt-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-80 max-w-full" />
        </div>
      </div>

      <WishlistLoadingState />
    </Container>
  );
};

export default Loading;
