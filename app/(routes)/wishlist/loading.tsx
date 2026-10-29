import { PageContainer } from '@/components/ui/page-container';
import Skeleton from '@/components/ui/skeleton';

import { WishlistLoadingState } from './components/wishlist-loading-state';

const Loading = () => {
  return (
    <PageContainer>
      <div>
        <div className="space-y-3 pb-6 sm:pb-10">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </div>
        <WishlistLoadingState />
      </div>
    </PageContainer>
  );
};

export default Loading;
