'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/ui/button';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const ProductFiltersContainer = () => {
  const MIN_PRICE = 0;
  const MAX_PRICE = 600;

  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  // Keep min <= max always (and avoid weird overlaps)
  const safeMin = useMemo(() => clamp(minPrice, MIN_PRICE, maxPrice), [minPrice, maxPrice]);
  const safeMax = useMemo(() => clamp(maxPrice, safeMin, MAX_PRICE), [maxPrice, safeMin]);

  const handleMinChange = (v: number) => setMinPrice(clamp(v, MIN_PRICE, maxPrice));
  const handleMaxChange = (v: number) => setMaxPrice(clamp(v, minPrice, MAX_PRICE));

  return (
    <aside className="w-full">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="space-y-5">
          {/* Search */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tumbleweed-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=""
                className="h-10 w-full rounded-md border bg-white pl-9 pr-3 text-sm outline-none transition focus:border-neutral-400"
                // mock-only (remove disabled when you hook it up)
                disabled
              />
            </div>

            <Button size="sm" label="Ieškoti" fullWidth onClick={() => {}} />
          </div>

          {/* Price filter */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-neutral-900">Kaina</div>

            {/* Values */}
            <div className="flex items-center justify-between gap-3 text-sm text-neutral-700">
              <div className="rounded-md border px-2 py-1">
                Nuo: <span className="font-semibold">{safeMin} €</span>
              </div>
              <div className="rounded-md border px-2 py-1">
                Iki: <span className="font-semibold">{safeMax} €</span>
              </div>
            </div>

            {/* Double range (two sliders) */}
            <div className="relative h-6">
              {/* Track */}
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-200" />

              {/* Filled range */}
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-tumbleweed-400"
                style={{
                  left: `${((safeMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  right: `${100 - ((safeMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                }}
              />

              {/* Min slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={safeMin}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                className="absolute left-0 right-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-tumbleweed-400 [&::-moz-range-thumb]:bg-tumbleweed-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-tumbleweed-400 [&::-webkit-slider-thumb]:bg-tumbleweed-400"
              />

              {/* Max slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={safeMax}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                className="absolute left-0 right-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-tumbleweed-400 [&::-moz-range-thumb]:bg-tumbleweed-400 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-tumbleweed-400 [&::-webkit-slider-thumb]:bg-tumbleweed-400"
              />
            </div>

            {/* Optional: apply/reset buttons (mock) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                className="h-9 rounded-md border text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                onClick={() => {
                  setMinPrice(MIN_PRICE);
                  setMaxPrice(MAX_PRICE);
                }}
                // mock-only (enable if you want reset even now)
                disabled
              >
                Išvalyti
              </button>
              <button
                type="button"
                className="h-9 rounded-md bg-black text-sm font-medium text-white hover:opacity-90"
                // mock-only
                disabled
              >
                Taikyti
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
