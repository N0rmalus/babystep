'use client';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { Image as ImageType } from '@/actions/types';
import { GalleryTab } from '@/components/gallery/gallery-tab';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { IMAGE_PLACEHOLDER_URL } from '@/lib/consts';
import { getImageUrl } from '@/lib/image-url';

interface Props {
  images: ImageType[];
}

export const Gallery = ({ images }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="border-line-strong bg-muted-soft relative aspect-square overflow-hidden rounded-2xl border border-dashed">
        <Image
          src={IMAGE_PLACEHOLDER_URL}
          alt="Nuotraukų nėra"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
      </div>
    );
  }

  return (
    <Tab.Group as="div" selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex flex-col">
      {/* Main Image */}
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id} className="focus:outline-hidden">
            <div className="shadow-card relative aspect-square h-full w-full overflow-hidden rounded-2xl">
              <div className="text-ink-soft absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold shadow-xs">
                {selectedIndex + 1} / {images.length}
              </div>
              <ImageLightbox
                images={images.map((img) => ({ src: getImageUrl(img.url) }))}
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
