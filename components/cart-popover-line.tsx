'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import type { ResolvedCartLine } from '@/business/cart-line-resolution';
import { toCurrency } from '@/business/to-currency';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import useCart from '@/hooks/use-cart';
import { getImageUrl } from '@/lib/image-url';
import { getCartLineHref } from '@/lib/product-href';
import { cn } from '@/lib/utils';

type Props = {
  resolvedLine: ResolvedCartLine;
  hasDivider: boolean;
  onNavigate: (href: string) => void;
};

export const CartPopoverLine = ({ resolvedLine, hasDivider, onNavigate }: Props) => {
  const removeItem = useCart((state) => state.removeItem);
  const setQuantity = useCart((state) => state.setQuantity);
  const { line, product, name } = resolvedLine;
  const isOk = resolvedLine.kind === 'ok';
  const isPurchasable = isOk && !resolvedLine.isSoldOut;
  const productHref = getCartLineHref(resolvedLine);

  const handleNavigate = () => {
    onNavigate(productHref);
  };

  const handleQuantityChange = (value: number) => {
    if (resolvedLine.kind !== 'ok') {
      return;
    }

    setQuantity({ ...line, quantity: value, maxQuantity: resolvedLine.maxQuantity });
  };

  const handleRemove = () => {
    removeItem(line);
  };

  return (
    <div
      className={cn(
        'hover:bg-tumbleweed-50/80 mx-3 my-1.5 flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors',
        hasDivider && 'border-line border-t border-dashed',
        !isPurchasable && 'bg-danger-soft hover:bg-danger-soft opacity-75',
      )}
    >
      <button
        type="button"
        onClick={handleNavigate}
        className="grid min-w-0 flex-1 grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 text-left"
      >
        <span className="bg-muted relative size-14 overflow-hidden rounded-xl">
          <Image
            src={getImageUrl(product.images?.at(0)?.url)}
            alt={name}
            fill
            className={cn('object-cover', !isPurchasable && 'grayscale')}
            sizes="72px"
          />
        </span>

        <span className="min-w-0">
          <span className="text-ink line-clamp-2 text-sm leading-tight font-bold">{name}</span>
          <span className="text-ink-muted mt-1 block truncate text-xs">
            {product.subcategory?.category?.name ?? 'Kategorija'} · {product.subcategory?.name ?? 'Subkategorija'}
          </span>
          <span className={cn('mt-2 block text-xs', isPurchasable ? 'text-ink-muted' : 'text-danger font-semibold')}>
            {getPopoverLineStatus(resolvedLine)}
          </span>
        </span>
      </button>

      <div className="flex shrink-0 flex-col items-end gap-2">
        {resolvedLine.kind === 'ok' && (
          <span className="flex items-baseline gap-1.5">
            {resolvedLine.pricing.isOnSale && (
              <span className="text-ink-faint text-xs tabular-nums line-through">
                <span className="sr-only">Buvusi kaina</span>
                {toCurrency(resolvedLine.pricing.regularPrice * resolvedLine.quantity)}
              </span>
            )}
            <span className="text-ink text-base font-bold tabular-nums">
              {toCurrency(resolvedLine.pricing.effectivePrice * resolvedLine.quantity)}
            </span>
          </span>
        )}
        {resolvedLine.kind === 'ok' && !resolvedLine.isSoldOut && (
          <QuantitySelector
            value={resolvedLine.quantity}
            max={Math.max(resolvedLine.maxQuantity, resolvedLine.quantity)}
            onChange={handleQuantityChange}
            size="sm"
            label={`${name} kiekis`}
          />
        )}
        <button
          type="button"
          onClick={handleRemove}
          className="text-ink-faint hover:text-danger transition"
          aria-label={`Pašalinti ${name} iš krepšelio`}
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

const getPopoverLineStatus = (resolvedLine: ResolvedCartLine) => {
  if (resolvedLine.kind === 'needsChoice') {
    return 'Pasirink savybes';
  }

  if (resolvedLine.kind === 'unavailable') {
    return 'Šis pasirinkimas nebegalimas';
  }

  if (resolvedLine.kind === 'soldOut' || resolvedLine.isSoldOut) {
    return 'Išparduota';
  }

  return `${resolvedLine.quantity} × ${toCurrency(resolvedLine.pricing.effectivePrice)}`;
};
