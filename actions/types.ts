interface ProductBase {
  id: string;
  subcategoryId: string;
  name: string;
  price: string;
  salePrice?: string | null;
  saleStartsAt?: string | null;
  saleEndsAt?: string | null;
  stockCount: number;
  isFeatured: boolean;
  createdAt?: string;
  description: string | null;
  images: Image[];
  subcategory: Subcategory;
}

interface ProductWithoutOptions {
  hasOptions: false;
  options: [];
  variants: [];
}

interface ProductWithOptions {
  hasOptions: true;
  options: ProductOption[];
  variants: ProductVariant[];
}

export type Product = ProductBase & (ProductWithoutOptions | ProductWithOptions);

export type OptionDisplay = 'CHIPS' | 'SWATCH';

export interface ProductOption {
  id: string;
  name: string;
  displayType: OptionDisplay;
  values: ProductOptionValue[];
}

export interface ProductOptionValue {
  id: string;
  label: string;
  hex: string | null;
  ageFromMonths: number | null;
  ageToMonths: number | null;
  heightFromCm: number | null;
  heightToCm: number | null;
  weightFromKg: string | null;
  weightToKg: string | null;
}

export interface ProductVariant {
  id: string;
  sku: string | null;
  label: string;
  optionValueIds: string[];
  price: string;
  salePrice: string | null;
  stockCount: number;
}

export interface ProductPriceRange {
  min: number;
  max: number;
}

export interface ProductCatalogResponse {
  products: Product[];
  totalCount: number;
  filteredCount: number;
  priceRange: ProductPriceRange;
  subcategoryCounts: Record<string, number>;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface Image {
  id: string;
  url: string;
  optionValueId?: string | null;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  category: Category;
}
