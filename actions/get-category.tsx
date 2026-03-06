import { apiGet } from '@/lib/api-client';
import { Category } from '@/actions/types';

const getCategory = async (id: string): Promise<Category> => apiGet<Category>(`/categories/${id}`);

export default getCategory;
