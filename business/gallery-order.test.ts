import { describe, expect, it } from 'vitest';

import type { Image } from '@/actions/types';
import { orderImagesBySelection } from '@/business/gallery-order';

const createImage = (id: string, optionValueId: string | null = null): Image => ({
  id,
  url: `https://example.com/${id}.jpg`,
  optionValueId,
});

const IMAGES = [
  createImage('main'),
  createImage('oat-1', 'oat'),
  createImage('sage-1', 'sage'),
  createImage('s1-1', 's1'),
  createImage('sage-2', 'sage'),
  createImage('detail'),
];

const toIds = (images: Image[]) => images.map(({ id }) => id);

describe('orderImagesBySelection', () => {
  it("keeps the admin's order with nothing selected", () => {
    expect(toIds(orderImagesBySelection(IMAGES, {}))).toEqual(['main', 'oat-1', 'sage-1', 's1-1', 'sage-2', 'detail']);
  });

  it('moves images tagged with a partially selected value to the front in admin order', () => {
    expect(toIds(orderImagesBySelection(IMAGES, { color: 'sage' }))).toEqual([
      'sage-1',
      'sage-2',
      'main',
      'oat-1',
      's1-1',
      'detail',
    ]);
  });

  it('moves images tagged with any value of a full selection to the front in admin order', () => {
    expect(toIds(orderImagesBySelection(IMAGES, { size: 's1', color: 'sage' }))).toEqual([
      'sage-1',
      's1-1',
      'sage-2',
      'main',
      'oat-1',
      'detail',
    ]);
  });

  it('leaves images tagged with unselected values in admin order', () => {
    expect(toIds(orderImagesBySelection(IMAGES, { size: 's0', color: 'oat' }))).toEqual([
      'oat-1',
      'main',
      'sage-1',
      's1-1',
      'sage-2',
      'detail',
    ]);
  });
});
