import type { Product, ProductVariant } from '@/actions/types';
import { getProductPricing, type ProductPricing } from '@/business/product-pricing';
import { getVariantPriceSummary } from '@/business/variant-price-summary';

const VALUE_LABEL_SEPARATOR = ' · ';

export type Selection = Partial<Record<string, string>>;

export type PurchaseState =
  | { kind: 'incomplete' }
  | { kind: 'soldOut'; variant: ProductVariant | null }
  | { kind: 'buyable'; variant: ProductVariant | null; maxQuantity: number };

export type SelectionSummary =
  | { kind: 'none' }
  | { kind: 'missing'; groupNames: string[] }
  | { kind: 'selected'; label: string };

export type SelectionPrice =
  | { kind: 'exact'; pricing: ProductPricing }
  | { kind: 'range'; min: number; max: number }
  | { kind: 'none' };

export const getInitialSelection = (product: Product): Selection => {
  return Object.fromEntries(
    product.options.flatMap(({ id, values }) => {
      const [onlyValue] = values;

      return values.length === 1 && onlyValue ? [[id, onlyValue.id]] : [];
    }),
  );
};

export const getSelectionFromVariantId = (product: Product, variantId: string | undefined): Selection => {
  const variant = product.variants.find(({ id }) => id === variantId);

  if (!variant) {
    return getInitialSelection(product);
  }

  return Object.fromEntries(
    product.options.flatMap(({ id, values }) => {
      const value = values.find((item) => variant.optionValueIds.includes(item.id));

      return value ? [[id, value.id]] : [];
    }),
  );
};

export const getBuyableValueIds = (product: Product, selection: Selection): Set<string> => {
  const inStockVariants = product.variants.filter(({ stockCount }) => stockCount > 0);

  return new Set(
    product.options.flatMap((group) => {
      const otherChoices = getChosenValueIds(product, selection).filter((valueId) => valueId !== selection[group.id]);

      return group.values
        .filter((value) =>
          inStockVariants.some(({ optionValueIds }) =>
            [value.id, ...otherChoices].every((valueId) => optionValueIds.includes(valueId)),
          ),
        )
        .map(({ id }) => id);
    }),
  );
};

const getChosenValueIds = (product: Product, selection: Selection) => {
  return product.options.flatMap(({ id }) => {
    const valueId = selection[id];

    return valueId ? [valueId] : [];
  });
};

type ToggleValueOptions = {
  product: Product;
  selection: Selection;
  groupId: string;
  valueId: string;
};

export const toggleValue = ({ product, selection, groupId, valueId }: ToggleValueOptions): Selection => {
  if (selection[groupId] !== valueId) {
    return { ...selection, [groupId]: valueId };
  }

  const group = product.options.find(({ id }) => id === groupId);

  if (group?.values.length === 1) {
    return selection;
  }

  return Object.fromEntries(Object.entries(selection).filter(([id]) => id !== groupId));
};

const getSelectedVariant = (product: Product, selection: Selection) => {
  if (!isSelectionComplete(product, selection)) {
    return null;
  }

  const chosenValueIds = getChosenValueIds(product, selection);

  return (
    product.variants.find(({ optionValueIds }) =>
      chosenValueIds.every((valueId) => optionValueIds.includes(valueId)),
    ) ?? null
  );
};

export const getPurchaseState = (product: Product, selection: Selection): PurchaseState => {
  if (!product.hasOptions) {
    return toStockState(null, product.stockCount);
  }

  if (product.variants.length === 0) {
    return { kind: 'soldOut', variant: null };
  }

  if (!isSelectionComplete(product, selection)) {
    return { kind: 'incomplete' };
  }

  const variant = getSelectedVariant(product, selection);

  return toStockState(variant, variant?.stockCount ?? 0);
};

const isSelectionComplete = (product: Product, selection: Selection) => {
  return product.options.every(({ id }) => Boolean(selection[id]));
};

const toStockState = (variant: ProductVariant | null, stockCount: number) => {
  if (stockCount < 1) {
    return { kind: 'soldOut', variant } satisfies PurchaseState;
  }

  return { kind: 'buyable', variant, maxQuantity: stockCount } satisfies PurchaseState;
};

type SelectionPriceOptions = {
  product: Product;
  selection: Selection;
  now?: Date;
};

export const getSelectionPrice = ({ product, selection, now = new Date() }: SelectionPriceOptions): SelectionPrice => {
  if (!product.hasOptions) {
    return { kind: 'exact', pricing: getProductPricing(product, now) };
  }

  const variant = getSelectedVariant(product, selection);

  if (variant) {
    const { price, salePrice } = variant;
    const pricing = getProductPricing(
      { price, salePrice, saleStartsAt: product.saleStartsAt, saleEndsAt: product.saleEndsAt },
      now,
    );

    return { kind: 'exact', pricing };
  }

  const summary = getVariantPriceSummary(product, now);

  if (summary.kind === 'unavailable') {
    return { kind: 'none' };
  }

  if (summary.kind === 'single') {
    return { kind: 'range', min: summary.price, max: summary.price };
  }

  return { kind: 'range', min: summary.min, max: summary.max };
};

export const getSelectionSummary = (product: Product, selection: Selection): SelectionSummary => {
  if (!product.hasOptions || product.variants.length === 0) {
    return { kind: 'none' };
  }

  const missingGroupNames = product.options.filter(({ id }) => !selection[id]).map(({ name }) => name);

  if (missingGroupNames.length > 0) {
    return { kind: 'missing', groupNames: missingGroupNames };
  }

  const variant = getSelectedVariant(product, selection);

  if (variant) {
    return { kind: 'selected', label: variant.label };
  }

  const chosenLabels = product.options.flatMap(({ id, values }) => {
    const value = values.find((item) => item.id === selection[id]);

    return value ? [value.label] : [];
  });

  return { kind: 'selected', label: chosenLabels.join(VALUE_LABEL_SEPARATOR) };
};
