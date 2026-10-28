'use client';

import { useState } from 'react';

import { BuyActions } from '@/components/product/buy-actions';
import { ColorPicker } from '@/components/product/color-picker';
import { ProductPrice } from '@/components/product/product-price';
import { useProductPurchase } from '@/components/product/product-purchase-provider';
import { ProductRatingLink } from '@/components/product/product-rating-summary';
import { SizePicker } from '@/components/product/size-picker';
import { SizeGuideDialog } from './size-guide-dialog';

export const ProductBuyBox = () => {
  const { product } = useProductPurchase();
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  return (
    <section aria-labelledby="product-name" className="flex flex-col gap-6 pt-6 lg:sticky lg:top-36 lg:gap-7 lg:pt-2">
      <div className="flex flex-col gap-2.5 lg:gap-3">
        <h1 id="product-name" className="font-accent text-3xl leading-tight font-bold text-balance sm:text-4xl">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-3 lg:mt-1 lg:gap-4">
          <ProductPrice product={product} />
          {/* MOCK: rating until "Customer accounts" (reviews). */}
          <ProductRatingLink />
        </div>
      </div>

      {/* MOCK: size and color pickers until "Product variants". */}
      <SizePicker
        action={
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-link min-h-11 text-sm font-semibold underline underline-offset-3 lg:min-h-8"
          >
            <span className="lg:hidden">Kaip išsirinkti?</span>
            <span className="hidden lg:inline">Kaip išsirinkti dydį?</span>
          </button>
        }
      />
      <ColorPicker />

      <BuyActions />

      {/* MOCK: size guide until "Product variants" and "Product specifications". */}
      <SizeGuideDialog isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </section>
  );
};
