import type { ProductSort } from '@/lib/product-filters';

export type ProductView = 'comfortable' | 'compact';

export type FilterChip = {
  key: string;
  label: string;
  onRemove: () => void;
};

export type SortOption = {
  value: ProductSort;
  label: string;
};
