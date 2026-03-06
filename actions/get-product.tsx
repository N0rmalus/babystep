import { apiGet } from '@/lib/api-client';
import { Product } from '@/actions/types';

const getProduct = async (id: string): Promise<Product> => apiGet<Product>(`/products/${id}`);

export default getProduct;
