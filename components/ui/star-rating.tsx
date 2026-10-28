import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  rating: number;
  size?: number;
  label: string;
};

const STAR_COUNT = 5;

export const StarRating = ({ rating, size = 16, label }: Props) => {
  const roundedRating = Math.round(rating);

  return (
    <span role="img" aria-label={label} className="flex gap-0.5">
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <Star
          key={index}
          size={size}
          aria-hidden="true"
          fill="currentColor"
          strokeWidth={0}
          className={cn(index < roundedRating ? 'text-tumbleweed-500' : 'text-line')}
        />
      ))}
    </span>
  );
};
