import { Skeleton } from 'babysteps-store';

export const ProductCardLoading = () => (
  <div className="border-line shadow-card flex w-64 flex-col overflow-hidden rounded-3xl border bg-white">
    <Skeleton className="aspect-4/3 w-full rounded-none" />
    <div className="flex flex-col gap-3 p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-8 w-full rounded-full" />
    </div>
  </div>
);

export const TextLines = () => (
  <div className="flex w-80 flex-col gap-2">
    <Skeleton className="h-6 w-2/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);
