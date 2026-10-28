import type { Product } from '@/actions/types';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = {
  product: Product;
  size?: 'sm' | 'lg';
};

const sizeClasses = {
  sm: { price: 'text-lg', oldPrice: 'text-xs', gap: 'gap-1.5' },
  lg: { price: 'text-3xl', oldPrice: 'text-base sm:text-lg', gap: 'gap-2 sm:gap-3' },
} as const;

export const ProductPrice = ({ product, size = 'lg' }: Props) => {
  const pricing = getProductPricing(product);
  const classes = sizeClasses[size];

  return (
    <div className={cn('flex items-center', classes.gap)}>
      <span className={cn('font-bold tabular-nums', classes.price, pricing.isOnSale ? 'text-sale-strong' : 'text-ink')}>
        {toCurrency(pricing.effectivePrice)}
      </span>
      {pricing.isOnSale && (
        <>
          <span className={cn('text-ink-faint tabular-nums line-through', classes.oldPrice)}>
            <span className="sr-only">Buvusi kaina </span>
            {toCurrency(pricing.regularPrice)}
          </span>
          {size === 'lg' && <Badge label={`−${pricing.discountPercent}%`} color="sale" />}
        </>
      )}
    </div>
  );
};
