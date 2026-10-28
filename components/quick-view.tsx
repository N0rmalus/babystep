'use client';

import { ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/actions/types';
import { toCurrency } from '@/business/to-currency';
import { BuyActions } from '@/components/product/buy-actions';
import { ColorPicker } from '@/components/product/color-picker';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductPrice } from '@/components/product/product-price';
import { ProductPurchaseProvider } from '@/components/product/product-purchase-provider';
import { ProductRatingCompact } from '@/components/product/product-rating-summary';
import { SizePicker } from '@/components/product/size-picker';
import { Modal } from '@/components/ui/modal';
import useQuickView from '@/hooks/use-quick-view';
import { FREE_SHIPPING_THRESHOLD, RETURN_PERIOD_DAYS } from '@/lib/consts';

export const QuickView = () => {
  const isOpen = useQuickView((state) => state.isOpen);
  const onClose = useQuickView((state) => state.onClose);
  const product = useQuickView((state) => state.product);

  if (!product) {
    return null;
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ProductPurchaseProvider key={product.id} product={product}>
        <QuickViewContent product={product} />
      </ProductPurchaseProvider>
    </Modal>
  );
};

const QuickViewContent = ({ product }: { product: Product }) => {
  const productHref = `/product/${product.id}`;

  return (
    <div className="grid gap-9 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:grid-cols-[27.5rem_minmax(0,1fr)]">
      <ProductGallery images={product.images} name={product.name} sizes="440px" />

      <div className="flex flex-col gap-5.5 pt-2 pr-10 pb-1">
        <div className="flex flex-col gap-2.5">
          <h2 className="font-accent text-3xl leading-tight font-bold text-balance">
            <Link href={productHref} className="hover:text-link">
              {product.name}
            </Link>
          </h2>
          <div className="flex items-center justify-between gap-3">
            <ProductPrice product={product} />
            {/* MOCK: rating until "Customer accounts" (reviews). */}
            <ProductRatingCompact />
          </div>
          <Link
            href={productHref}
            className="text-link hover:text-tumbleweed-800 flex min-h-8 w-fit items-center gap-1.5 font-semibold underline underline-offset-3"
          >
            Visa informacija apie prekę
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <hr className="border-line" />

        {/* MOCK: size and color pickers until "Product variants". */}
        <SizePicker columns="four" />
        <ColorPicker />

        <BuyActions />

        <p className="text-ink-muted flex items-center gap-2 text-sm">
          <Truck size={16} aria-hidden="true" />
          Nemokamas pristatymas nuo {toCurrency(FREE_SHIPPING_THRESHOLD)} · {RETURN_PERIOD_DAYS} d. grąžinimas
        </p>
      </div>
    </div>
  );
};
