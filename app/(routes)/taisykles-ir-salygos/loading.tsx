import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <Container>
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-80 max-w-full" />
        <Skeleton className="h-7 w-full max-w-3xl" />
      </div>

      <Skeleton className="h-5 w-52" />

      <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20">
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="ml-8 h-4 w-10/12" />
              <Skeleton className="ml-8 h-4 w-8/12" />
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-5 border-b border-tumbleweed-100 pb-8">
              <Skeleton className="h-9 w-72 max-w-full" />
              <Skeleton className="h-7 w-64 max-w-full" />
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
