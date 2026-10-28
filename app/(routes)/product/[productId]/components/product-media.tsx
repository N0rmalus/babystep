'use client';

import { useState } from 'react';
import { Expand } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import type { Image } from '@/actions/types';
import { ProductGallery } from '@/components/product/product-gallery';
import IconButton from '@/components/ui/icon-button';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  images: Image[];
  name: string;
};

export const ProductMedia = ({ images, name }: Props) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section aria-label="Nuotraukos">
      <ProductGallery
        images={images}
        name={name}
        sizes="(max-width: 1024px) 100vw, 640px"
        expandButton={(index) => (
          <IconButton
            onClick={() => setLightboxIndex(index)}
            icon={<Expand size={18} />}
            label="Rodyti per visą ekraną"
          />
        )}
      />

      {lightboxIndex !== null && (
        <Lightbox
          open
          close={() => setLightboxIndex(null)}
          index={lightboxIndex}
          slides={images.map((image) => ({ src: getImageUrl(image.url), alt: name }))}
          plugins={[Fullscreen, Zoom]}
          animation={{ fade: 220, swipe: 280 }}
        />
      )}
    </section>
  );
};
