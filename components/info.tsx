'use client';

import { useState } from 'react';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/actions/types';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import useWishlist from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';
import { RichTextContent } from '@/components/ui/rich-text-content';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { ReviewStarRow } from '@/app/(routes)/product/[productId]/components/ReviewStarRow';

type Props = {
  data: Product;
  selectedColor?: ProductColorOption;
  selectedSize?: ProductSizeOption;
  onColorChange?: (color: ProductColorOption) => void;
  onSizeChange?: (size: ProductSizeOption) => void;
};

export type ProductSizeOption = {
  id: string;
  label: string;
  note: string;
  isDisabled?: boolean;
};

export type ProductColorOption = {
  id: string;
  label: string;
  hex: string;
};

export const PRODUCT_SIZE_OPTIONS = [
  { id: '80x100', label: '80 x 100 cm', note: 'Lopšiui' },
  { id: '100x140', label: '100 x 140 cm', note: 'Lovytei' },
  { id: '120x160', label: '120 x 160 cm', note: 'Vaiko lovai', isDisabled: true },
] satisfies ProductSizeOption[];

export const PRODUCT_COLOR_OPTIONS = [
  { id: 'milk', label: 'Pieno baltumo', hex: '#f6eee4' },
  { id: 'sand', label: 'Smėlio', hex: '#d8b48f' },
  { id: 'sage', label: 'Šalavijo', hex: '#a8b6a1' },
  { id: 'rose', label: 'Rožinė', hex: '#e8b9ad' },
] satisfies ProductColorOption[];

