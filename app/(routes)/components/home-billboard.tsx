import Image from 'next/image';

import type { Billboard } from '@/actions/types';
import { BillboardCarouselControls } from '@/app/(routes)/components/billboard-carousel-controls';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  data: Billboard;
};

export const HomeBillboard = ({ data }: Props) => {
  return (
    <section aria-roledescription="carousel" aria-label="Pagrindinis pasiūlymas" className="pt-3 lg:pt-7">
      <div
        aria-roledescription="slide"
        className="border-line bg-muted relative h-80 overflow-hidden rounded-3xl border lg:h-135"
      >
        <Image
          src={getImageUrl(data.imageUrl)}
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
        />
        {data.label && (
          <div className="absolute inset-x-5 top-5.5 lg:inset-y-0 lg:right-auto lg:left-18 lg:flex lg:w-125 lg:flex-col lg:justify-center">
            <h1 className="font-accent text-ink max-w-70 text-4xl leading-none font-bold tracking-tight text-balance lg:max-w-none lg:text-5xl">
              {data.label}
            </h1>
          </div>
        )}
      </div>
      <BillboardCarouselControls />
    </section>
  );
};
