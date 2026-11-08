import { toCurrency } from '@/business/to-currency';
import { getSummaryDiscountPercent, type VariantPriceSummary } from '@/business/variant-price-summary';
import { Badge } from '@/components/ui/badge';

type Props = {
  summary: VariantPriceSummary;
};

const RANGE_PREFIX = 'nuo';
const UP_TO_PREFIX = 'iki';

export const PriceSummaryBadge = ({ summary }: Props) => {
  const percent = getSummaryDiscountPercent(summary);

  if (percent === 0) {
    return null;
  }

  const discountLabel = `-${percent}%`;
  const isUpTo = summary.kind !== 'unavailable' && summary.badge.kind === 'upTo';

  return <Badge color="sale" label={isUpTo ? `${UP_TO_PREFIX} ${discountLabel}` : discountLabel} />;
};

export const getPriceSummaryLabel = (summary: VariantPriceSummary): string | null => {
  if (summary.kind === 'unavailable') {
    return null;
  }

  if (summary.kind === 'range') {
    return `${RANGE_PREFIX} ${toCurrency(summary.min)}`;
  }

  return toCurrency(summary.price);
};
