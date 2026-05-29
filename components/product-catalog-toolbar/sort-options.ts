import type { SortOption } from '@/components/product-catalog-toolbar/types';
import type { ProductSort } from '@/lib/product-filters';

export const sortLabels = {
  recommended: 'Rekomenduojama',
  'price-asc': 'Kaina: mažiausia pirma',
  'price-desc': 'Kaina: didžiausia pirma',
  'name-asc': 'Pavadinimas A-Z',
} satisfies Record<ProductSort, string>;

export const sortOptions = [
  { value: 'recommended', label: sortLabels.recommended },
  { value: 'price-asc', label: sortLabels['price-asc'] },
  { value: 'price-desc', label: sortLabels['price-desc'] },
  { value: 'name-asc', label: sortLabels['name-asc'] },
] satisfies SortOption[];
