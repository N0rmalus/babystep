'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';

import type { Product } from '@/actions/types';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';
import IconButton from '@/components/ui/icon-button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { getImageUrl } from '@/lib/image-url';
import { MOCK_CART_VARIANT_META } from '@/lib/mocks/product';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  quantity: number;
};

const LINE_GRID_CLASSES =
  'grid grid-cols-[5.25rem_minmax(0,1fr)_auto] items-start gap-3 xl:grid-cols-[7rem_minmax(0,1fr)_8.75rem_6.5rem_6rem] xl:items-center xl:gap-5';

export const CartLine = ({ product, quantity }: Props) => {
  const removeFromCart = useCart((state) => state.removeItem);
  const setQuantity = useCart((state) => state.setQuantity);
  const isInWishlist = useWishlist((state) => state.items.includes(product.id));
  const addToWishlist = useWishlist((state) => state.addItem);
  const removeFromWishlist = useWishlist((state) => state.removeItem);

  const pricing = getProductPricing(product);
  const isInStock = product.stockCount > 0;
  const hasInsufficientStock = isInStock && quantity > product.stockCount;
  const productHref = `/product/${product.id}`;

  const handleQuantityChange = (value: number) => {
    setQuantity({ productId: product.id, quantity: value, maxQuantity: product.stockCount });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      return;
    }

    addToWishlist(product.id);
  };

  return (
    <li
      className={cn(
        'shadow-card rounded-2xl border bg-white p-3.5 xl:rounded-none xl:border-0 xl:border-b xl:px-0 xl:py-5 xl:shadow-none xl:last:border-b-0',
        hasInsufficientStock || !isInStock ? 'border-danger-line' : 'border-line',
      )}
    >
      <div className={LINE_GRID_CLASSES}>
        <Link
          href={productHref}
          aria-hidden="true"
          tabIndex={-1}
          className="bg-muted relative block size-21 overflow-hidden rounded-xl xl:size-28 xl:rounded-2xl"
        >
          <Image
            fill
            src={getImageUrl(product.images.at(0)?.url)}
            alt=""
            sizes="112px"
            className={cn('object-cover', !isInStock && 'grayscale')}
          />
        </Link>

        <div className="flex min-w-0 flex-col gap-1 xl:gap-1.5">
          <Link href={productHref} className="text-ink hover:text-link text-base leading-snug font-semibold xl:text-lg">
            {product.name}
          </Link>
          {/* MOCK: size and color until "Product variants". */}
          <span className="text-ink-muted text-sm leading-snug">{MOCK_CART_VARIANT_META}</span>
          <span className="flex items-baseline gap-2 text-sm tabular-nums">
            <span className={cn('font-semibold', pricing.isOnSale ? 'text-sale-strong' : 'text-ink')}>
              {toCurrency(pricing.effectivePrice)}
            </span>
            {pricing.isOnSale && (
              <span className="text-ink-faint text-xs line-through">
                <span className="sr-only">Buvusi kaina </span>
                {toCurrency(pricing.regularPrice)}
              </span>
            )}
            <span className="text-ink-muted">/ vnt.</span>
          </span>
        </div>

        <div className="flex gap-2.5 justify-self-end xl:col-start-5 xl:row-start-1">
          <IconButton
            onClick={handleWishlistToggle}
            icon={
              <Heart
                size={16}
                className={cn(isInWishlist ? 'fill-sale-strong text-sale-strong' : 'fill-none')}
                aria-hidden="true"
              />
            }
            label={
              isInWishlist ? `Pašalinti „${product.name}“ iš norų sąrašo` : `Įtraukti „${product.name}“ į norų sąrašą`
            }
          />
          <IconButton
            onClick={() => removeFromCart(product.id)}
            icon={<Trash2 size={16} aria-hidden="true" />}
            variant="danger"
            label={`Pašalinti „${product.name}“ iš krepšelio`}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1 xl:col-span-1 xl:col-start-3 xl:row-start-1">
          {isInStock ? (
            <QuantitySelector
              value={quantity}
              max={Math.max(product.stockCount, quantity)}
              onChange={handleQuantityChange}
              label={`${product.name} kiekis`}
            />
          ) : (
            <span className="text-danger text-sm font-semibold">Išparduota</span>
          )}
          {hasInsufficientStock && (
            <span className="text-danger text-xs font-semibold">Liko tik {product.stockCount} vnt.</span>
          )}
        </div>

        <span className="text-ink self-center justify-self-end text-lg font-bold tabular-nums xl:col-start-4 xl:row-start-1">
          {toCurrency(pricing.effectivePrice * quantity)}
        </span>
      </div>
    </li>
  );
};
