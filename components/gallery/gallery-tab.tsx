'use client';

import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';
import { Image as ImageType } from '@/types';

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-lg">
            <Image fill src={image.url} alt="" className="object-cover object-center" />
          </span>
          <span
            className={cn(
              'absolute inset-0 rounded-lg ring-2 ring-offset-2 transition',
              selected ? 'ring-black ring-opacity-60' : 'ring-transparent',
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
