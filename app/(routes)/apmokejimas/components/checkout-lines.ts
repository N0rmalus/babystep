import { isOkLine, type ResolvedCartLine } from '@/business/cart-line-resolution';
import { type CartLineKey, getCartLineKey, pickCartLineKey } from '@/lib/cart-lines';
import { getImageUrl } from '@/lib/image-url';

export type CheckoutLine = CartLineKey & {
  key: string;
  name: string;
  quantity: number;
  total: number;
  imageUrl: string;
};

export const toCheckoutLines = (resolvedLines: ResolvedCartLine[]): CheckoutLine[] =>
  resolvedLines.filter(isOkLine).map(({ line, product, name, pricing, quantity }) => ({
    ...pickCartLineKey(line),
    key: getCartLineKey(line),
    name,
    quantity,
    total: pricing.effectivePrice * quantity,
    imageUrl: getImageUrl(product.images.at(0)?.url),
  }));
