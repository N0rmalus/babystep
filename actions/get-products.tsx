import { apiGet } from '@/lib/api-client';
import { Product } from '@/actions/types';

interface Query {
  categoryId?: string;
  subcategoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> =>
  apiGet<Product[]>('/products', {
    query: {
      categoryId: query.categoryId,
      subcategoryId: query.subcategoryId,
      isFeatured: query.isFeatured,
    },
  });

export default getProducts;
