'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type { Product } from '@/actions/types';
import { Pagination } from '@/components/product-catalog/pagination';
import { ProductCatalogToolbar } from '@/components/product-catalog-toolbar/product-catalog-toolbar';
import type { ProductView } from '@/components/product-catalog-toolbar/types';
import type { ProductFilterOption } from '@/components/product-filters/types';
import { ProductCard } from '@/components/ui/product-card/product-card';
import type { ProductFilters } from '@/lib/product-filters';
import { EmptyFilteredProductsState } from '@/components/product-catalog/empty-filtered-products-state';

type Props = {
  filters: ProductFilters;
  products: Product[];
  visibleCount: number;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  subcategories?: ProductFilterOption[];
  mobileFilterControl?: ReactNode;
  searchPlaceholder?: string;
};

const productGridClassNames = {
  comfortable:
    'grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] md:gap-4',
  compact:
    'grid grid-cols-2 gap-3 min-[520px]:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] md:gap-4',
} satisfies Record<ProductView, string>;

export const ProductCatalogResults = ({
  filters,
  products,
  visibleCount,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
  subcategories,
  mobileFilterControl,
  searchPlaceholder,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<ProductView>('comfortable');

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: true });
  };

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <ProductCatalogToolbar
        initialFilters={filters}
        subcategories={subcategories}
        visibleCount={visibleCount}
        totalCount={totalCount}
        view={view}
        onViewChange={setView}
        mobileFilterControl={mobileFilterControl}
        searchPlaceholder={searchPlaceholder}
      />

      {products.length === 0 ? (
        <EmptyFilteredProductsState />
      ) : (
        <div className={productGridClassNames[view]}>
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      )}

      {products.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={visibleCount}
          pageSize={pageSize}
          currentItemCount={products.length}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
