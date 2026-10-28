import { PageContainer } from '@/components/ui/page-container';
import Skeleton from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <PageContainer>
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-80 max-w-full" />
        <Skeleton className="h-7 w-full max-w-3xl" />
      </div>
    </PageContainer>
  );
};

export default Loading;
