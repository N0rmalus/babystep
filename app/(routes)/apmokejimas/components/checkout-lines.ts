import type { Product } from '@/actions/types';
import { getProductEffectivePrice } from '@/business/product-pricing';
import { getImageUrl } from '@/lib/image-url';

export type CheckoutLine = {
  productId: string;
  name: string;
  quantity: number;
  total: number;
  imageUrl: string;
};

export const toCheckoutLines = ({
  products,
  quantityByProductId,
}: {
  products: Product[];
  quantityByProductId: Map<string, number>;
}): CheckoutLine[] =>
  products.map((product) => {
    const quantity = quantityByProductId.get(product.id) ?? 1;

    return {
      productId: product.id,
      name: product.name,
      quantity,
      total: getProductEffectivePrice(product) * quantity,
      imageUrl: getImageUrl(product.images.at(0)?.url),
    };
  });
