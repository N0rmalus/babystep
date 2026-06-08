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

      <div className="flex flex-wrap gap-3">
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} className="h-10 w-36 rounded-full" />
        ))}
      </div>

      <Skeleton className="mx-auto h-52 w-full max-w-5xl rounded-3xl" />

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1].map((item) => (
            <Skeleton key={item} className="h-60 rounded-3xl" />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1].map((item) => (
            <Skeleton key={item} className="h-56 rounded-3xl" />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Loading;
