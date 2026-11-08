import { describe, expect, it } from 'vitest';

import { normalizeCartLines } from './cart-lines';

describe('normalizeCartLines', () => {
  it('turns old string product IDs into single-quantity lines', () => {
    expect(normalizeCartLines(['a', ' b '])).toEqual([
      { productId: 'a', quantity: 1 },
      { productId: 'b', quantity: 1 },
    ]);
  });

  it('reads old object formats keyed by id or productId', () => {
    expect(
      normalizeCartLines([
        { id: 'a', name: 'Miegmaišis', price: '29.99' },
        { productId: 'b', quantity: 3 },
        { productId: 'c', quantity: 2.7 },
      ]),
    ).toEqual([
      { productId: 'a', quantity: 1 },
      { productId: 'b', quantity: 3 },
      { productId: 'c', quantity: 2 },
    ]);
  });

  it('keeps variantId when present and omits it otherwise', () => {
    expect(
      normalizeCartLines([
        { productId: 'a', variantId: 'v1', quantity: 2 },
        { productId: 'b', variantId: '  ', quantity: 1 },
        { productId: 'c', variantId: 42, quantity: 1 },
      ]),
    ).toEqual([
      { productId: 'a', variantId: 'v1', quantity: 2 },
      { productId: 'b', quantity: 1 },
      { productId: 'c', quantity: 1 },
    ]);
  });

  it('merges duplicates on productId and variantId, summing quantities', () => {
    expect(
      normalizeCartLines([
        'a',
        { productId: 'a', quantity: 2 },
        { productId: 'b', variantId: 'v1', quantity: 1 },
        { productId: 'b', variantId: 'v1', quantity: 4 },
      ]),
    ).toEqual([
      { productId: 'a', quantity: 3 },
      { productId: 'b', variantId: 'v1', quantity: 5 },
    ]);
  });

  it('keeps two variants of one product and the option-less line as separate lines', () => {
    expect(
      normalizeCartLines([
        { productId: 'a', variantId: 'v1', quantity: 1 },
        { productId: 'a', variantId: 'v2', quantity: 2 },
        { productId: 'a', quantity: 3 },
      ]),
    ).toEqual([
      { productId: 'a', variantId: 'v1', quantity: 1 },
      { productId: 'a', variantId: 'v2', quantity: 2 },
      { productId: 'a', quantity: 3 },
    ]);
  });

  it('drops invalid entries', () => {
    expect(
      normalizeCartLines(['', '   ', null, 7, { productId: '' }, { id: 12 }, { quantity: 2 }, ['a'], 'ok']),
    ).toEqual([{ productId: 'ok', quantity: 1 }]);
  });

  it('returns no lines when the persisted items are not an array', () => {
    expect(normalizeCartLines(undefined)).toEqual([]);
    expect(normalizeCartLines({ productId: 'a' })).toEqual([]);
  });
});
