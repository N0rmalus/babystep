import Image from 'next/image';

export const EmptyFilteredProductsState = () => {
  return (
    <div className="relative flex min-h-80 justify-center overflow-hidden px-5 py-10 text-center sm:px-8 sm:py-14">
      <div
        className="from-tumbleweed-100/70 via-tumbleweed-50/60 absolute top-1/2 left-1/2 h-32 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="from-tumbleweed-200/0 via-tumbleweed-200 to-tumbleweed-200/0 absolute top-1/2 right-8 left-8 hidden h-px bg-linear-to-r sm:block"
        aria-hidden="true"
      />

      <div className="relative flex max-w-2xl flex-col items-center gap-4 px-4 sm:flex-row sm:gap-8 sm:px-10">
        <div className="relative shrink-0">
          <span
            className="bg-tumbleweed-300/70 absolute top-8 left-8 size-2 rounded-full shadow-[0_0_18px_rgba(199,110,72,0.45)]"
            aria-hidden="true"
          />
          <span
            className="bg-tumbleweed-200/80 absolute top-14 right-6 size-1.5 rounded-full shadow-[0_0_14px_rgba(217,163,127,0.5)]"
            aria-hidden="true"
          />
          <Image
            src="/empty-state-catalog.png"
            alt="Tuščias prekių katalogas"
            width={500}
            height={500}
            className="animate-empty-state-image-float relative h-auto w-40 drop-shadow-2xl sm:w-48 md:w-56 lg:w-64"
          />
          <div
            className="absolute right-8 -bottom-1 left-8 h-3 rounded-full bg-neutral-950/10 blur-md"
            aria-hidden="true"
          />
        </div>

        <div className="relative text-center sm:text-left">
          <h2 className="font-accent text-tumbleweed-700 text-3xl font-semibold sm:text-4xl">
            Prekių pagal{' '}
            <span className="relative z-0 inline-block">
              filtrus
              <span
                className="bg-tumbleweed-400/50 absolute right-0 -bottom-0.5 left-0 -z-10 h-3 rounded-full"
                aria-hidden="true"
              />
            </span>{' '}
            neradome
          </h2>
        </div>
      </div>
    </div>
  );
};
