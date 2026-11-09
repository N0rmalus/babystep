import qs from 'query-string';

import type { ResolvedCartLine } from '@/business/cart-line-resolution';
import { VARIANT_ID_PARAM } from '@/lib/consts';

type ProductHrefOptions = {
  productId: string;
  variantId?: string;
};

export const getProductHref = ({ productId, variantId }: ProductHrefOptions): string => {
  return qs.stringifyUrl({ url: `/product/${productId}`, query: { [VARIANT_ID_PARAM]: variantId } });
};

export const getCartLineHref = (resolvedLine: ResolvedCartLine): string => {
  const variantId = resolvedLine.kind === 'ok' ? resolvedLine.variant?.id : undefined;

  return getProductHref({ productId: resolvedLine.product.id, variantId });
};
