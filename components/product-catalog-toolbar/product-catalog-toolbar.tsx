'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { LayoutGrid, Rows2, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FilterChipButton } from '@/components/product-catalog-toolbar/filter-chip-button';
import { SortDropdown } from '@/components/product-catalog-toolbar/sort-dropdown';
import type { FilterChip, ProductView } from '@/components/product-catalog-toolbar/types';
import { ViewButton } from '@/components/product-catalog-toolbar/view-button';
import type { ProductFilterOption } from '@/components/product-filters/types';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import type { ProductFilters, ProductSort } from '@/lib/product-filters';

type Props = {
  initialFilters: ProductFilters;
  subcategories?: ProductFilterOption[];
  visibleCount: number;
  totalCount: number;
  view: ProductView;
  onViewChange: (view: ProductView) => void;
  mobileFilterControl?: ReactNode;
  searchPlaceholder?: string;
};

const filterParamKeys = ['q', 'minPrice', 'maxPrice', 'subcategoryId', 'inStock', 'onSale'];
const SEARCH_DEBOUNCE_MS = 350;
const legacyViewParamKey = 'view';
const paginationParamKey = 'page';

export const ProductCatalogToolbar = ({
  initialFilters,
  subcategories = [],
  visibleCount,
  totalCount,
  view,
  onViewChange,
  mobileFilterControl,
  searchPlaceholder = 'Ieškoti šioje kategorijoje...',
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialFilters.query);

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

  useEffect(() => {
    if (!searchParams.has(legacyViewParamKey)) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete(legacyViewParamKey);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery === initialFilters.query) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (trimmedQuery) {
        params.set('q', trimmedQuery);
      } else {
        params.delete('q');
      }

      params.delete(paginationParamKey);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [initialFilters.query, pathname, query, router, searchParams]);

  useEffect(() => {
    if (document.activeElement === searchInputRef.current) {
      return;
    }

    setQuery(initialFilters.query);
  }, [initialFilters.query]);

  const subcategoryNameById = new Map(subcategories.map((subcategory) => [subcategory.id, subcategory.name]));

  const removeSubcategoryFilter = (subcategoryId: string) => {
    updateParams((params) => {
      const selectedSubcategories = initialFilters.subcategoryIds.filter((id) => id !== subcategoryId);

      if (selectedSubcategories.length > 0) {
        params.set('subcategoryId', selectedSubcategories.join(','));
      } else {
        params.delete('subcategoryId');
      }
    });
  };

  const chips: FilterChip[] = [
    ...(initialFilters.query
      ? [
          {
            key: 'q',
            label: `Paieška: ${initialFilters.query}`,
            onRemove: () => {
              setQuery('');
              updateParams((params) => params.delete('q'));
            },
          },
        ]
      : []),
    ...initialFilters.subcategoryIds.map((subcategoryId) => ({
      key: `subcategory-${subcategoryId}`,
      label: subcategoryNameById.get(subcategoryId) ?? 'Subkategorija',
      onRemove: () => removeSubcategoryFilter(subcategoryId),
    })),
    ...(initialFilters.minPrice !== undefined
      ? [
          {
            key: 'minPrice',
            label: `Nuo ${initialFilters.minPrice}€`,
            onRemove: () => updateParams((params) => params.delete('minPrice')),
          },
        ]
      : []),
    ...(initialFilters.maxPrice !== undefined
      ? [
          {
            key: 'maxPrice',
            label: `Iki ${initialFilters.maxPrice}€`,
            onRemove: () => updateParams((params) => params.delete('maxPrice')),
          },
        ]
      : []),
    ...(initialFilters.isInStock
      ? [
          {
            key: 'inStock',
            label: 'Yra sandėlyje',
            onRemove: () => updateParams((params) => params.delete('inStock')),
          },
        ]
      : []),
    ...(initialFilters.isOnSale
      ? [
          {
            key: 'onSale',
            label: 'Su nuolaida',
            onRemove: () => updateParams((params) => params.delete('onSale')),
          },
        ]
      : []),
  ];

  const onSortChange = (sort: ProductSort) => {
    updateParams((params) => {
      if (sort === 'recommended') {
        params.delete('sort');
      } else {
        params.set('sort', sort);
      }
    });
  };

  const onClearFilters = () => {
    setQuery('');

    updateParams((params) => {
      filterParamKeys.forEach((key) => params.delete(key));
    });
  };

  return (
    <PaperWrapper>
      <div className="flex flex-col gap-3">
        <div className="grid gap-2.5 xl:grid-cols-[minmax(0,1fr)_14.5rem_auto]">
          <label className="relative block">
            <Search
              size={15}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="focus:border-tumbleweed-300 bg-tumbleweed-50 h-10 w-full rounded-full border border-transparent pr-4 pl-10 text-sm outline-hidden transition placeholder:text-neutral-400 focus:bg-white"
            />
          </label>

          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2.5 max-[460px]:grid-cols-[auto_auto] max-[460px]:justify-between lg:grid-cols-[minmax(0,1fr)_auto] xl:contents">
            {mobileFilterControl && (
              <div className="max-[460px]:col-start-1 max-[460px]:row-start-1 lg:hidden">{mobileFilterControl}</div>
            )}

            <div className="min-w-0 max-[460px]:col-span-2 max-[460px]:row-start-2">
              <SortDropdown value={initialFilters.sort} onChange={onSortChange} />
            </div>

            <div className="bg-tumbleweed-50 inline-flex h-10 w-fit items-center justify-center rounded-full p-1 max-[460px]:col-start-2 max-[460px]:row-start-1 max-[460px]:justify-self-end">
              <ViewButton
                label="Patogus vaizdas"
                isActive={view === 'comfortable'}
                onClick={() => onViewChange('comfortable')}
                icon={<LayoutGrid size={16} aria-hidden="true" />}
              />
              <ViewButton
                label="Kompaktiškas vaizdas"
                isActive={view === 'compact'}
                onClick={() => onViewChange('compact')}
                icon={<Rows2 size={16} aria-hidden="true" />}
              />
            </div>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="border-t border-dashed border-neutral-200 pt-2.5">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="font-accent text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                Filtrai:
              </span>
              {chips.map((chip) => (
                <FilterChipButton key={chip.key} chip={chip} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-row justify-between gap-4">
          <p className="text-sm text-neutral-400">
            Rodoma <span className="font-accent font-bold text-neutral-900">{visibleCount}</span> iš{' '}
            <span className="font-accent font-bold text-neutral-900">{totalCount}</span>
          </p>

          {chips.length > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-tumbleweed-600 shrink-0 text-sm font-semibold underline underline-offset-4 transition"
            >
              Išvalyti filtrus
            </button>
          )}
        </div>
      </div>
    </PaperWrapper>
  );
};
