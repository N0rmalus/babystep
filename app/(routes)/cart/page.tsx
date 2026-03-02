'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary';
import CartItem from './components/cart-item';
import { cn } from '@/lib/utils';

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container>
      <div className="mb-16 mt-16">
        <h1 className="pb-4 text-3xl font-bold text-black"> Pirkinių krepšelis </h1>
        <div className="gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            {cart.items.length === 0 && <p className="text-neutral-500"> Pirkinių krepšelis tuščias. </p>}
            <ul>
              {cart.items.map((item) => (
                <div key={item.id} className={cn(item !== cart.items[cart.items.length - 1] && 'border-b')}>
                  <CartItem key={item.id} data={item} />
                </div>
              ))}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </Container>
  );
};

export default CartPage;
