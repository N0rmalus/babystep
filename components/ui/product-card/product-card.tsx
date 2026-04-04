'use client';

import { Product } from '@/actions/types';
import Currency from '@/components/ui/currency';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { ProductCardImage } from '@/components/ui/product-card/product-card-image';

type Props = {
  data: Product;
};

const ProductCard = ({ data }: Props) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview = () => {
    previewModal.onOpen(data);
  };

  const onAddToCart = () => {
    cart.addItem(data.id);
  };

  const onAddToWishlist = () => {
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
