'use client';

import { FormEvent, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { ProductFilters, ProductPriceRange } from '@/lib/product-filters';
import Button from '@/components/ui/button';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

type Props = {
  initialFilters: ProductFilters;
  priceRange: ProductPriceRange;
  visibleCount: number;
  totalCount: number;
};

const replaceFilterParam = (params: URLSearchParams, key: string, value: string | undefined) => {
  if (value) {
    params.set(key, value);
    return;
  }

  params.delete(key);
};

export const ProductFiltersContainer = ({ initialFilters, priceRange, visibleCount, totalCount }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialFilters.query);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice ?? priceRange.min);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ?? priceRange.max);

  const safeMin = clamp(minPrice, priceRange.min, priceRange.max);
  const safeMax = clamp(maxPrice, safeMin, priceRange.max);
  const rangeSize = Math.max(priceRange.max - priceRange.min, 1);
  const canFilterByPrice = priceRange.max > priceRange.min;
  const hasActiveFilters =
    initialFilters.query.length > 0 || initialFilters.minPrice !== undefined || initialFilters.maxPrice !== undefined;
  const hasDraftFilters =
    query.trim() !== initialFilters.query ||
    safeMin !== (initialFilters.minPrice ?? priceRange.min) ||
    safeMax !== (initialFilters.maxPrice ?? priceRange.max);

  const replaceUrl = (params: URLSearchParams) => {
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const onApplyFilters = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = query.trim();

    replaceFilterParam(params, 'q', trimmedQuery || undefined);
    replaceFilterParam(params, 'minPrice', canFilterByPrice && safeMin > priceRange.min ? String(safeMin) : undefined);
    replaceFilterParam(params, 'maxPrice', canFilterByPrice && safeMax < priceRange.max ? String(safeMax) : undefined);
    replaceUrl(params);
  };

  const onResetFilters = () => {
    setQuery('');
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.delete('minPrice');
    params.delete('maxPrice');
    replaceUrl(params);
  };

  const handleMinChange = (value: number) => {
    setMinPrice(clamp(value, priceRange.min, safeMax));
  };

  const handleMaxChange = (value: number) => {
    setMaxPrice(clamp(value, safeMin, priceRange.max));
  };

  return (
      <PaperWrapper className="sticky top-24 p-4 sm:p-5">
        <form className="space-y-6" onSubmit={onApplyFilters}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">Filtrai</p>
              <p className="mt-1 text-sm text-neutral-500">
                Rodoma <span className="font-semibold text-neutral-900">{visibleCount}</span> iš{' '}
                <span className="font-semibold text-neutral-900">{totalCount}</span>
              </p>
            </div>
            <SlidersHorizontal size={18} className="text-tumbleweed-500 mt-1 shrink-0" />
          </div>

          <div className="space-y-2">
            <label htmlFor="product-search" className="text-sm font-semibold text-neutral-900">
              Paieška
            </label>
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
              />
              <input
                id="product-search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ieškoti prekių"
                className="w-full rounded-xl border border-neutral-200 bg-white py-2 pr-3 pl-9 text-sm outline-hidden transition placeholder:text-neutral-400 focus:border-neutral-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-neutral-900">Kaina</p>
              <p className="text-xs text-neutral-500">
                {priceRange.min} - {priceRange.max} €
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                <span>Nuo</span>
                <input
                  type="number"
                  min={priceRange.min}
                  max={safeMax}
                  value={safeMin}
                  onChange={(event) => handleMinChange(Number(event.target.value))}
                  disabled={!canFilterByPrice}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium tracking-normal text-neutral-900 outline-hidden transition focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
                />
              </label>

              <label className="space-y-1 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                <span>Iki</span>
                <input
                  type="number"
                  min={safeMin}
                  max={priceRange.max}
                  value={safeMax}
                  onChange={(event) => handleMaxChange(Number(event.target.value))}
                  disabled={!canFilterByPrice}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium tracking-normal text-neutral-900 outline-hidden transition focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400"
                />
              </label>
            </div>

            <div className="relative h-7">
              <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-neutral-200" />
              <div
                className="bg-tumbleweed-400 absolute top-1/2 h-1 -translate-y-1/2 rounded-full"
                style={{
                  left: `${((safeMin - priceRange.min) / rangeSize) * 100}%`,
                  right: `${100 - ((safeMax - priceRange.min) / rangeSize) * 100}%`,
                }}
              />

              <input
                aria-label="Mažiausia kaina"
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={safeMin}
                onChange={(event) => handleMinChange(Number(event.target.value))}
                disabled={!canFilterByPrice}
                className="[&::-moz-range-thumb]:border-tumbleweed-400 [&::-moz-range-thumb]:bg-tumbleweed-400 [&::-webkit-slider-thumb]:border-tumbleweed-400 [&::-webkit-slider-thumb]:bg-tumbleweed-400 absolute top-0 right-0 left-0 z-10 h-7 w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border"
              />

              <input
                aria-label="Didžiausia kaina"
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={safeMax}
                onChange={(event) => handleMaxChange(Number(event.target.value))}
                disabled={!canFilterByPrice}
                className="[&::-moz-range-thumb]:border-tumbleweed-400 [&::-moz-range-thumb]:bg-tumbleweed-400 [&::-webkit-slider-thumb]:border-tumbleweed-400 [&::-webkit-slider-thumb]:bg-tumbleweed-400 absolute top-0 right-0 left-0 z-20 h-7 w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Button
              variant="secondary"
              disabled={!hasActiveFilters && !hasDraftFilters}
              onClick={onResetFilters}
              label="Išvalyti"
              size="sm"
              aria-label="Išvalyti"
            />
            <Button type="submit" variant="primary" label="Taikyti" size="sm" aria-label="Taikyti" />
          </div>
        </form>
      </PaperWrapper>
  );
};
