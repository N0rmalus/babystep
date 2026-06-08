'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Maximize2 } from 'lucide-react';
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
      <button
        onClick={() => setOpen(true)}
        className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-xs font-semibold text-neutral-700 shadow-xs"
        title="Priartinti"
      >
        <Maximize2 size={18} className="text-neutral-700" />
      </button>

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
