'use client';

import useCart from '@/hooks/use-cart';

export const CartCountBadge = () => {
  const itemCount = useCart((state) => state.items.length);

  return (
    <span className="bg-ink flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold text-white tabular-nums">
      {itemCount}
    </span>
  );
};
