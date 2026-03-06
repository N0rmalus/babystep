import { apiGet } from '@/lib/api-client';
import { Subcategory } from '@/actions/types';

const getSubcategory = async (id: string): Promise<Subcategory> => apiGet<Subcategory>(`/subcategories/${id}`);

export default getSubcategory;
