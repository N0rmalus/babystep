import qs from 'query-string';

import { VARIANT_ID_PARAM } from '@/lib/consts';

type ProductHrefOptions = {
  productId: string;
  variantId?: string;
};

export const getProductHref = ({ productId, variantId }: ProductHrefOptions): string => {
  return qs.stringifyUrl({ url: `/product/${productId}`, query: { [VARIANT_ID_PARAM]: variantId } });
};
