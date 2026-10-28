'use client';

import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';

import { CartCountBadge } from '@/components/navbar/cart-count-badge';
import IconButton from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

type Props = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const CartIconButton = ({ onClick }: Props) => {
  const isInCartPage = usePathname().includes('/cart');

  return (
    <IconButton
      href="/cart"
      onClick={onClick}
      icon={<ShoppingCart size={18} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
      label="Krepšelis"
      badge={<CartCountBadge />}
    />
  );
};
