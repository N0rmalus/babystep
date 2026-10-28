import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/actions/types';
import { FeaturedSaleCard } from '@/app/(routes)/components/featured-sale-card';
import { HomeSection } from '@/app/(routes)/components/home-section';
import { SectionHeading } from '@/app/(routes)/components/section-heading';
import { getProductPricing } from '@/business/product-pricing';
import { ProductCard } from '@/components/ui/product-card/product-card';
import { toPlainText } from '@/lib/rich-text';

type Props = {
  products: Product[];
};

const SIDE_PRODUCT_COUNT = 2;

export const SaleSection = ({ products }: Props) => {
  const [featured, ...others] = sortByDiscount(products);

  if (!featured) {
    return null;
  }

  return (
    <HomeSection labelledBy="home-sale" className="pt-7 lg:pt-28">
      <div className="mb-3 flex items-end justify-between gap-3 lg:mb-7 lg:gap-6">
        <SectionHeading
          id="home-sale"
          eyebrow={`Akcijos iki -${featured.discountPercent}%`}
          title="Švelnumas už mažiau"
          tone="sale"
        />
        <Link
          href="/akcijos"
          aria-label="Visos akcijos"
          className="group text-sale-strong flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold lg:gap-1.5 lg:text-base"
        >
          <span>
            Visos<span className="hidden lg:inline"> akcijos</span>
          </span>
          <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
        <FeaturedSaleCard product={featured.product} summary={toPlainText(featured.product.description)} />
        {others.slice(0, SIDE_PRODUCT_COUNT).map(({ product }) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </HomeSection>
  );
};

const sortByDiscount = (products: Product[]) => {
  return products
    .map((product) => ({ product, discountPercent: getProductPricing(product).discountPercent }))
    .filter(({ discountPercent }) => discountPercent > 0)
    .sort((first, second) => second.discountPercent - first.discountPercent);
};
