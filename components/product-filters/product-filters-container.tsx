'use client';

import { FormEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CategoryFilterTree } from '@/components/product-filters/category-filter-tree';
import { FilterCheckbox } from '@/components/product-filters/filter-checkbox';
import { FilterSection } from '@/components/product-filters/filter-section';
import { PriceRangeSlider } from '@/components/product-filters/price-range-slider';
import type { ProductFilterGroup, ProductFilterOption } from '@/components/product-filters/types';
import Button from '@/components/ui/button';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import type { ProductFilters, ProductPriceRange } from '@/lib/product-filters';

type Props = {
  initialFilters: ProductFilters;
  priceRange: ProductPriceRange;
  subcategories?: ProductFilterOption[];
  categoryGroups?: ProductFilterGroup[];
  variant?: 'sidebar' | 'panel';
  showSaleFilter?: boolean;
};

const paginationParamKey = 'page';
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const ProductFiltersContainer = ({
  initialFilters,
  priceRange,
  subcategories = [],
  categoryGroups = [],
  variant = 'sidebar',
  showSaleFilter = true,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice ?? priceRange.min);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ?? priceRange.max);

  const safeMin = clamp(minPrice, priceRange.min, priceRange.max);
  const safeMax = clamp(maxPrice, safeMin, priceRange.max);
  const canFilterByPrice = priceRange.max > priceRange.min;
  const hasCategoryGroups = categoryGroups.length > 0;
  const hasSubcategoryFilters = subcategories.length > 0;
  const hasTaxonomyFilters = hasCategoryGroups || hasSubcategoryFilters;
  const checkboxVariant = variant === 'panel' ? 'touch' : 'compact';

  const replaceUrl = (params: URLSearchParams) => {
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const updateParams = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    updater(params);
    params.delete(paginationParamKey);
    replaceUrl(params);
  };

  const onToggleSubcategory = (subcategoryId: string) => {
    updateParams((params) => {
      const selectedSubcategories = new Set(initialFilters.subcategoryIds);

      if (selectedSubcategories.has(subcategoryId)) {
        selectedSubcategories.delete(subcategoryId);
      } else {
        selectedSubcategories.add(subcategoryId);
      }

      const nextValue = [...selectedSubcategories].join(',');

      if (nextValue) {
        params.set('subcategoryId', nextValue);
      } else {
        params.delete('subcategoryId');
      }
    });
  };

  const onToggleBooleanFilter = (key: 'inStock' | 'onSale', isChecked: boolean) => {
    updateParams((params) => {
      if (isChecked) {
        params.set(key, '1');
      } else {
        params.delete(key);
      }
    });
  };

  const onApplyPrice = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateParams((params) => {
      if (canFilterByPrice && safeMin > priceRange.min) {
        params.set('minPrice', String(safeMin));
      } else {
        params.delete('minPrice');
      }

      if (canFilterByPrice && safeMax < priceRange.max) {
        params.set('maxPrice', String(safeMax));
      } else {
        params.delete('maxPrice');
      }
    });
  };

  return (
    <PaperWrapper className={variant === 'sidebar' ? 'sticky top-24 p-3.5' : 'border-0 p-0 shadow-none sm:p-0'}>
      <div className="flex flex-col gap-4">
        {hasCategoryGroups && (
          <FilterSection title="Kategorijos">
            <CategoryFilterTree
              groups={categoryGroups}
              selectedSubcategoryIds={initialFilters.subcategoryIds}
              checkboxVariant={checkboxVariant}
              onToggleSubcategory={onToggleSubcategory}
            />
          </FilterSection>
        )}

        {!hasCategoryGroups && hasSubcategoryFilters && (
          <FilterSection title="Subkategorijos">
            <div className="space-y-1.5">
              {subcategories.map((subcategory) => (
                <FilterCheckbox
                  key={subcategory.id}
                  label={subcategory.name}
                  count={subcategory.count}
                  variant={checkboxVariant}
                  checked={initialFilters.subcategoryIds.includes(subcategory.id)}
                  onChange={() => onToggleSubcategory(subcategory.id)}
                />
              ))}
            </div>
          </FilterSection>
        )}

        <FilterSection title="Kaina" withTopBorder={hasTaxonomyFilters}>
          <form className="space-y-2" onSubmit={onApplyPrice}>
            <PriceRangeSlider
              min={priceRange.min}
              max={priceRange.max}
              valueMin={safeMin}
              valueMax={safeMax}
              disabled={!canFilterByPrice}
              onChange={(valueMin, valueMax) => {
                setMinPrice(clamp(valueMin, priceRange.min, valueMax));
                setMaxPrice(clamp(valueMax, valueMin, priceRange.max));
              }}
            />
            <Button type="submit" size="sm" variant="secondary" label="Taikyti" className="py-1.5 text-xs" fullWidth />
          </form>
        </FilterSection>

        <FilterSection title="Būsena" withTopBorder>
          <div className="space-y-1.5">
            <FilterCheckbox
              label="Yra sandėlyje"
              variant={checkboxVariant}
              checked={initialFilters.isInStock}
              onChange={(isChecked) => onToggleBooleanFilter('inStock', isChecked)}
            />
            {showSaleFilter && (
              <FilterCheckbox
                label="Tik su nuolaida"
                variant={checkboxVariant}
                checked={initialFilters.isOnSale}
                onChange={(isChecked) => onToggleBooleanFilter('onSale', isChecked)}
              />
            )}
          </div>
        </FilterSection>
      </div>
    </PaperWrapper>
  );
};
