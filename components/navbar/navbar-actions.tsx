'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import { CartPopover } from '@/components/cart-popover';
import { useIsMobile } from '@/hooks/use-is-mobile';
import useMounted from '@/hooks/use-mounted';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import useCart from '@/hooks/use-cart';

export const NavbarActions = () => {
  const isMounted = useMounted();
  const isInWishlistPage = usePathname().includes('/wishlist');
  const isInCartPage = usePathname().includes('/cart');
  const isCompactNav = useIsMobile('lg');
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
      {!isCompactNav && (
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
      )}

      {isCompactNav ? (
        <>
          <button
            type="button"
            className="tap-strong relative flex shrink-0 items-center justify-center rounded-lg border bg-white p-2 text-black"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart size={20} className={cn(isInCartPage && 'fill-tumbleweed-300')} />
            <span className={cn('absolute -top-2 -right-2 shadow-sm', badgeClasses)}>{cart.items.length}</span>
          </button>
        </>
      ) : isInCartPage ? (
        <Button
          onClick={() => router.push('/cart')}
          variant="secondary"
          elementBefore={<ShoppingCart size={18} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
          elementAfter={<span className={badgeClasses}>{cart.items.length}</span>}
          label={<span className="hidden xl:inline">Krepšelis</span>}
          size="sm"
          aria-label="Krepšelis"
          className={actionButtonClasses}
        />
      ) : (
        <CartPopover />
      )}
    </div>
  );
};
