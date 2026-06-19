'use client';
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Image as ImageType } from '@/actions/types';
import { GalleryTab } from '@/components/gallery/gallery-tab';
import { ImageLightbox } from '@/components/ui/image-lightbox';
import { IMAGE_PLACEHOLDER_URL } from '@/lib/consts';
import { getImageUrl } from '@/lib/image-url';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface Props {
  images: ImageType[];
  wishlistProductId?: string;
}

export const Gallery = ({ images, wishlistProductId }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-dashed border-neutral-300 bg-neutral-50">
        <GalleryWishlistButton productId={wishlistProductId} />
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

  const goToPreviousImage = () => {
    setSelectedIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  };

  const goToNextImage = () => {
    setSelectedIndex((currentIndex) => (currentIndex === images.length - 1 ? 0 : currentIndex + 1));
  };

  return (
    <Tab.Group as="div" selectedIndex={selectedIndex} onChange={setSelectedIndex} className="flex flex-col">
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id} className="focus:outline-hidden">
            <div className="group bg-tumbleweed-50 relative aspect-square h-full w-full overflow-hidden rounded-3xl border border-neutral-200 shadow-sm">
              <GalleryWishlistButton productId={wishlistProductId} />
              <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="tap-surface absolute top-1/2 left-4 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-900 opacity-0 shadow-sm transition group-hover:opacity-100 sm:inline-flex"
                    aria-label="Ankstesnė nuotrauka"
                  >
                    <ChevronLeft size={21} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="tap-surface absolute top-1/2 right-4 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-900 opacity-0 shadow-sm transition group-hover:opacity-100 sm:inline-flex"
                    aria-label="Kita nuotrauka"
                  >
                    <ChevronRight size={21} />
                  </button>
                </>
              )}
              <ImageLightbox
                images={images.map((img) => ({ src: getImageUrl(img.url) }))}
                alt="Produkto nuotrauka"
                className="cursor-pointer object-cover object-center"
                startIndex={selectedIndex}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>

      <div className="w-full overflow-x-auto p-2">
        <Tab.List className="flex w-max gap-3">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
    </Tab.Group>
  );
};

const GalleryWishlistButton = ({ productId }: { productId?: string }) => {
  const wishlist = useWishlist();
  const isSmallScreen = useIsMobile('sm');
  const isInWishlist = productId ? wishlist.hasItem(productId) : false;

  if (!productId) {
    return null;
  }

  const toggleWishlist = () => {
    if (isInWishlist) {
      wishlist.removeItem(productId);

      return;
    }

    wishlist.addItem(productId);
  };

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      aria-label={isInWishlist ? 'Pašalinti iš norų sąrašo' : 'Į norų sąrašą'}
      aria-pressed={isInWishlist}
      className="tap-surface size-10 sm:size-12 absolute top-4 right-4 z-20 flex items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-900 shadow-md backdrop-blur transition hover:bg-white sm:hidden "
    >
      <Heart size={isSmallScreen ? 20 : 24} className={cn(isInWishlist && 'fill-tumbleweed-500 text-tumbleweed-700')} />
    </button>
  );
};
