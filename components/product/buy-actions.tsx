'use client';

import { useEffect, useRef } from 'react';
import { Check, Heart, ShoppingCart } from 'lucide-react';

import { useProductPurchase } from '@/components/product/product-purchase-provider';
import Button from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import useMounted from '@/hooks/use-mounted';
import useWishlist from '@/hooks/use-wishlist';
import { LOW_STOCK_THRESHOLD } from '@/lib/consts';
import { cn } from '@/lib/utils';

export const BuyActions = () => {
  const {
    product,
    quantity,
    maxQuantity,
    stockCount,
    isInStock,
    isAdded,
    changeQuantity,
    addSelectionToCart,
    setIsCtaVisible,
  } = useProductPurchase();
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;

    if (!cta) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsCtaVisible(entry?.isIntersecting ?? true);
    });

    observer.observe(cta);

    return () => {
      observer.disconnect();
      setIsCtaVisible(true);
    };
  }, [setIsCtaVisible, isInStock]);

  if (!isInStock) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-ink-soft text-sm sm:text-base">Šio derinio kol kas neturime.</p>
        <div ref={ctaRef} className="flex gap-2.5">
          <div className="min-w-0 flex-1">
            <Button size="lg" label="Išparduota" disabled onClick={addSelectionToCart} fullWidth />
          </div>
          <WishlistButton productId={product.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <QuantitySelector value={quantity} max={maxQuantity} onChange={changeQuantity} />
        <span className="text-success flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Check size={16} aria-hidden="true" />
          {stockCount > LOW_STOCK_THRESHOLD ? 'Yra sandėlyje' : `Liko ${stockCount} vnt.`}
        </span>
      </div>
      <div ref={ctaRef} className="flex gap-2.5">
        <div className="min-w-0 flex-1">
          <Button
            size="lg"
            label={isAdded ? 'Įdėta į krepšelį' : 'Į krepšelį'}
            elementBefore={isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
            onClick={addSelectionToCart}
            fullWidth
          />
        </div>
        <WishlistButton productId={product.id} />
      </div>
    </div>
  );
};

const WishlistButton = ({ productId }: { productId: string }) => {
  const isMounted = useMounted();
  const isInWishlist = useWishlist((state) => state.items.includes(productId));
  const addToWishlist = useWishlist((state) => state.addItem);
  const removeFromWishlist = useWishlist((state) => state.removeItem);
  const isSaved = isMounted && isInWishlist;

  const handleToggle = () => {
    if (isSaved) {
      removeFromWishlist(productId);
      return;
    }

    addToWishlist(productId);
  };

  return (
    <Button
      size="lg"
      variant="secondary"
      label={isSaved ? 'Norų sąraše' : 'Į norų sąrašą'}
      aria-pressed={isSaved}
      elementBefore={<Heart size={20} className={cn(isSaved && 'fill-tumbleweed-300')} />}
      onClick={handleToggle}
      className="shrink-0"
    />
  );
};
