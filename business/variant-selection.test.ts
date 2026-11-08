import { describe, expect, it } from 'vitest';

import type { Product, ProductOption, ProductVariant } from '@/actions/types';
import {
  getBuyableValueIds,
  getInitialSelection,
  getPurchaseState,
  getSelectionFromVariantId,
  getSelectionPrice,
  getSelectionSummary,
  toggleValue,
} from '@/business/variant-selection';

const BASE_PRODUCT = {
  id: 'product-1',
  subcategoryId: 'subcategory-1',
  name: 'Miegmaišis',
  price: '20.00',
  salePrice: null,
  saleStartsAt: null,
  saleEndsAt: null,
  stockCount: 5,
  isFeatured: false,
  description: null,
  images: [],
  subcategory: {
    id: 'subcategory-1',
    name: 'Miegmaišiai',
    categoryId: 'category-1',
    category: { id: 'category-1', name: 'Miegui', billboard: { id: 'billboard-1', label: '', imageUrl: '' } },
  },
} satisfies Partial<Product>;

const createOption = (id: string, valueIds: string[]): ProductOption => ({
  id,
  name: id,
  displayType: 'CHIPS',
  values: valueIds.map((valueId) => ({
    id: valueId,
    label: valueId,
    hex: null,
    ageFromMonths: null,
    ageToMonths: null,
    heightFromCm: null,
    heightToCm: null,
    weightFromKg: null,
    weightToKg: null,
  })),
});

type VariantOptions = Pick<ProductVariant, 'id' | 'optionValueIds'> &
  Partial<Pick<ProductVariant, 'price' | 'salePrice' | 'stockCount'>>;

const createVariant = ({
  id,
  optionValueIds,
  price = '20.00',
  salePrice = null,
  stockCount = 5,
}: VariantOptions): ProductVariant => ({
  id,
  sku: null,
  label: id,
  optionValueIds,
  price,
  salePrice,
  stockCount,
});

const createProduct = (options: ProductOption[], variants: ProductVariant[]): Product => ({
  ...BASE_PRODUCT,
  hasOptions: true,
  options,
  variants,
});

const PRODUCT_WITHOUT_OPTIONS: Product = { ...BASE_PRODUCT, hasOptions: false, options: [], variants: [] };

const SIZE = createOption('size', ['s0', 's1']);
const COLOR = createOption('color', ['sage', 'oat']);
const SINGLE_COLOR = createOption('color', ['sage']);

describe('getInitialSelection', () => {
  it('selects the value of single-value groups and nothing else', () => {
    const product = createProduct(
      [SIZE, SINGLE_COLOR],
      [
        createVariant({ id: 'v1', optionValueIds: ['s0', 'sage'] }),
        createVariant({ id: 'v2', optionValueIds: ['s1', 'sage'] }),
      ],
    );

    expect(getInitialSelection(product)).toEqual({ color: 'sage' });
  });

  it('preselects nothing when every group has a real choice', () => {
    const product = createProduct([SIZE, COLOR], [createVariant({ id: 'v1', optionValueIds: ['s0', 'sage'] })]);

    expect(getInitialSelection(product)).toEqual({});
  });

  it('is empty for a product without options', () => {
    expect(getInitialSelection(PRODUCT_WITHOUT_OPTIONS)).toEqual({});
  });
});

describe('getSelectionFromVariantId', () => {
  const product = createProduct(
    [SIZE, COLOR],
    [
      createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'] }),
      createVariant({ id: 's1-oat', optionValueIds: ['s1', 'oat'] }),
    ],
  );

  it('seeds the full selection from a valid variantId', () => {
    expect(getSelectionFromVariantId(product, 's1-oat')).toEqual({ size: 's1', color: 'oat' });
  });

  it('ignores an unknown variantId', () => {
    expect(getSelectionFromVariantId(product, 'missing')).toEqual({});
  });

  it('ignores an archived variantId, which the API leaves out of the variants', () => {
    const productWithArchived = createProduct(
      [SIZE, SINGLE_COLOR],
      [
        createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'] }),
        createVariant({ id: 's1-sage', optionValueIds: ['s1', 'sage'] }),
      ],
    );

    expect(getSelectionFromVariantId(productWithArchived, 's2-sage')).toEqual({ color: 'sage' });
  });

  it('keeps the initial selection without a variantId', () => {
    expect(getSelectionFromVariantId(product, undefined)).toEqual({});
  });
});

