'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import type { PurchaseState, SelectionSummary } from '@/business/variant-selection';
import { scrollToOptionPicker } from '@/components/product/option-picker';
import { ProductPrice } from '@/components/product/product-price';
import { useProductPurchase } from '@/components/product/product-purchase-provider';
import Button from '@/components/ui/button';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  kind: PurchaseState['kind'];
  onAddToCart: () => void;
};

type SummaryProps = {
  summary: SelectionSummary;
};

const MISSING_PREFIX = 'Pasirink';

export const MobileBuyBar = () => {
  const { product, purchaseState, price, selectionSummary, isCtaVisible, addSelectionToCart } = useProductPurchase();

  if (isCtaVisible) {
    return null;
  }

  return (
    <div className="border-line sticky bottom-0 z-20 flex items-center gap-3 border-t bg-white px-4 pt-2.5 pb-3.5 lg:hidden">
      <span className="bg-muted relative size-11 shrink-0 overflow-hidden rounded-xl">
        <Image fill src={getImageUrl(product.images.at(0)?.url)} alt="" className="object-cover" sizes="44px" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <SelectionSummaryText summary={selectionSummary} />
        <ProductPrice price={price} size="sm" />
      </div>
      <BuyBarButton kind={purchaseState.kind} onAddToCart={addSelectionToCart} />
    </div>
  );
};

const SelectionSummaryText = ({ summary }: SummaryProps) => {
  if (summary.kind === 'none') {
    return null;
  }

  const text = summary.kind === 'missing' ? `${MISSING_PREFIX}: ${summary.groupNames.join(', ')}` : summary.label;

  return <span className="text-ink-muted truncate text-xs">{text}</span>;
};

const BuyBarButton = ({ kind, onAddToCart }: Props) => {
  if (kind === 'incomplete') {
    return <Button label="Pasirinkti savybes" onClick={scrollToOptionPicker} />;
  }

  if (kind === 'soldOut') {
    return <Button label="Išparduota" disabled onClick={onAddToCart} />;
  }

  return <Button label="Į krepšelį" elementBefore={<ShoppingCart size={16} />} onClick={onAddToCart} />;
};
