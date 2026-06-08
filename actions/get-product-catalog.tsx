import type { ProductCatalogResponse } from '@/actions/types';
import { apiGet } from '@/lib/api-client';
import type { ProductFilters } from '@/lib/product-filters';

type Query = {
  categoryId?: string;
  subcategoryId?: string;
  baseOnSale?: boolean;
  filters: ProductFilters;
  page?: number;
};

const getProductCatalog = async ({
  categoryId,
  subcategoryId,
  baseOnSale,
  filters,
  page,
}: Query): Promise<ProductCatalogResponse> =>
  apiGet<ProductCatalogResponse>('/products', {
    query: {
      includeCatalog: true,
      categoryId,
      subcategoryId,
      baseOnSale: baseOnSale || undefined,
      q: filters.query || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      subcategoryIds: filters.subcategoryIds.length > 0 ? filters.subcategoryIds.join(',') : undefined,
      inStock: filters.isInStock || undefined,
      onSale: filters.isOnSale || undefined,
      sort: filters.sort === 'recommended' ? undefined : filters.sort,
      page: page && page > 1 ? page : undefined,
    },
  });

export default getProductCatalog;
