import Image from 'next/image';
import IconButton from '@/components/ui/icon-button';
import { Expand, Heart, ShoppingCart, X } from 'lucide-react';

type ProductCardImageProps = {
  imageUrl: string;
  onPreview?: () => void;
  onAddToCart: () => void;
  onAddToWishlist?: () => void;
  onRemoveFromWishlist?: () => void;
};

export const ProductCardImage = ({
  imageUrl,
  onPreview,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}: ProductCardImageProps) => (
  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm">
    <Image
      src={imageUrl}
      fill
      alt="Image"
      className="aspect-square rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
    />
    <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
      <div className="flex justify-center gap-x-4">
        {onPreview && (
          <IconButton
            onClick={onPreview}
            icon={<Expand size={20} className="text-gray-700" />}
            variant="primary"
            title="Greitos peržiūros langas"
          />
        )}
        <IconButton
          onClick={onAddToCart}
          icon={<ShoppingCart size={20} className="text-gray-700" />}
          title="Pridėti į krepšelį"
        />
        {onAddToWishlist && (
          <IconButton
            onClick={onAddToWishlist}
            icon={<Heart size={20} className="text-gray-700" />}
            title="Pridėti į norų sąrašą"
          />
        )}
        {onRemoveFromWishlist && (
          <IconButton
            onClick={onRemoveFromWishlist}
            icon={<X size={20} className="text-gray-600" />}
            title="Pašalinti iš norų sąrašo"
          />
        )}
      </div>
    </div>
  </div>
);
