'use client';
import { Heart, ShoppingCart } from 'lucide-react';

import { Product } from '@/actions/types';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface Props {
  data: Product;
}

export const Info = ({ data }: Props) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const router = useRouter();
  const category = data?.subcategory?.category;
  const subcategory = data?.subcategory;
  const isInStock = data.amountInStock > 0;
  const isInWishlist = wishlist.hasItem(data.id);

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
              <span className="h-2 w-2 rounded-full bg-tumbleweed-700" />
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
      </div>

      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold leading-tight text-neutral-900 sm:text-4xl">{data.name}</h1>
        <div className="text-3xl font-bold text-neutral-900">
          <Currency value={data?.price} />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Aprašymas</h3>
        {data?.description.length ? (
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 sm:text-base">
            {data?.description}
          </p>
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
          className={cn('rounded-xl shadow-sm', isInWishlist && 'hover:text-tumbleweed-300')}
        />
      </div>
    </div>
  );
};
