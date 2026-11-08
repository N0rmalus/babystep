'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';

import type { OkCartLine, ResolvedCartLine } from '@/business/cart-line-resolution';
import { toCurrency } from '@/business/to-currency';
import IconButton from '@/components/ui/icon-button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { getImageUrl } from '@/lib/image-url';
import { getCartLineHref } from '@/lib/product-href';
import { cn } from '@/lib/utils';

type Props = {
  resolvedLine: ResolvedCartLine;
};

const LINE_GRID_CLASSES =
  'grid grid-cols-[5.25rem_minmax(0,1fr)_auto] items-start gap-3 xl:grid-cols-[7rem_minmax(0,1fr)_8.75rem_6.5rem_6rem] xl:items-center xl:gap-5';

export const CartLine = ({ resolvedLine }: Props) => {
  const { line, product, name } = resolvedLine;
  const removeFromCart = useCart((state) => state.removeItem);
  const isInWishlist = useWishlist((state) => state.items.includes(product.id));
  const addToWishlist = useWishlist((state) => state.addItem);
  const removeFromWishlist = useWishlist((state) => state.removeItem);

  const productHref = getCartLineHref(resolvedLine);
  const isPurchasable = resolvedLine.kind === 'ok' && !resolvedLine.isSoldOut;
  const hasProblem = resolvedLine.kind !== 'ok' || resolvedLine.isSoldOut || resolvedLine.hasInsufficientStock;

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      return;
    }

    addToWishlist(product.id);
  };

  const handleRemove = () => {
    removeFromCart(line);
  };

  return (
    <li
      className={cn(
        'shadow-card rounded-2xl border bg-white p-3.5 xl:rounded-none xl:border-0 xl:border-b xl:px-0 xl:py-5 xl:shadow-none xl:last:border-b-0',
        hasProblem ? 'border-danger-line' : 'border-line',
      )}
    >
      <div className={LINE_GRID_CLASSES}>
        <Link
          href={productHref}
          aria-hidden="true"
          tabIndex={-1}
          className="bg-muted relative block size-21 overflow-hidden rounded-xl xl:size-28 xl:rounded-2xl"
        >
          <Image
            fill
            src={getImageUrl(product.images.at(0)?.url)}
            alt=""
            sizes="112px"
            className={cn('object-cover', !isPurchasable && 'grayscale')}
          />
        </Link>

        <div className="flex min-w-0 flex-col gap-1 xl:gap-1.5">
          <Link href={productHref} className="text-ink hover:text-link text-base leading-snug font-semibold xl:text-lg">
            {name}
          </Link>
          {resolvedLine.kind === 'ok' && <UnitPrice resolvedLine={resolvedLine} />}
        </div>

        <div className="flex gap-2.5 justify-self-end xl:col-start-5 xl:row-start-1">
          <IconButton
            onClick={handleWishlistToggle}
            icon={
              <Heart
                size={16}
                className={cn(isInWishlist ? 'fill-sale-strong text-sale-strong' : 'fill-none')}
                aria-hidden="true"
              />
            }
            label={isInWishlist ? `Pašalinti „${name}“ iš norų sąrašo` : `Įtraukti „${name}“ į norų sąrašą`}
          />
          <IconButton
            onClick={handleRemove}
            icon={<Trash2 size={16} aria-hidden="true" />}
            variant="danger"
            label={`Pašalinti „${name}“ iš krepšelio`}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1 xl:col-span-1 xl:col-start-3 xl:row-start-1">
          <LineStatus resolvedLine={resolvedLine} productHref={productHref} />
        </div>

        {resolvedLine.kind === 'ok' && (
          <span className="text-ink self-center justify-self-end text-lg font-bold tabular-nums xl:col-start-4 xl:row-start-1">
            {toCurrency(resolvedLine.pricing.effectivePrice * resolvedLine.quantity)}
          </span>
        )}
      </div>
    </li>
  );
};

const UnitPrice = ({ resolvedLine: { pricing } }: { resolvedLine: OkCartLine }) => (
  <span className="flex items-baseline gap-2 text-sm tabular-nums">
    <span className={cn('font-semibold', pricing.isOnSale ? 'text-sale-strong' : 'text-ink')}>
      {toCurrency(pricing.effectivePrice)}
    </span>
    {pricing.isOnSale && (
      <span className="text-ink-faint text-xs line-through">
        <span className="sr-only">Buvusi kaina </span>
        {toCurrency(pricing.regularPrice)}
      </span>
    )}
    <span className="text-ink-muted">/ vnt.</span>
  </span>
);

const LineStatus = ({ resolvedLine, productHref }: { resolvedLine: ResolvedCartLine; productHref: string }) => {
  if (resolvedLine.kind === 'needsChoice') {
    return (
      <Link href={productHref} className="text-link text-sm font-semibold underline underline-offset-3">
        Pasirink savybes
      </Link>
    );
  }

  if (resolvedLine.kind === 'unavailable') {
    return (
      <>
        <span className="text-danger text-sm font-semibold">Šis pasirinkimas nebegalimas</span>
        <Link href={productHref} className="text-link text-xs font-semibold underline underline-offset-3">
          Pasirink kitą
        </Link>
      </>
    );
  }

  if (resolvedLine.kind === 'soldOut' || resolvedLine.isSoldOut) {
    return <span className="text-danger text-sm font-semibold">Išparduota</span>;
  }

  return <OkLineQuantity resolvedLine={resolvedLine} />;
};

const OkLineQuantity = ({ resolvedLine }: { resolvedLine: OkCartLine }) => {
  const setQuantity = useCart((state) => state.setQuantity);
  const { line, name, quantity, maxQuantity, hasInsufficientStock } = resolvedLine;

  const handleQuantityChange = (value: number) => {
    setQuantity({ ...line, quantity: value, maxQuantity });
  };

  return (
    <>
      <QuantitySelector
        value={quantity}
        max={Math.max(maxQuantity, quantity)}
        onChange={handleQuantityChange}
        label={`${name} kiekis`}
      />
      {hasInsufficientStock && <span className="text-danger text-xs font-semibold">Liko tik {maxQuantity} vnt.</span>}
    </>
  );
};
