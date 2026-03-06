import { apiGet } from '@/lib/api-client';
import { Subcategory } from '@/actions/types';

const getSubcategories = async (): Promise<Subcategory[]> => apiGet<Subcategory[]>('/subcategories');

export default getSubcategories;
