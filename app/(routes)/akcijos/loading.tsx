import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <Container className="flex flex-col gap-4">
      <Skeleton className="h-10 w-44 rounded-xl" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))] gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Skeleton key={item} className="h-96 rounded-3xl" />
        ))}
      </div>
    </Container>
  );
};

export default Loading;
