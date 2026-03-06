'use client';

import Image from 'next/image';
import { Expand, Heart, ShoppingCart, X } from 'lucide-react';

import { Product } from '@/actions/types';
import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';

interface ProductCard {
  data: Product;
}

export const ProductCardImage: React.FC<{
  imageUrl: string;
  onPreview?: MouseEventHandler<HTMLButtonElement>;
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
  onAddToWishlist?: MouseEventHandler<HTMLButtonElement>;
  onRemoveFromWishlist?: MouseEventHandler<HTMLButtonElement>;
}> = ({ imageUrl, onPreview, onAddToCart, onAddToWishlist, onRemoveFromWishlist }) => (
  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm">
    <Image
      src={imageUrl}
      fill
      alt="Image"
      className="aspect-square rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
      <div className="flex justify-center gap-x-4">
        {onPreview && (
          <IconButton
            onClick={onPreview}
            icon={<Expand size={20} className="text-gray-700" />}
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

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const previewModal = usePreviewModal();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data.id);
  };

  const onAddToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    wishlist.addItem(data.id);
  };

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <ProductCardImage
        imageUrl={data?.images?.[0]?.url}
        onPreview={onPreview}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="truncate text-base font-semibold text-gray-900">{data.name}</p>
          <div className="flex flex-row items-center gap-2">
            <p className="mt-1 text-xs text-gray-500">{data.subcategory.category.name}</p>
            <div className="mt-[4px] h-[4px] w-[4px] rounded-full bg-tumbleweed-400" />
            <p className="mt-1 text-xs text-gray-500">{data.subcategory.name}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Currency value={data?.price} />
          {/* TODO: add a badge for new/featured products here */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
