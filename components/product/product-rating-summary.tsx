import { Star } from 'lucide-react';

import { StarRating } from '@/components/ui/star-rating';
import { MOCK_PRODUCT_RATING } from '@/lib/mocks/product';

const ratingFormatter = new Intl.NumberFormat('lt-LT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// MOCK: rating summary until "Customer accounts" (reviews).
const { average, count } = MOCK_PRODUCT_RATING;

export const ProductRatingLink = () => {
  return (
    <a
      href="#atsiliepimai"
      className="text-ink-muted hover:text-link flex min-h-11 items-center gap-1 text-sm sm:gap-2 lg:min-h-8"
    >
      <span className="hidden sm:flex">
        <StarRating rating={average} label={`Įvertinimas ${formatRating(average)} iš 5`} />
      </span>
      <Star
        size={16}
        fill="currentColor"
        strokeWidth={0}
        className="text-tumbleweed-500 sm:hidden"
        aria-hidden="true"
      />
      <strong className="text-ink">{formatRating(average)}</strong>
      <span className="underline underline-offset-3">
        <span className="sm:hidden">({count})</span>
        <span className="hidden sm:inline">{count} atsiliepimai</span>
      </span>
    </a>
  );
};

export const ProductRatingCompact = () => {
  return (
    <span className="text-ink-muted flex items-center gap-1 text-sm">
      <Star size={15} fill="currentColor" strokeWidth={0} className="text-tumbleweed-500" aria-hidden="true" />
      <strong className="text-ink">{formatRating(average)}</strong>({count})
    </span>
  );
};

export const formatRating = (rating: number) => ratingFormatter.format(rating);
