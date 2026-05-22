import { Product } from '@/actions/types';

export type ProductFilterSearchParams = {
  q?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
};

export type ProductFilters = {
  query: string;
  minPrice?: number;
  maxPrice?: number;
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

const parsePriceFilter = (value?: string | string[]) => {
  const price = Number(getSearchParamValue(value));

  if (!Number.isFinite(price) || price < 0) {
    return undefined;
  }

  return price;
};

const searchableProductValues = (product: Product) => [
  product.name,
  product.description,
  product.subcategory?.name,
  product.subcategory?.category?.name,
];

export const parseProductFilters = (searchParams: ProductFilterSearchParams): ProductFilters => {
  const query = getSearchParamValue(searchParams.q)?.trim() ?? '';
  const minPrice = parsePriceFilter(searchParams.minPrice);
  const maxPrice = parsePriceFilter(searchParams.maxPrice);

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    return {
      query,
      minPrice: maxPrice,
      maxPrice: minPrice,
    };
  }

  return {
    query,
    minPrice,
    maxPrice,
  };
};

export const filterProducts = (products: Product[], filters: ProductFilters) => {
  const normalizedQuery = filters.query.toLocaleLowerCase('lt-LT');
  const hasPriceFilter = filters.minPrice !== undefined || filters.maxPrice !== undefined;

  return products.filter((product) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      searchableProductValues(product).some((value) => value?.toLocaleLowerCase('lt-LT').includes(normalizedQuery));

    if (!matchesQuery || !hasPriceFilter) {
      return matchesQuery;
    }

    const price = Number(product.price);

    if (!Number.isFinite(price)) {
      return false;
    }

    const matchesMinPrice = filters.minPrice === undefined || price >= filters.minPrice;
    const matchesMaxPrice = filters.maxPrice === undefined || price <= filters.maxPrice;

    return matchesMinPrice && matchesMaxPrice;
  });
};

export const getProductPriceRange = (products: Product[]): ProductPriceRange => {
  const prices = products
    .map((product) => Number(product.price))
    .filter((price) => Number.isFinite(price) && price >= 0);

  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
};
