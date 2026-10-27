'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';

import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
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

  const cart = useCart();
  const wishlist = useWishlist();

  if (!isMounted) {
    return null;
  }

  const actionButtonClasses =
    'h-11 shrink-0 border-line text-ink-soft hover:border-line-strong hover:bg-white hover:text-ink xl:px-4';
  const badgeClasses =
    'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-xs font-semibold text-white xl:h-6 xl:min-w-6 xl:px-1.5';

  return (
    <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
      {!isCompactNav && (
        <Button
          href="/wishlist"
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
        <IconButton
          href="/cart"
          icon={<ShoppingCart size={20} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
          label="Krepšelis"
          badge={<span className={cn('shadow-sm', badgeClasses)}>{cart.items.length}</span>}
        />
      ) : isInCartPage ? (
        <Button
          href="/cart"
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
