import type { Product } from '@/actions/types';

type PriceLike = number | string | null | undefined;
type DateLike = string | null | undefined;

const normalizePrice = (value: PriceLike) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numericValue = typeof value === 'number' ? value : Number(value);

  return Number.isFinite(numericValue) ? numericValue : null;
};

const normalizeDate = (value: DateLike) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

export const getProductPricing = (product: Product, now = new Date()) => {
  const regularPrice = normalizePrice(product.price) ?? 0;
  const salePrice = normalizePrice(product.salePrice);
  const saleStartsAt = normalizeDate(product.saleStartsAt);
  const saleEndsAt = normalizeDate(product.saleEndsAt);
  const hasValidSalePrice = salePrice !== null && salePrice > 0 && regularPrice > 0 && salePrice < regularPrice;
  const hasStarted = !saleStartsAt || saleStartsAt.getTime() <= now.getTime();
  const hasNotEnded = !saleEndsAt || saleEndsAt.getTime() >= now.getTime();
  const isOnSale = hasValidSalePrice && hasStarted && hasNotEnded;
  const effectivePrice = isOnSale && salePrice !== null ? salePrice : regularPrice;
  const discountPercent =
    isOnSale && salePrice !== null ? Math.max(Math.round(((regularPrice - salePrice) / regularPrice) * 100), 1) : 0;

  return {
    regularPrice,
    salePrice,
    effectivePrice,
    discountPercent,
    isOnSale,
  };
};

export const getProductEffectivePrice = (product: Product, now = new Date()) => {
  return getProductPricing(product, now).effectivePrice;
};

export const isProductOnSale = (product: Product, now = new Date()) => {
  return getProductPricing(product, now).isOnSale;
};

export const getBiggestDiscount = (products: Product[]) => {
  return products.reduce((maxDiscount, product) => {
    const { discountPercent } = getProductPricing(product);
    return Math.max(maxDiscount, discountPercent);
  }, 0);
};
