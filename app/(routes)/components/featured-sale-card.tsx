'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/actions/types';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  summary: string;
};

export const FeaturedSaleCard = ({ product, summary }: Props) => {
  const isInCart = useCart((state) => state.items.includes(product.id));
  const addToCart = useCart((state) => state.addItem);
  const isInWishlist = useWishlist((state) => state.items.includes(product.id));
  const addToWishlist = useWishlist((state) => state.addItem);
  const removeFromWishlist = useWishlist((state) => state.removeItem);

  const pricing = getProductPricing(product);
  const isInStock = product.amountInStock > 0;

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      return;
    }

    addToWishlist(product.id);
  };

  const wishlistButton = (
    <IconButton
      icon={<Heart size={16} className={cn(isInWishlist && 'fill-tumbleweed-300')} />}
      label={isInWishlist ? 'Pašalinti iš norų sąrašo' : 'Įtraukti į norų sąrašą'}
      onClick={handleWishlistToggle}
    />
  );

  return (
    <article className="group border-line shadow-card hover:border-line-strong relative col-span-2 grid overflow-hidden rounded-3xl border bg-white transition-colors lg:grid-cols-2">
      <div className="bg-muted relative h-50 overflow-hidden lg:h-auto">
        <Image
          src={getImageUrl(product.images.at(0)?.url)}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 300px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 lg:top-3.5 lg:left-3.5">
          <Badge color="sale" label={`-${pricing.discountPercent}%`} />
        </div>
        <div className="absolute top-3 right-3 z-10 lg:hidden">{wishlistButton}</div>
      </div>

      <div className="flex flex-col gap-2 p-4 lg:gap-3 lg:p-7">
        <h3 className="lg:font-accent text-lg leading-snug font-semibold text-balance lg:text-3xl lg:leading-tight lg:font-bold">
          <Link href={`/product/${product.id}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        {summary && <p className="text-ink-muted line-clamp-2 text-sm leading-normal lg:line-clamp-4">{summary}</p>}

        <div className="mt-1 flex items-center justify-between gap-3 lg:mt-auto lg:flex-col lg:items-stretch">
          <div className="flex items-baseline gap-2 lg:gap-2.5">
            <span className="text-sale-strong text-2xl font-bold tabular-nums lg:text-3xl">
              {toCurrency(pricing.effectivePrice)}
            </span>
            <span className="text-ink-faint text-sm tabular-nums line-through lg:text-base">
              {toCurrency(pricing.regularPrice)}
            </span>
          </div>
          <div className="relative z-10 flex items-center gap-2.5">
            <Button
              size="sm"
              label={getCartButtonLabel({ isInStock, isInCart })}
              elementBefore={!isInCart && <ShoppingCart size={15} />}
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="h-11 lg:flex-1"
            />
            <div className="hidden lg:block">{wishlistButton}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

const getCartButtonLabel = ({ isInStock, isInCart }: { isInStock: boolean; isInCart: boolean }) => {
  if (!isInStock) {
    return 'Išparduota';
  }

  if (isInCart) {
    return 'Jau krepšelyje';
  }

  return 'Į krepšelį';
};
