'use client';

import useCart, { selectCartItemCount } from '@/hooks/use-cart';

export const CartCountBadge = () => {
  const itemCount = useCart(selectCartItemCount);

  return (
    <span className="bg-ink flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold text-white tabular-nums">
      {itemCount}
    </span>
  );
};
