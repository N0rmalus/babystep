'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { ProductPrice } from '@/components/product/product-price';
import { useProductPurchase } from '@/components/product/product-purchase-provider';
import Button from '@/components/ui/button';
import { getImageUrl } from '@/lib/image-url';

export const MobileBuyBar = () => {
  const { product, size, color, isInStock, isCtaVisible, addSelectionToCart } = useProductPurchase();

  if (isCtaVisible) {
    return null;
  }

  return (
    <div className="border-line sticky bottom-0 z-20 flex items-center gap-3 border-t bg-white px-4 pt-2.5 pb-3.5 lg:hidden">
      <span className="bg-muted relative size-11 shrink-0 overflow-hidden rounded-xl">
        <Image fill src={getImageUrl(product.images.at(0)?.url)} alt="" className="object-cover" sizes="44px" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* MOCK: selected size and color until "Product variants". */}
        <span className="text-ink-muted truncate text-xs">
          {size?.label} · {color?.label}
        </span>
        <ProductPrice product={product} size="sm" />
      </div>
      {isInStock ? (
        <Button label="Į krepšelį" elementBefore={<ShoppingCart size={16} />} onClick={addSelectionToCart} />
      ) : (
        <Button label="Išparduota" disabled onClick={addSelectionToCart} />
      )}
    </div>
  );
};
