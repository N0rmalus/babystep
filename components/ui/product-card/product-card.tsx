'use client';

import { Product } from '@/actions/types';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import IconButton from '@/components/ui/icon-button';
import { Expand, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';
import { getProductPricing } from '@/business/product-pricing';
import { getImageUrl } from '@/lib/image-url';
import { toCurrency } from '@/business/to-currency';

type Props = {
  data: Product;
};

export const ProductCard = ({ data }: Props) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const isInStock = data.amountInStock > 0;
  const isInCart = cart.items.some((item) => item === data.id);
  const isInWishlist = wishlist.items.some((item) => item === data.id);
  const imageUrl = getImageUrl(data.images?.at(0)?.url);
  const categoryName = data.subcategory?.category?.name ?? 'Kategorija';
  const subcategoryName = data.subcategory?.name ?? 'Subkategorija';

  const pricing = getProductPricing(data);

  const onPreview = () => {
    previewModal.onOpen(data);
  };

  const onAddToCart = () => {
    cart.addItem(data.id);
  };

  const onToggleWishlist = () => {
    if (isInWishlist) {
      wishlist.removeItem(data.id);
      return;
    }

    wishlist.addItem(data.id);
  };

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className={cn(
        'group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-black bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        !isInStock && 'opacity-50',
      )}
    >
      <div className="relative h-52 overflow-hidden bg-neutral-100">
        <Image
          src={imageUrl}
          fill
          loading="eager"
          alt={data.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          {pricing.isOnSale && <Badge label={`-${pricing.discountPercent}%`} variant="rounded" color="salmon" />}
          {!isInStock && <Badge label="Išparduota" variant="rounded" color="rose" />}
        </div>

        <div className="absolute top-3 right-3 bottom-0 flex flex-col gap-2">
          <IconButton onClick={onPreview} variant="primary" icon={<Expand size={16} />} title="Greita peržiūra" />
          <IconButton
            onClick={onToggleWishlist}
            variant="primary"
            icon={<Heart size={16} className={cn(isInWishlist && 'fill-tumbleweed-300')} />}
            title={isInWishlist ? 'Pašalinti iš norų sąrašo' : 'Įtraukti į norų sąrašą'}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex min-h-22 flex-1 flex-col justify-between">
          <div>
            <h3 className="text-base leading-tight font-semibold text-neutral-900">{data.name}</h3>
            <p className="mt-2 text-xs text-neutral-500">
              {categoryName} • {subcategoryName}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div>
              {pricing.isOnSale && (
                <div className="text-xs font-medium text-neutral-400 line-through">
                  {toCurrency(pricing.regularPrice)}
                </div>
              )}
              <div
                className={cn(
                  'font-accent text-lg font-bold',
                  pricing.isOnSale ? 'text-salmon-800' : 'text-neutral-900',
                )}
              >
                {toCurrency(pricing.effectivePrice)}
              </div>
            </div>
            <p className="text-xs text-neutral-500">Likutis: {Math.max(data.amountInStock, 0)}</p>
          </div>
        </div>

        <div className="mt-4">
          <Button
            size="sm"
            label={isInCart ? 'Jau krepšelyje' : 'Į krepšelį'}
            onClick={onAddToCart}
            elementBefore={<ShoppingCart size={15} />}
            disabled={!isInStock || isInCart}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};
