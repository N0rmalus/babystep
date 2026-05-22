'use client';

import { Heart, ShoppingBag } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import useMounted from '@/hooks/use-mounted';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';

export const NavbarActions = () => {
  const isMounted = useMounted();
  const isInWishlistPage = usePathname().includes('/wishlist');
  const isInCartPage = usePathname().includes('/cart');

  const router = useRouter();
  const cart = useCart();
  const wishlist = useWishlist();

  if (!isMounted) {
    return null;
  }

  const actionButtonClasses =
    'relative flex h-10 w-auto shrink-0 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-0 text-neutral-700 transition hover:border-neutral-300 hover:bg-white hover:text-black xl:h-auto xl:px-4 xl:py-2';
  const badgeClasses =
    'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-semibold text-white xl:h-6 xl:min-w-6 xl:px-1.5';

  return (
    <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
      <Button
        onClick={() => router.push('/wishlist')}
        variant="secondary"
        elementBefore={<Heart size={18} className={cn(isInWishlistPage && 'fill-tumbleweed-300')} />}
        elementAfter={<span className={badgeClasses}>{wishlist.items.length}</span>}
        label={<span className="hidden xl:inline">Norai</span>}
        size="sm"
        aria-label="Norai"
        className={actionButtonClasses}
      />
      <Button
        onClick={() => router.push('/cart')}
        variant="secondary"
        elementBefore={<ShoppingBag size={18} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
        elementAfter={<span className={badgeClasses}>{cart.items.length}</span>}
        label={<span className="hidden xl:inline">Krepšelis</span>}
        size="sm"
        aria-label="Krepšelis"
        className={actionButtonClasses}
      />
    </div>
  );
};
