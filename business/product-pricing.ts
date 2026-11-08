type PriceLike = number | string | null | undefined;
type DateLike = string | null | undefined;

export interface PricingInput {
  price: PriceLike;
  salePrice?: PriceLike;
  saleStartsAt?: DateLike;
  saleEndsAt?: DateLike;
}

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

export interface ProductPricing {
  regularPrice: number;
  salePrice: number | null;
  effectivePrice: number;
  discountPercent: number;
  isOnSale: boolean;
}

export const getProductPricing = (input: PricingInput, now = new Date()): ProductPricing => {
  const regularPrice = normalizePrice(input.price) ?? 0;
  const salePrice = normalizePrice(input.salePrice);
  const saleStartsAt = normalizeDate(input.saleStartsAt);
  const saleEndsAt = normalizeDate(input.saleEndsAt);
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

export const getProductEffectivePrice = (input: PricingInput, now = new Date()): number => {
  return getProductPricing(input, now).effectivePrice;
};

export const isProductOnSale = (input: PricingInput, now = new Date()): boolean => {
  return getProductPricing(input, now).isOnSale;
};
