'use client';

import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

import { ProductFiltersContainer } from '@/components/product-filters/product-filters-container';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import type { ProductFilterGroup, ProductFilterOption } from '@/components/product-filters/types';
import type { ProductFilters, ProductPriceRange } from '@/lib/product-filters';
import { getActiveProductFilterCount } from '@/lib/product-filters';

type Props = {
  initialFilters: ProductFilters;
  priceRange: ProductPriceRange;
  subcategories?: ProductFilterOption[];
  categoryGroups?: ProductFilterGroup[];
  showSaleFilter?: boolean;
};

export const MobileProductFiltersDrawer = ({
  initialFilters,
  priceRange,
  subcategories = [],
  categoryGroups = [],
  showSaleFilter = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = getActiveProductFilterCount(initialFilters);
  const filtersKey = `${JSON.stringify(initialFilters)}:${priceRange.min}:${priceRange.max}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-tumbleweed-50 hover:border-tumbleweed-300 text-ink flex h-10 items-center gap-2 rounded-full border border-transparent px-3 text-sm font-semibold transition"
        aria-label="Atidaryti filtrus"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        <span>Filtrai</span>
        {activeFilterCount > 0 && (
          <span className="bg-ink grid size-5 place-items-center rounded-full text-xs font-bold text-white tabular-nums">
            {activeFilterCount}
          </span>
        )}
      </button>

      <BottomSheet open={isOpen} onClose={() => setIsOpen(false)} className="lg:hidden">
        <ProductFiltersContainer
          key={filtersKey}
          initialFilters={initialFilters}
          priceRange={priceRange}
          subcategories={subcategories}
          categoryGroups={categoryGroups}
          showSaleFilter={showSaleFilter}
          variant="panel"
        />
      </BottomSheet>
    </>
  );
};
