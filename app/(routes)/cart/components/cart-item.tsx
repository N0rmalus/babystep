import Image from 'next/image';
import { Heart, Trash2 } from 'lucide-react';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Product } from '@/actions/types';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  data: Product;
};

export const CartItem = ({ data }: Props) => {
  const router = useRouter();
  const isInStock = data.amountInStock > 0;
  const productImageUrl = getImageUrl(data.images.at(0)?.url);
  const pricing = getProductPricing(data);

  const wishlist = useWishlist();
  const cart = useCart();
  const isInWishlist = wishlist.items.some((item) => item === data.id);

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onAddToWishlist = () => {
    wishlist.addItem(data.id);
  };

  return (
    <div
      onClick={() => {
        router.push(`/product/${data.id}`);
      }}
      className={cn(
        'cursor-pointer rounded-3xl border bg-white p-5 shadow-xs transition-colors duration-300 sm:p-6',
        isInStock
          ? 'hover:border-tumbleweed-300 border-neutral-200'
          : 'border-rose-200 opacity-75 hover:border-rose-300',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-36 sm:w-36">
          <Image
            fill
            src={productImageUrl}
            alt={data.name}
            className={cn('object-cover object-center', !isInStock && 'grayscale')}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            loading="eager"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:min-h-36 sm:flex-row">
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
                  <span className="bg-tumbleweed-200 h-2 w-2 rounded-full" />
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
              {pricing.isOnSale && (
                <Badge label={`Akcija -${pricing.discountPercent}%`} variant="rounded" color="salmon" />
              )}
            </div>

            <div className="mt-auto pt-4">
              <h3 className="text-xl leading-tight wrap-break-word text-neutral-900">{data.name}</h3>
              <div>
                {pricing.isOnSale && (
                  <span className="block text-sm font-medium text-neutral-400 line-through">
                    {toCurrency(pricing.regularPrice)}
                  </span>
                )}
                <span
                  className={cn(
                    'font-accent text-2xl font-bold',
                    pricing.isOnSale ? 'text-salmon-800' : 'text-neutral-900',
                  )}
                >
                  {toCurrency(pricing.effectivePrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-row items-end justify-end gap-2 sm:flex-col sm:justify-between sm:gap-0">
            <IconButton
              onClick={onAddToWishlist}
              disabled={isInWishlist}
              variant="primary"
              icon={<Heart size={14} className={cn(isInWishlist && 'fill-tumbleweed-300')} />}
            />
            <IconButton onClick={onRemove} icon={<Trash2 size={16} />} variant="danger" title="Pašalinti prekę" />
          </div>
        </div>
      </div>
    </div>
  );
};
