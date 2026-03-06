'use client';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Image as ImageType } from '@/actions/types';
import { GalleryTab } from '@/components/gallery/gallery-tab';
import { ImageLightbox } from '@/components/ui/image-lightbox';

interface Props {
  images: ImageType[];
}

export const Gallery = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 text-sm font-medium text-neutral-500">
        Nuotraukų nėra
      </div>
    );
  }

  return (
    <Tab.Group as="div" selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex flex-col">
      {/* Main Image */}
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id} className="focus:outline-none">
            <div className="relative aspect-square h-full w-full overflow-hidden rounded-2xl shadow-md">
              <div className="absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
                {selectedIndex + 1} / {images.length}
              </div>
              <ImageLightbox
                images={images.map((img) => ({ src: img.url }))}
                alt="Gallery Image"
                className="cursor-pointer object-cover object-center"
                startIndex={selectedIndex}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>

      {/* Image List */}
      <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-4">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  );
};
