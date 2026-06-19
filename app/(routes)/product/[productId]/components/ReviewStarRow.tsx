import { cn } from '@/lib/utils';
import { Star, StarHalf } from 'lucide-react';

const STAR_COUNT = 5;
const HALF_STAR_PRECISION = 2;

type StarState = 'full' | 'half' | 'empty';

export const ReviewStarRow = ({
  rating,
  size = 16,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) => {
  const starStates = getStarStates(rating);

  return (
    <span className={cn('text-tumbleweed-400 inline-flex items-center gap-1', className)}>
      {starStates.map((state, index) => {
        const Icon = state === 'half' ? StarHalf : Star;

        return (
          <Icon key={`${state}-${index}`} size={size} className={cn(state !== 'empty' && 'fill-tumbleweed-400')} />
        );
      })}
    </span>
  );
};

const getStarStates = (rating: number) => {
  const clampedRating = Math.min(Math.max(rating, 0), STAR_COUNT);
  const roundedRating = Math.round(clampedRating * HALF_STAR_PRECISION) / HALF_STAR_PRECISION;
  const fullStarCount = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return Array.from({ length: STAR_COUNT }, (_, index): StarState => {
    if (index < fullStarCount) {
      return 'full';
    }

    if (index === fullStarCount && hasHalfStar) {
      return 'half';
    }

    return 'empty';
  });
};
