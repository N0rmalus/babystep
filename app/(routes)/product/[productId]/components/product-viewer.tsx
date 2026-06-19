'use client';

import { useState } from 'react';

import { Product } from '@/actions/types';
import { Gallery } from '@/components/gallery';
import {
  Info,
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
  ProductColorOption,
  ProductSizeOption,
} from '@/components/info';
import { ProductInformation } from '@/app/(routes)/product/[productId]/components/product-information';
import { ProductReviews } from '@/app/(routes)/product/[productId]/components/product-reviews';
import { ProductStickyBuyBar } from '@/app/(routes)/product/[productId]/components/product-sticky-buy-bar';

type Props = {
  product: Product;
};

export const ProductViewer = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(PRODUCT_SIZE_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColorOption>(PRODUCT_COLOR_OPTIONS[0]);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(25rem,0.95fr)] lg:items-start lg:gap-12">
        <Gallery images={product.images} wishlistProductId={product.id} />
        <Info
          data={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
        />
      </div>

      <div className="mt-10 flex flex-col gap-10 lg:mt-14 lg:gap-14">
        <ProductInformation product={product} selectedColor={selectedColor} selectedSize={selectedSize} />
        <ProductReviews />
      </div>

      <ProductStickyBuyBar product={product} />
    </div>
  );
};
