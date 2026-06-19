'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { getImageUrl } from '@/lib/image-url';

interface Props {
  images: { src: string }[];
  alt: string;
  className?: string;
  startIndex?: number;
}

export const ImageLightbox = ({ images, alt, className, startIndex = 0 }: Props) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  return (
    <>
      <Image
        fill
        src={getImageUrl(images.at(currentIndex)?.src)}
        alt={alt}
        className={className}
        onClick={() => setOpen(true)}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
      />

      {open && (
        <Lightbox
          slides={images}
          open={open}
          close={() => setOpen(false)}
          index={currentIndex}
          on={{ view: ({ index }) => setCurrentIndex(index) }}
          plugins={[Fullscreen, Zoom]}
          animation={{ fade: 220, swipe: 280 }}
          styles={{ container: { backgroundColor: 'rgba(12, 12, 14, 0.94)' } }}
        />
      )}
    </>
  );
};
