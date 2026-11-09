import type { Product } from '@/actions/types';

export type CardActionTarget = 'quickView' | 'productPage';

export type CardAction =
  | { kind: 'soldOut' }
  | { kind: 'chooseOptions'; target: CardActionTarget }
  | { kind: 'add' }
  | { kind: 'inCart' };

type CardActionOptions = {
  product: Product;
  isInCart: boolean;
  isMobile: boolean;
};

export const getCardAction = ({ product, isInCart, isMobile }: CardActionOptions): CardAction => {
  if (product.stockCount < 1) {
    return { kind: 'soldOut' };
  }

  if (product.hasOptions) {
    return { kind: 'chooseOptions', target: isMobile ? 'productPage' : 'quickView' };
  }

  return isInCart ? { kind: 'inCart' } : { kind: 'add' };
};
