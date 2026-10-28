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
import { QuantitySelector } from '@/components/ui/quantity-selector';

type Props = {
  data: Product;
  quantity: number;
};

export const CartItem = ({ data, quantity }: Props) => {
  const router = useRouter();
  const isInStock = data.amountInStock > 0;
  const productImageUrl = getImageUrl(data.images.at(0)?.url);
  const pricing = getProductPricing(data);

  const wishlist = useWishlist();
  const removeFromCart = useCart((state) => state.removeItem);
  const setQuantity = useCart((state) => state.setQuantity);
  const isInWishlist = wishlist.items.some((item) => item === data.id);
  const hasInsufficientStock = isInStock && quantity > data.amountInStock;

  const onRemove = () => {
    removeFromCart(data.id);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity({ productId: data.id, quantity: value, maxQuantity: data.amountInStock });
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
        'shadow-card cursor-pointer rounded-3xl border bg-white p-5 transition-colors duration-300 sm:p-6',
        isInStock ? 'hover:border-tumbleweed-300 border-line' : 'border-danger-line hover:border-danger opacity-75',
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="bg-muted relative h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-36">
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
                  color="tumbleweed-outlined"
                />
              </div>

              <Badge
                label={isInStock ? `Yra sandėlyje (${data.amountInStock})` : 'Išparduota'}
                color={isInStock ? 'success' : 'neutral'}
              />
              {pricing.isOnSale && <Badge label={`Akcija -${pricing.discountPercent}%`} color="sale" />}
            </div>

            <div className="mt-auto pt-4">
              <h3 className="text-ink text-xl leading-tight wrap-break-word">{data.name}</h3>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <div>
                  {pricing.isOnSale && (
                    <span className="text-ink-faint block text-sm font-medium line-through">
                      {toCurrency(pricing.regularPrice * quantity)}
                    </span>
                  )}
                  <span
                    className={cn(
                      'text-2xl font-bold tabular-nums',
                      pricing.isOnSale ? 'text-sale-strong' : 'text-ink',
                    )}
                  >
                    {toCurrency(pricing.effectivePrice * quantity)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-ink-muted block text-xs tabular-nums">
                      {quantity} × {toCurrency(pricing.effectivePrice)}
                    </span>
                  )}
                </div>
                {isInStock && (
                  <div className="flex flex-col items-start gap-1">
                    <QuantitySelector
                      value={quantity}
                      max={Math.max(data.amountInStock, quantity)}
                      onChange={handleQuantityChange}
                      size="sm"
                    />
                    {hasInsufficientStock && (
                      <span className="text-danger text-xs font-semibold">Liko tik {data.amountInStock} vnt.</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-row items-end justify-end gap-2.5 sm:flex-col sm:justify-between sm:gap-0">
            <IconButton
              onClick={onAddToWishlist}
              disabled={isInWishlist}
              variant="primary"
              icon={<Heart size={16} className={cn(isInWishlist && 'fill-tumbleweed-300')} />}
              label={isInWishlist ? 'Jau norų sąraše' : 'Į norų sąrašą'}
            />
            <IconButton onClick={onRemove} icon={<Trash2 size={16} />} variant="danger" label="Pašalinti prekę" />
          </div>
        </div>
      </div>
    </div>
  );
};
