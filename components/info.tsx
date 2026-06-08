'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/actions/types';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { RichTextContent } from '@/components/ui/rich-text-content';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';

type Props = {
  data: Product;
};

export const Info = ({ data }: Props) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const router = useRouter();
  const category = data?.subcategory?.category;
  const subcategory = data?.subcategory;
  const isInStock = data.amountInStock > 0;
  const isInWishlist = wishlist.hasItem(data.id);
  const hasDescription = Boolean(data.description?.trim());
  const pricing = getProductPricing(data);

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start gap-x-3 gap-y-3">
        {category?.id && subcategory?.id && (
          <div className="inline-flex items-center">
            <Badge
              label={category.name}
              onClick={() => {
                router.push(`/category/${category.id}`);
              }}
              variant="rounded"
              color="tumbleweed-outlined"
            />

            <span className="pointer-events-none relative z-10 -mx-1 inline-flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="bg-tumbleweed-200 h-2 w-2 rounded-full" />
            </span>

            <Badge
              label={subcategory.name}
              onClick={() => {
                router.push(`/category/${category.id}/${subcategory.id}`);
              }}
              variant="rounded"
              color="tumbleweed-outlined"
            />
          </div>
        )}

        <Badge
          label={isInStock ? `Yra sandėlyje (${data.amountInStock} vnt.)` : 'Išparduota'}
          variant="rounded"
          color={isInStock ? 'green' : 'rose'}
        />

        {pricing.isOnSale && <Badge label={`Akcija -${pricing.discountPercent}%`} variant="rounded" color="salmon" />}
      </div>

      <div className="flex justify-between gap-4">
        <h1 className="text-3xl leading-tight font-bold text-neutral-900 sm:text-4xl">{data.name}</h1>
        <div className="text-right">
          {pricing.isOnSale && (
            <div className="font-accent text-base font-medium text-neutral-400 line-through">
              {toCurrency(pricing.regularPrice)}
            </div>
          )}
          <div
            className={cn('font-accent text-3xl font-bold', pricing.isOnSale ? 'text-salmon-800' : 'text-neutral-900')}
          >
            {toCurrency(pricing.effectivePrice)}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-neutral-500 uppercase">Aprašymas</h3>
        {hasDescription ? (
          <RichTextContent content={data.description} className="mt-4" />
        ) : (
          <p className="mt-3 text-sm text-neutral-500">Aprašymo nėra.</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Button
          size="md"
          onClick={onAddToCart}
          elementBefore={isInStock && <ShoppingCart size={18} />}
          label={isInStock ? 'Pridėti į krepšelį' : 'Prekė išparduota :('}
          className="rounded-xl shadow-md"
          variant="primary"
          disabled={!isInStock}
        />
        <Button
          size="md"
          variant="secondary"
          elementBefore={<Heart size={18} className={cn(isInWishlist && 'fill-tumbleweed-300')} />}
          label={isInWishlist ? 'Norų sąraše' : 'Į norų sąrašą'}
          onClick={onToggleWishlist}
          className={cn('rounded-xl shadow-xs', isInWishlist && 'hover:text-tumbleweed-300')}
        />
      </div>
    </div>
  );
};
