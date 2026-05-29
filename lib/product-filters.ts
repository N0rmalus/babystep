export type ProductSort = 'recommended' | 'price-asc' | 'price-desc' | 'name-asc';

export type ProductFilterSearchParams = {
  q?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
  subcategoryId?: string | string[];
  inStock?: string | string[];
  onSale?: string | string[];
  sort?: string | string[];
  page?: string | string[];
};

export type ProductFilters = {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  subcategoryIds: string[];
  isInStock: boolean;
  isOnSale: boolean;
  sort: ProductSort;
};

export type ProductPriceRange = {
  min: number;
  max: number;
};

const getSearchParamValue = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const getSearchParamValues = (value?: string | string[]) => {
  const values = Array.isArray(value) ? value : value ? [value] : [];

  return values
    .flatMap((item) => item.split(','))
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseBooleanFilter = (value?: string | string[]) => {
  const normalizedValue = getSearchParamValue(value);

  return normalizedValue === '1' || normalizedValue === 'true';
};

const parseSort = (value?: string | string[]): ProductSort => {
  const normalizedValue = getSearchParamValue(value);

  if (normalizedValue === 'price-asc' || normalizedValue === 'price-desc' || normalizedValue === 'name-asc') {
    return normalizedValue;
  }

  return 'recommended';
};

const parsePriceFilter = (value?: string | string[]) => {
  const price = Number(getSearchParamValue(value));

  if (!Number.isFinite(price) || price < 0) {
    return undefined;
  }

  return price;
};

export const parseProductPage = (value?: string | string[]) => {
  const page = Number(getSearchParamValue(value));

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
};

export const parseProductFilters = (searchParams: ProductFilterSearchParams): ProductFilters => {
  const query = getSearchParamValue(searchParams.q)?.trim() ?? '';
  const minPrice = parsePriceFilter(searchParams.minPrice);
  const maxPrice = parsePriceFilter(searchParams.maxPrice);
  const baseFilters = {
    query,
    subcategoryIds: getSearchParamValues(searchParams.subcategoryId),
    isInStock: parseBooleanFilter(searchParams.inStock),
    isOnSale: parseBooleanFilter(searchParams.onSale),
    sort: parseSort(searchParams.sort),
  };

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    return {
      ...baseFilters,
      minPrice: maxPrice,
      maxPrice: minPrice,
    };
  }

  return {
    ...baseFilters,
    minPrice,
    maxPrice,
  };
};

export const getActiveProductFilterCount = (filters: ProductFilters) => {
  return (
    Number(filters.query.length > 0) +
    Number(filters.minPrice !== undefined) +
    Number(filters.maxPrice !== undefined) +
    filters.subcategoryIds.length +
    Number(filters.isInStock) +
    Number(filters.isOnSale)
  );
};
