import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

export type StockFilter = 'all' | 'in-stock' | 'low-stock';
export type WishlistSort = 'price-desc' | 'price-asc' | 'name-asc' | 'stock-desc';

interface Props {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  stockFilter: StockFilter;
  onStockFilterChange: (value: StockFilter) => void;
  sortBy: WishlistSort;
  onSortChange: (value: WishlistSort) => void;
  visibleCount: number;
  totalCount: number;
}

const stockFilters: Array<{ label: string; value: StockFilter }> = [
  { label: 'Visos', value: 'all' },
  { label: 'Yra sandėlyje', value: 'in-stock' },
  { label: 'Mažas kiekis', value: 'low-stock' },
];

export const WishlistToolbar = ({
  searchQuery,
  onSearchQueryChange,
  stockFilter,
  onStockFilterChange,
  sortBy,
  onSortChange,
  visibleCount,
  totalCount,
}: Props) => {
  return (
    <PaperWrapper>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-lg">
          <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">Paieška</div>

          <div className="relative mt-2">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Ieškoti pagal pavadinimą ar kategoriją"
              className="w-full rounded-xl border border-neutral-200 bg-white py-2 pr-3 pl-9 text-sm outline-hidden transition placeholder:text-neutral-400 focus:border-neutral-400"
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] lg:w-auto lg:min-w-90">
          <div>
            <label htmlFor="wishlist-sort" className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              Rikiavimas
            </label>
            <div className="relative mt-2">
              <SlidersHorizontal
                size={16}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
              />
              <select
                id="wishlist-sort"
                value={sortBy}
                onChange={(event) => onSortChange(event.target.value as WishlistSort)}
                className="w-full appearance-none rounded-xl border border-neutral-200 bg-white py-2 pr-3 pl-9 text-sm outline-hidden transition focus:border-neutral-400"
              >
                <option value="price-desc">Kaina: didžiausia pirma</option>
                <option value="price-asc">Kaina: mažiausia pirma</option>
                <option value="name-asc">Pavadinimas: A-Z</option>
                <option value="stock-desc">Likutis: didžiausias pirma</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-2">
        {stockFilters.map((filter) => (
          <button
            type="button"
            key={filter.value}
            onClick={() => onStockFilterChange(filter.value)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-semibold tracking-widest uppercase transition',
              stockFilter === filter.value
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900',
            )}
          >
            {filter.label}
          </button>
        ))}

        <p className="ml-auto text-sm text-neutral-500">
          Rodoma <span className="font-semibold text-neutral-900">{visibleCount}</span> iš{' '}
          <span className="font-semibold text-neutral-900">{totalCount}</span>
        </p>
      </div>
    </PaperWrapper>
  );
};
