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
    'relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white p-0 text-neutral-700 transition hover:border-neutral-300 hover:bg-white hover:text-black md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2';
  const badgeClasses =
    'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 font-semibold text-white md:static md:h-6 md:min-w-6 md:px-1.5 text-xs';

  return (
    <div className="ml-auto flex items-center gap-2 md:gap-3">
      <Button
        onClick={() => router.push('/wishlist')}
        variant="secondary"
        elementBefore={<Heart size={18} className={cn(isInWishlistPage && 'fill-tumbleweed-300')} />}
        elementAfter={<span className={badgeClasses}>{wishlist.items.length}</span>}
        label={<span className="hidden md:inline">Norai</span>}
        size="sm"
        aria-label="Norai"
        className={actionButtonClasses}
      />
      <Button
        onClick={() => router.push('/cart')}
        variant="secondary"
        elementBefore={<ShoppingBag size={18} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
        elementAfter={<span className={badgeClasses}>{cart.items.length}</span>}
        label={<span className="hidden md:inline">Krepšelis</span>}
        size="sm"
        aria-label="Krepšelis"
        className={actionButtonClasses}
      />
    </div>
  );
};
