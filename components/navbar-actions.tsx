'use client';

import { Heart, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isInWishlistPage = usePathname().includes('/wishlist');
  const isInCartPage = usePathname().includes('/cart');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();
  const wishlist = useWishlist();

  if (!isMounted) {
    return null;
  }

  const actionButtonClasses =
    'relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white p-0 text-neutral-700 transition hover:border-neutral-300 hover:bg-white hover:text-black md:h-auto md:w-auto md:gap-2 md:px-4 md:py-2';
  const badgeClasses =
    'absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-black px-1 text-[11px] font-semibold text-white md:static md:h-6 md:min-w-[1.5rem] md:px-1.5 md:text-xs';

  return (
    <div className="ml-auto flex items-center gap-2 md:gap-3">
      <Button
        onClick={() => router.push('/wishlist')}
        variant="secondary"
        elementBefore={<Heart size={18} className={cn(isInWishlistPage && 'fill-tumbleweed-300')} />}
        label={
          <>
            <span className="hidden text-sm font-semibold md:inline">Norai</span>
            <span className={cn(badgeClasses)}>{wishlist.items.length}</span>
          </>
        }
        size="sm"
        aria-label="Norai"
        className={actionButtonClasses}
      />
      <Button
        onClick={() => router.push('/cart')}
        variant="secondary"
        elementBefore={<ShoppingBag size={18} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
        label={
          <>
            <span className="hidden text-sm font-semibold md:inline">Krepšelis</span>
            <span className={badgeClasses}>{cart.items.length}</span>
          </>
        }
        size="sm"
        aria-label="Krepšelis"
        className={actionButtonClasses}
      />
    </div>
  );
};

export default NavbarActions;
