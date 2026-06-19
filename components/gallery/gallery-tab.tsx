'use client';

import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/actions/types';
import { getImageUrl } from '@/lib/image-url';

interface Props {
  image: ImageType;
}

export const GalleryTab = ({ image }: Props) => {
  return (
    <Tab className="relative flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-md lg:size-20">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-2xl">
            <Image
              fill
              src={getImageUrl(image.url)}
              alt="Nuotrauka"
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-2xl ring-2 ring-offset-2 transition',
              selected ? 'ring-opacity-80 ring-neutral-950' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  );
};
