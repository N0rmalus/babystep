'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useWishlist from '@/hooks/use-wishlist';
import WishlistCard from '@/app/(routes)/wishlist/components/wishlist-item';

const WishlistPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const wishlist = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container>
      <div className="mb-16 mt-16">
        <h1 className="text-3xl font-bold text-gray-900"> Norų sąrašas ({wishlist.items.length}) </h1>
        <div className="mt-12 gap-x-12 lg:grid lg:grid-cols-12 lg:items-start">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-12 lg:grid-cols-4">
            {wishlist.items.length === 0 && <p className="text-neutral-500"> Norų sąrašas tuščias. </p>}
            {wishlist.items.map((item) => (
              <WishlistCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WishlistPage;
