import type { Image } from '@/actions/types';
import type { Selection } from '@/business/variant-selection';

export const orderImagesBySelection = (images: Image[], selection: Selection): Image[] => {
  const selectedValueIds = new Set(Object.values(selection).filter((valueId) => valueId !== undefined));
  const isTaggedWithSelection = ({ optionValueId }: Image) =>
    Boolean(optionValueId && selectedValueIds.has(optionValueId));

  return [...images.filter(isTaggedWithSelection), ...images.filter((image) => !isTaggedWithSelection(image))];
};
