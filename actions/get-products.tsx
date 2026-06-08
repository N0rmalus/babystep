import { apiGet } from '@/lib/api-client';
import { Product } from '@/actions/types';

type Query = {
  categoryId?: string;
  subcategoryId?: string;
  isFeatured?: boolean;
  isOnSale?: boolean;
};

const getProducts = async (query: Query): Promise<Product[]> =>
  apiGet<Product[]>('/products', {
    query: {
      categoryId: query.categoryId,
      subcategoryId: query.subcategoryId,
      isFeatured: query.isFeatured,
      isOnSale: query.isOnSale,
    },
  });

export default getProducts;
