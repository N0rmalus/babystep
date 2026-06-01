import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <Container className="gap-10 py-10 sm:py-16 lg:gap-14 lg:py-20">
      <div className="max-w-4xl space-y-5">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-16 w-full max-w-2xl sm:h-20" />
        <Skeleton className="h-8 w-full max-w-3xl" />
        <Skeleton className="h-5 w-52" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          {[0, 1, 2, 3, 4, 5, 6].map((item) => (
            <Skeleton key={item} className="h-5 w-full" />
          ))}
        </div>

        <div className="space-y-10">
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-5 border-b border-tumbleweed-100 pb-10">
              <Skeleton className="h-10 w-72 max-w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-11/12" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Loading;
