'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { ProductPrice } from '@/components/product/product-price';
import { useProductPurchase } from '@/components/product/product-purchase-provider';
import type { PurchaseState } from '@/business/variant-selection';
import Button from '@/components/ui/button';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  kind: PurchaseState['kind'];
  onClick: () => void;
};

export const MobileBuyBar = () => {
  const { product, purchaseState, price, isCtaVisible, addSelectionToCart } = useProductPurchase();

  if (isCtaVisible) {
    return null;
  }

  return (
    <div className="border-line sticky bottom-0 z-20 flex items-center gap-3 border-t bg-white px-4 pt-2.5 pb-3.5 lg:hidden">
      <span className="bg-muted relative size-11 shrink-0 overflow-hidden rounded-xl">
        <Image fill src={getImageUrl(product.images.at(0)?.url)} alt="" className="object-cover" sizes="44px" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <ProductPrice price={price} size="sm" />
      </div>
      <BuyBarButton kind={purchaseState.kind} onClick={addSelectionToCart} />
    </div>
  );
};

const BuyBarButton = ({ kind, onClick }: Props) => {
  if (kind === 'incomplete') {
    return <Button label="Pasirinkti savybes" disabled onClick={onClick} />;
  }

  if (kind === 'soldOut') {
    return <Button label="Išparduota" disabled onClick={onClick} />;
  }

  return <Button label="Į krepšelį" elementBefore={<ShoppingCart size={16} />} onClick={onClick} />;
};
