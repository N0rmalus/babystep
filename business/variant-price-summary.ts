import type { Product } from '@/actions/types';
import { getProductPricing, type ProductPricing } from '@/business/product-pricing';

export type PriceBadge = { kind: 'none' } | { kind: 'exact'; percent: number } | { kind: 'upTo'; percent: number };

export type VariantPriceSummary =
  | { kind: 'single'; price: number; regularPrice: number | null; badge: PriceBadge }
  | { kind: 'range'; min: number; max: number; badge: PriceBadge }
  | { kind: 'unavailable' };

export const getVariantPriceSummary = (product: Product, now = new Date()): VariantPriceSummary => {
  if (product.hasOptions) {
    return summarizeVariants(product, now);
  }

  const pricing = getProductPricing(product, now);

  if (!pricing.isOnSale) {
    return { kind: 'single', price: pricing.effectivePrice, regularPrice: null, badge: { kind: 'none' } };
  }

  return {
    kind: 'single',
    price: pricing.effectivePrice,
    regularPrice: pricing.regularPrice,
    badge: { kind: 'exact', percent: pricing.discountPercent },
  };
};

export const getSummaryDiscountPercent = (summary: VariantPriceSummary): number => {
  if (summary.kind === 'unavailable' || summary.badge.kind === 'none') {
    return 0;
  }

  return summary.badge.percent;
};

export const getStrikethroughPrice = (summary: VariantPriceSummary): number | null => {
  if (summary.kind !== 'single') {
    return null;
  }

  return summary.regularPrice;
};

export const getBiggestDiscount = (products: Product[], now = new Date()): number => {
  return Math.max(0, ...products.map((product) => getSummaryDiscountPercent(getVariantPriceSummary(product, now))));
};

const summarizeVariants = (product: Product, now: Date): VariantPriceSummary => {
  if (product.variants.length === 0) {
    return { kind: 'unavailable' };
  }

  const pricings = product.variants.map(({ price, salePrice }) =>
    getProductPricing({ price, salePrice, saleStartsAt: product.saleStartsAt, saleEndsAt: product.saleEndsAt }, now),
  );
  const effectivePrices = pricings.map(({ effectivePrice }) => effectivePrice);
  const min = Math.min(...effectivePrices);
  const max = Math.max(...effectivePrices);
  const badge = getBadge(pricings);

  if (min !== max) {
    return { kind: 'range', min, max, badge };
  }

  const regularPrices = pricings.map(({ regularPrice }) => regularPrice);
  const isEverySaleIdentical = badge.kind === 'exact' && hasSingleValue(regularPrices);

  const [sharedRegularPrice] = regularPrices;

  return { kind: 'single', price: min, regularPrice: isEverySaleIdentical ? sharedRegularPrice : null, badge };
};

const getBadge = (pricings: ProductPricing[]): PriceBadge => {
  const percents = pricings.map(({ discountPercent }) => discountPercent);
  const percent = Math.max(0, ...percents);
  const isEveryVariantOnSale = pricings.every(({ isOnSale }) => isOnSale);

  if (percent === 0) {
    return { kind: 'none' };
  }

  if (isEveryVariantOnSale && hasSingleValue(percents)) {
    return { kind: 'exact', percent };
  }

  return { kind: 'upTo', percent };
};

const hasSingleValue = (values: number[]) => new Set(values).size === 1;
