import Skeleton from '@/components/ui/skeleton';

export const CartLoadingState = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="space-y-5 lg:col-span-7">
        <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs sm:p-6">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-4 h-2.5 w-full" />
          <Skeleton className="mt-3 h-4 w-72 max-w-full" />
        </div>

        <ul className="space-y-4">
          {[0, 1, 2].map((index) => (
            <li key={index} className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-xs sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <Skeleton className="h-32 w-full rounded-2xl sm:h-36 sm:w-36" />

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>

                    <Skeleton className="mt-4 h-6 w-52 max-w-full" />
                    <Skeleton className="mt-3 h-4 w-full" />
                    <Skeleton className="mt-2 h-4 w-4/5" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Skeleton className="h-8 w-32 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5">
        <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-xs sm:p-6">
          <Skeleton className="h-6 w-40" />
          <div className="space-y-3 border-b border-neutral-200 pb-5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <Skeleton className="h-5 w-full" />

          <div className="rounded-2xl border border-neutral-200 p-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-2 h-10 w-full rounded-lg" />
          </div>

          <Skeleton className="h-11 w-full rounded-xl" />
          <Skeleton className="h-4 w-56 max-w-full" />
        </div>
      </div>
    </div>
  );
};
