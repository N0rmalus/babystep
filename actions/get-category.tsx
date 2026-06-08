import { apiGet, isApiNotFoundError } from '@/lib/api-client';
import { Category } from '@/actions/types';

const getCategory = async (id: string): Promise<Category | null> => {
  try {
    return await apiGet<Category>(`/categories/${id}`);
  } catch (error) {
    if (isApiNotFoundError(error)) {
      return null;
    }

    throw error;
  }
};

export default getCategory;
