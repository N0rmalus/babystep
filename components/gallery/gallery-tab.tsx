'use client';

import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';

interface Props {
  image: ImageType;
}

export const GalleryTab = ({ image }: Props) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-white shadow-sm transition hover:shadow-md">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-lg">
            <Image fill src={image.url} alt="Nuotrauka" className="object-cover object-center" />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-lg ring-2 ring-offset-2 transition',
              selected ? 'ring-tumbleweed-500 ring-opacity-60' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  );
};
