'use client';

import { Product } from '@/actions/types';
import { useRouter } from 'next/navigation';
import useQuickView from '@/hooks/use-quick-view';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import IconButton from '@/components/ui/icon-button';
import { Expand, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';
import { getProductPricing } from '@/business/product-pricing';
import { getImageUrl } from '@/lib/image-url';
import { toCurrency } from '@/business/to-currency';
import { useIsMobile } from '@/hooks/use-is-mobile';

type Props = {
  data: Product;
  wishlistAction?: 'add' | 'remove';
};

export const ProductCard = ({ data, wishlistAction = 'add' }: Props) => {
  const isInCart = useCart((state) => state.items.some((item) => item.productId === data.id));
  const addToCart = useCart((state) => state.addItem);
  const wishlist = useWishlist();
  const openQuickView = useQuickView((state) => state.onOpen);
  const router = useRouter();
  const isMobile = useIsMobile('md');

  const isInStock = data.amountInStock > 0;
  const isInWishlist = wishlist.items.some((item) => item === data.id);
  const imageUrl = getImageUrl(data.images?.at(0)?.url);

  const pricing = getProductPricing(data);

  const onPreview = () => {
    openQuickView(data);
  };

  const onAddToCart = () => {
    addToCart({ productId: data.id, maxQuantity: data.amountInStock });
  };

  const onWishlistAction = () => {
    if (wishlistAction === 'remove') {
      wishlist.removeItem(data.id);
      return;
    }

    if (isInWishlist) {
      wishlist.removeItem(data.id);
      return;
    }

    wishlist.addItem(data.id);
  };

  const wishlistIcon =
    wishlistAction === 'remove' ? (
      <Trash2 size={16} />
    ) : (
      <Heart size={16} className={cn(isInWishlist && 'fill-tumbleweed-300')} />
    );

  const wishlistTitle =
    wishlistAction === 'remove'
      ? 'Pašalinti iš norų sąrašo'
      : isInWishlist
        ? 'Pašalinti iš norų sąrašo'
        : 'Įtraukti į norų sąrašą';

  const buttonLabel = () => {
    if (!isInStock) {
      return 'Išparduota';
    }
    if (isInCart) {
      return 'Jau krepšelyje';
    }

    return 'Į krepšelį';
  };

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className={cn(
        'group border-line shadow-card hover:border-line-strong flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:-translate-y-0.5 sm:rounded-3xl',
        !isInStock && 'opacity-50',
      )}
    >
      <div className="bg-muted relative aspect-square overflow-hidden sm:aspect-4/3">
        <Image
          src={imageUrl}
          fill
          loading="eager"
          alt={data.name}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          {pricing.isOnSale && <Badge label={`-${pricing.discountPercent}%`} color="sale" />}
          {!isInStock && <Badge label="Išparduota" color="neutral" />}
        </div>

        <div className="absolute top-3 right-3 bottom-0 flex flex-col gap-2.5">
          {!isMobile && (
            <IconButton onClick={onPreview} variant="primary" icon={<Expand size={16} />} label="Greita peržiūra" />
          )}
          <IconButton onClick={onWishlistAction} variant="primary" icon={wishlistIcon} label={wishlistTitle} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-4 sm:p-4">
        <div className="flex min-h-20 flex-1 flex-col justify-between sm:min-h-22 sm:gap-3">
          <div>
            <h3 className="text-ink text-sm leading-tight font-semibold sm:text-base">{data.name}</h3>
            <p className="text-ink-muted mt-1.5 text-xs sm:mt-2">
              {data.subcategory.category.name} • {data.subcategory.name}
            </p>
          </div>

          <div>
            {pricing.isOnSale && (
              <div className="text-ink-faint text-xs font-medium tabular-nums line-through">
                {toCurrency(pricing.regularPrice)}
              </div>
            )}
            <span
              className={cn(
                'text-base font-bold tabular-nums sm:text-lg',
                pricing.isOnSale ? 'text-sale-strong' : 'text-ink',
              )}
            >
              {toCurrency(pricing.effectivePrice)}
            </span>
          </div>
        </div>

        <Button
          size="sm"
          label={buttonLabel()}
          onClick={onAddToCart}
          elementBefore={!isInCart && <ShoppingCart size={15} />}
          disabled={!isInStock}
          fullWidth
        />
      </div>
    </div>
  );
};
