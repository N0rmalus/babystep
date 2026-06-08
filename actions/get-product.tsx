import { apiGet, isApiNotFoundError } from '@/lib/api-client';
import { Product } from '@/actions/types';

const getProduct = async (id: string): Promise<Product | null> => {
  try {
    return await apiGet<Product>(`/products/${id}`);
  } catch (error) {
    if (isApiNotFoundError(error)) {
      return null;
    }

    throw error;
  }
};

export default getProduct;