export const Info = ({
  data,
  selectedColor = PRODUCT_COLOR_OPTIONS[0],
  selectedSize = PRODUCT_SIZE_OPTIONS[0],
  onColorChange,
  onSizeChange,
}: Props) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const category = data?.subcategory?.category;
  const subcategory = data?.subcategory;
  const isInStock = data.amountInStock > 0;
  const isInWishlist = wishlist.hasItem(data.id);
  const pricing = getProductPricing(data);
  const hasDescription = Boolean(data.description?.trim());

  const onAddToCart = () => {
    cart.addItem(data.id);
  };

  const onToggleWishlist = () => {
    if (isInWishlist) {
      wishlist.removeItem(data.id);

      return;
    }

    wishlist.addItem(data.id);
  };

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, 9));
  };

  return (
    <PaperWrapper className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start gap-x-3 gap-y-3">
        {category?.id && subcategory?.id && (
          <div className="inline-flex items-center">
            <Badge
              label={category.name}
              onClick={() => {
                router.push(`/category/${category.id}`);
              }}
              variant="rounded"
              color="tumbleweed-outlined"
            />

            <span className="pointer-events-none relative z-10 -mx-1 inline-flex h-2 w-2 shrink-0">
              <span className="bg-tumbleweed-200 h-2 w-2 rounded-full" />
            </span>

            <Badge
              label={subcategory.name}
              onClick={() => {
                router.push(`/category/${category.id}/${subcategory.id}`);
              }}
              variant="rounded"
              color="tumbleweed-outlined"
            />
          </div>
        )}

        <Badge
          label={isInStock ? `Yra sandėlyje (${data.amountInStock} vnt.)` : 'Išparduota'}
          variant="rounded"
          color={isInStock ? 'green' : 'rose'}
        />

        {pricing.isOnSale && <Badge label={`Akcija -${pricing.discountPercent}%`} variant="rounded" color="salmon" />}
      </div>

      <div>
        <h1 className="font-accent text-3xl leading-tight  font-black text-neutral-950 sm:text-4xl">{data.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          <ReviewStarRow rating={4.9} />
          <a
            href="#atsiliepimai"
            className="border-neutral-300 pb-0.5 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <strong className="font-semibold text-neutral-900">4.9</strong> · 28 atsiliepimai
          </a>
          <span className="text-neutral-300">/</span>
          <span>SKU BS-{data.id.slice(0, 6).toUpperCase()}</span>
        </div>
      </div>

      <div className="border-y border-neutral-200 py-5">
        <div className="flex items-end justify-between gap-x-3 gap-y-2">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
            <div
              className={cn(
                'font-accent text-4xl leading-none font-bold',
                pricing.isOnSale ? 'text-tumbleweed-700' : 'text-neutral-950',
              )}
            >
              {toCurrency(pricing.effectivePrice)}
            </div>
            {pricing.isOnSale && (
              <div className="font-accent text-lg font-medium text-neutral-400 line-through">
                {toCurrency(pricing.regularPrice)}
              </div>
            )}
          </div>

          {pricing.isOnSale && (
            <Badge
              label={`Sutaupote ${toCurrency(pricing.regularPrice - pricing.effectivePrice)}`}
              variant="rounded"
              color="salmon"
            />
          )}
        </div>
      </div>

      <div className="text-sm leading-6 text-neutral-600 sm:text-base">
        {hasDescription ? (
          <RichTextContent content={data.description} className="mt-4" />
        ) : (
          <p className="mt-3 text-sm text-neutral-500">Aprašymo nėra.</p>
        )}
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <span className="font-accent text-sm font-bold tracking-wider text-neutral-950 uppercase">Dydis</span>

          <div className="flex gap-3 overflow-x-auto">
            {PRODUCT_SIZE_OPTIONS.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => {
                  if (!size.isDisabled) {
                    onSizeChange?.(size);
                  }
                }}
                disabled={size.isDisabled}
                className={cn(
                  'tap-surface min-w-24 rounded-xl border px-4 py-3 text-left transition',
                  selectedSize.id === size.id
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'hover:border-tumbleweed-400 border-neutral-200 bg-white text-neutral-950',
                  size.isDisabled && 'cursor-not-allowed line-through opacity-40',
                )}
              >
                <span className="block text-sm font-bold">{size.label}</span>
                <span
                  className={cn(
                    'mt-0.5 block text-xs',
                    selectedSize.id === size.id ? 'text-white/70' : 'text-neutral-500',
                  )}
                >
                  {size.note}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-accent text-sm font-bold text-neutral-950 uppercase">Spalva</span>
            <span className="text-sm text-neutral-500">{selectedColor.label}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {PRODUCT_COLOR_OPTIONS.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => onColorChange?.(color)}
                className={cn(
                  'relative size-10 rounded-full border-2 transition hover:scale-105',
                  selectedColor.id === color.id ? 'border-neutral-950' : 'border-transparent',
                )}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              >
                <span
                  className={cn(
                    'absolute -inset-1.5 rounded-full border transition',
                    selectedColor.id === color.id ? 'border-tumbleweed-300' : 'border-transparent',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
        <div className="inline-flex h-14 items-center rounded-full border border-neutral-300 bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity === 1}
            className="tap-surface flex size-12 items-center justify-center rounded-full text-neutral-900 disabled:text-neutral-300"
          >
            <Minus size={18} />
          </button>
          <span className="min-w-8 text-center text-base font-bold tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={increaseQuantity}
            className="tap-surface flex size-12 items-center justify-center rounded-full text-neutral-900"
          >
            <Plus size={18} />
          </button>
        </div>

        <Button
          size="md"
          onClick={onAddToCart}
          elementBefore={isInStock && <ShoppingCart size={18} />}
          label={isInStock ? 'Pridėti į krepšelį' : 'Prekė išparduota :('}
          variant="primary"
          disabled={!isInStock}
          fullWidth
        />
        <button
          type="button"
          onClick={onToggleWishlist}
          className="tap-surface hidden size-14 items-center justify-center rounded-full border bg-white text-black hover:bg-gray-100 sm:flex"
        >
          <Heart size={20} className={cn(isInWishlist && 'fill-tumbleweed-500 text-tumbleweed-700')} />
        </button>
      </div>
    </PaperWrapper>
  );
};
