import { toCurrency } from '@/business/to-currency';
import type { SelectionPrice } from '@/business/variant-selection';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = {
  price: SelectionPrice;
  size?: 'sm' | 'lg';
};

const sizeClasses = {
  sm: { price: 'text-lg', oldPrice: 'text-xs', gap: 'gap-1.5' },
  lg: { price: 'text-3xl', oldPrice: 'text-base sm:text-lg', gap: 'gap-2 sm:gap-3' },
} as const;

export const ProductPrice = ({ price, size = 'lg' }: Props) => {
  const classes = sizeClasses[size];

  if (price.kind === 'none') {
    return null;
  }

  if (price.kind === 'range') {
    return (
      <div className={cn('flex items-center', classes.gap)}>
        <span className={cn('text-ink font-bold tabular-nums', classes.price)}>{formatRange(price)}</span>
      </div>
    );
  }

  const { pricing } = price;

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

const formatRange = ({ min, max }: Extract<SelectionPrice, { kind: 'range' }>) => {
  if (min === max) {
    return toCurrency(min);
  }

  return `${toCurrency(min)} – ${toCurrency(max)}`;
};
