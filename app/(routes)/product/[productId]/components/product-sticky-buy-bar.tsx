'use client';

import { Product } from '@/actions/types';
import { getProductPricing } from '@/business/product-pricing';
import { toCurrency } from '@/business/to-currency';

type Props = {
  product: Product;
};

export const ProductStickyBuyBar = ({ product }: Props) => {
  const pricing = getProductPricing(product);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(26,23,20,0.12)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <div className="min-w-0">
          <div className="font-accent text-xl leading-none font-bold text-neutral-950">
            {toCurrency(pricing.effectivePrice)}
          </div>
          {pricing.isOnSale && (
            <div className="mt-1 text-xs font-medium text-neutral-400 line-through">
              {toCurrency(pricing.regularPrice)}
            </div>
          )}
        </div>
        <a
          href="#produkto-pasirinkimai"
          className="tap-strong ml-auto inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:opacity-80"
        >
          Pasirinkti
        </a>
      </div>
    </div>
  );
};