describe('getBuyableValueIds', () => {
  const product = createProduct(
    [SIZE, COLOR],
    [
      createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'] }),
      createVariant({ id: 's0-oat', optionValueIds: ['s0', 'oat'], stockCount: 0 }),
      createVariant({ id: 's1-sage', optionValueIds: ['s1', 'sage'] }),
    ],
  );

  it('crosses out values that no in-stock variant uses before anything is chosen', () => {
    expect(getBuyableValueIds(product, {})).toEqual(new Set(['s0', 's1', 'sage']));
  });

  it('crosses out values missing with the chosen size, keeping the other sizes buyable', () => {
    expect(getBuyableValueIds(product, { size: 's1' })).toEqual(new Set(['s0', 's1', 'sage']));
  });

  it('crosses out sizes that are sold out or missing with the chosen color', () => {
    expect(getBuyableValueIds(product, { color: 'oat' })).toEqual(new Set(['sage']));
  });

  it('crosses out a sold-out combination like a missing one', () => {
    expect(getBuyableValueIds(product, { size: 's0' })).toEqual(new Set(['s0', 's1', 'sage']));
  });
});

describe('toggleValue', () => {
  const product = createProduct(
    [SIZE, SINGLE_COLOR],
    [
      createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'] }),
      createVariant({ id: 's1-sage', optionValueIds: ['s1', 'sage'] }),
    ],
  );

  it('selects a value, replacing the previous choice in its group', () => {
    expect(toggleValue({ product, selection: { size: 's0' }, groupId: 'size', valueId: 's1' })).toEqual({
      size: 's1',
    });
  });

  it('deselects the chosen value when clicked again', () => {
    expect(toggleValue({ product, selection: { size: 's0', color: 'sage' }, groupId: 'size', valueId: 's0' })).toEqual({
      color: 'sage',
    });
  });

  it('keeps the only value of a single-value group selected', () => {
    expect(toggleValue({ product, selection: { color: 'sage' }, groupId: 'color', valueId: 'sage' })).toEqual({
      color: 'sage',
    });
  });
});

describe('getPurchaseState', () => {
  const soldOutVariant = createVariant({ id: 's0-oat', optionValueIds: ['s0', 'oat'], stockCount: 0 });
  const buyableVariant = createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'], stockCount: 2 });
  const product = createProduct([SIZE, COLOR], [buyableVariant, soldOutVariant]);

  it('is incomplete until every group has a value', () => {
    expect(getPurchaseState(product, { size: 's0' })).toEqual({ kind: 'incomplete' });
  });

  it('is buyable with the selected variant and its stock as the max quantity', () => {
    expect(getPurchaseState(product, { size: 's0', color: 'sage' })).toEqual({
      kind: 'buyable',
      variant: buyableVariant,
      maxQuantity: 2,
    });
  });

  it('is sold out when the full selection matches a sold-out variant', () => {
    expect(getPurchaseState(product, { size: 's0', color: 'oat' })).toEqual({
      kind: 'soldOut',
      variant: soldOutVariant,
    });
  });

  it('is sold out when the full selection matches no variant', () => {
    expect(getPurchaseState(product, { size: 's1', color: 'oat' })).toEqual({ kind: 'soldOut', variant: null });
  });

  it('resolves a product without options to the product itself', () => {
    expect(getPurchaseState(PRODUCT_WITHOUT_OPTIONS, {})).toEqual({ kind: 'buyable', variant: null, maxQuantity: 5 });
  });

  it('is sold out for a product without options and no stock', () => {
    expect(getPurchaseState({ ...PRODUCT_WITHOUT_OPTIONS, stockCount: 0 }, {})).toEqual({
      kind: 'soldOut',
      variant: null,
    });
  });

  it('is sold out with nothing to pick when every variant is archived', () => {
    const archivedProduct = createProduct([], []);

    expect(getPurchaseState(archivedProduct, getInitialSelection(archivedProduct))).toEqual({
      kind: 'soldOut',
      variant: null,
    });
  });
});

