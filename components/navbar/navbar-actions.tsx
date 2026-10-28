'use client';

import { Heart, ShoppingCart, UserRound } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { CartPopover } from '@/components/cart-popover';
import { CartCountBadge } from '@/components/navbar/cart-count-badge';
import { CartIconButton } from '@/components/navbar/cart-icon-button';
import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import { useIsMobile } from '@/hooks/use-is-mobile';
import useMounted from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';

export const NavbarActions = () => {
  const isMounted = useMounted();
  const pathname = usePathname();
  const isCompactNav = useIsMobile('lg');
  const isInWishlistPage = pathname.includes('/wishlist');
  const isInCartPage = pathname.includes('/cart');

  if (!isMounted) {
    return null;
  }

  if (isCompactNav) {
    return (
      <div className="flex justify-end">
        <CartIconButton />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2.5">
      <Button
        href="/wishlist"
        variant="secondary"
        size="sm"
        label="Norai"
        elementBefore={<Heart size={16} className={cn(isInWishlistPage && 'fill-tumbleweed-300')} />}
        className="h-11"
      />

      {isInCartPage ? (
        <Button
          href="/cart"
          variant="secondary"
          size="sm"
          label="Krepšelis"
          elementBefore={<ShoppingCart size={16} className="fill-tumbleweed-300" />}
          elementAfter={<CartCountBadge />}
          className="h-11"
        />
      ) : (
        <CartPopover />
      )}

      <span aria-hidden="true" className="bg-line mx-1 h-6 w-px" />

      {/* MOCK: does nothing until customer accounts exist (TODO.md "Customer accounts"). */}
      <IconButton icon={<UserRound size={16} />} label="Paskyra" />
    </div>
  );
};
