'use client';

import { ReactNode, TouchEvent, useRef, useState } from 'react';
import Image from 'next/image';

import type { Image as ImageType } from '@/actions/types';
import { IMAGE_PLACEHOLDER_URL } from '@/lib/consts';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';

type Props = {
  images: ImageType[];
  name: string;
  sizes: string;
  expandButton?: (index: number) => ReactNode;
};

const SWIPE_THRESHOLD_PX = 40;

export const ProductGallery = ({ images, name, sizes, expandButton }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const imageCount = images.length;
  const selectedImage = images.at(selectedIndex);

  const showImage = (index: number) => {
    setSelectedIndex((index + imageCount) % imageCount);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartXRef.current = event.touches.item(0).clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;

    if (startX === null || imageCount < 2) {
      return;
    }

    const deltaX = event.changedTouches.item(0).clientX - startX;

    if (deltaX < -SWIPE_THRESHOLD_PX) {
      showImage(selectedIndex + 1);
    }

    if (deltaX > SWIPE_THRESHOLD_PX) {
      showImage(selectedIndex - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 lg:gap-3.5">
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="bg-muted relative aspect-square overflow-hidden rounded-3xl"
      >
        <Image
          fill
          priority
          src={selectedImage ? getImageUrl(selectedImage.url) : IMAGE_PLACEHOLDER_URL}
          alt={imageCount > 0 ? `${name}, ${selectedIndex + 1} nuotrauka iš ${imageCount}` : 'Nuotraukų nėra'}
          className="object-cover"
          sizes={sizes}
        />
        {imageCount > 0 && expandButton && (
          <div className="absolute top-3 right-3 lg:top-4 lg:right-4">{expandButton(selectedIndex)}</div>
        )}
      </div>

      {imageCount > 1 && (
        <div className="grid grid-cols-4 gap-2.5 lg:gap-3.5">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={image.id}
                type="button"
                aria-label={`Rodyti ${index + 1} nuotrauką`}
                aria-current={isSelected}
                onClick={() => showImage(index)}
                className={cn(
                  'bg-muted relative aspect-square overflow-hidden rounded-2xl transition-opacity hover:opacity-85',
                  isSelected ? 'border-ink border-2' : 'border-line border opacity-80',
                )}
              >
                <Image fill src={getImageUrl(image.url)} alt="" className="object-cover" sizes="120px" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