describe('getSelectionPrice', () => {
  const NOW = new Date('2026-06-15T12:00:00Z');
  const product = createProduct(
    [SIZE, SINGLE_COLOR],
    [
      createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'], price: '20.00', salePrice: '15.00' }),
      createVariant({ id: 's1-sage', optionValueIds: ['s1', 'sage'], price: '25.00' }),
    ],
  );

  it('gives the range of effective variant prices before a full selection', () => {
    expect(getSelectionPrice({ product, selection: { color: 'sage' }, now: NOW })).toEqual({
      kind: 'range',
      min: 15,
      max: 25,
    });
  });

  it('gives one price without strikethrough when every variant costs the same', () => {
    const samePriceProduct = createProduct(
      [SIZE],
      [
        createVariant({ id: 'a', optionValueIds: ['s0'], price: '20.00', salePrice: '15.00' }),
        createVariant({ id: 'b', optionValueIds: ['s1'], price: '20.00', salePrice: '15.00' }),
      ],
    );

    expect(getSelectionPrice({ product: samePriceProduct, selection: {}, now: NOW })).toEqual({
      kind: 'range',
      min: 15,
      max: 15,
    });
  });

  it("gives the selected variant's sale pricing after a full selection", () => {
    expect(getSelectionPrice({ product, selection: { size: 's0', color: 'sage' }, now: NOW })).toEqual({
      kind: 'exact',
      pricing: { regularPrice: 20, salePrice: 15, effectivePrice: 15, discountPercent: 25, isOnSale: true },
    });
  });

  it("follows the product's sale window for the selected variant", () => {
    const endedSale = { ...product, saleEndsAt: '2026-06-01T00:00:00Z' };

    expect(getSelectionPrice({ product: endedSale, selection: { size: 's0', color: 'sage' }, now: NOW })).toEqual({
      kind: 'exact',
      pricing: { regularPrice: 20, salePrice: 15, effectivePrice: 20, discountPercent: 0, isOnSale: false },
    });
  });

  it("gives the product's own pricing for a product without options", () => {
    expect(getSelectionPrice({ product: PRODUCT_WITHOUT_OPTIONS, selection: {}, now: NOW })).toEqual({
      kind: 'exact',
      pricing: { regularPrice: 20, salePrice: null, effectivePrice: 20, discountPercent: 0, isOnSale: false },
    });
  });

  it('gives no price when every variant is archived', () => {
    expect(getSelectionPrice({ product: createProduct([], []), selection: {}, now: NOW })).toEqual({ kind: 'none' });
  });
});

describe('getSelectionSummary', () => {
  const product = createProduct([SIZE, COLOR], [createVariant({ id: 's0-sage', optionValueIds: ['s0', 'sage'] })]);

  it('names the groups still to choose, in picker order', () => {
    expect(getSelectionSummary(product, { color: 'sage' })).toEqual({ kind: 'missing', groupNames: ['size'] });
  });

  it("gives the selected variant's label after a full choice", () => {
    expect(getSelectionSummary(product, { size: 's0', color: 'sage' })).toEqual({ kind: 'selected', label: 's0-sage' });
  });

  it('joins the chosen value labels when the full choice matches no variant', () => {
    expect(getSelectionSummary(product, { size: 's1', color: 'oat' })).toEqual({ kind: 'selected', label: 's1 · oat' });
  });

  it('has nothing to show for a product without options', () => {
    expect(getSelectionSummary(PRODUCT_WITHOUT_OPTIONS, {})).toEqual({ kind: 'none' });
  });

  it('has nothing to show when every variant is archived', () => {
    expect(getSelectionSummary(createProduct([SIZE], []), {})).toEqual({ kind: 'none' });
  });
});
