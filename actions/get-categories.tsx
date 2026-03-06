import { apiGet } from '@/lib/api-client';
import { Category } from '@/actions/types';

const getCategories = async (): Promise<Category[]> => apiGet<Category[]>('/categories');

export default getCategories;
