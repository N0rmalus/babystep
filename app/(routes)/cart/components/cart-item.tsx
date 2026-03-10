import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import { MouseEventHandler } from 'react';

import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Product } from '@/actions/types';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { toCurrency } from '@/business/to-currency';

type Props = {
  data: Product;
};

export const CartItem = ({ data }: Props) => {
  const cart = useCart();
  const router = useRouter();
  const wishlist = useWishlist();
  const isInWishlist = wishlist.items.some((item) => item === data.id);
  const isInStock = data.amountInStock > 0;
  const productImageUrl = data.images[0]?.url ?? '/placeholder.webp';

  const onRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.removeItem(data.id);
  };

  const onAddToWishlist: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    wishlist.addItem(data.id);
  };

  return (
    <div
      onClick={() => {
        router.push(`/product/${data.id}`);
      }}
      className="cursor-pointer rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:border-tumbleweed-300 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-36 sm:w-36">
          <Image fill src={productImageUrl} alt={data.name} className="object-cover object-center" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:min-h-[9rem] sm:flex-row">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center">
                <Badge
                  label={data.subcategory.category.name}
                  onClick={() => {
                    router.push(`/category/${data.subcategory.category.id}`);
                  }}
                  variant="rounded"
                  color="tumbleweed-outlined"
                />

                <span
                  className="pointer-events-none relative z-10 -mx-1 inline-flex h-2 w-2 shrink-0"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-tumbleweed-200" />
                </span>

                <Badge
                  label={data.subcategory.name}
                  onClick={() => {
                    router.push(`/category/${data.subcategory.category.id}/${data.subcategory.id}`);
                  }}
                  variant="rounded"
                  color="tumbleweed-outlined"
                />
              </div>

              <Badge
                label={isInStock ? `Yra sandėlyje (${data.amountInStock})` : 'Išparduota'}
                variant="rounded"
                color={isInStock ? 'green' : 'rose'}
              />
            </div>

            <div className="mt-auto pt-4">
              <h3 className="break-words text-xl leading-tight text-neutral-900">{data.name}</h3>
              <span className="text-2xl font-bold text-neutral-900">{toCurrency(Number(data.price))}</span>
            </div>
          </div>

          <div className="flex shrink-0 flex-row items-end justify-end gap-2 sm:flex-col sm:justify-between sm:gap-0">
            <IconButton
              onClick={onAddToWishlist}
              disabled={isInWishlist}
              variant="primary"
              className="rounded-lg"
              icon={<Heart size={14} className={cn(isInWishlist && 'fill-tumbleweed-300')} />}
            />
            <IconButton
              onClick={onRemove}
              icon={<Trash2 size={16} />}
              className="rounded-lg"
              variant="danger"
              title="Pašalinti prekę"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
