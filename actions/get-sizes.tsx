import { apiGet } from '@/lib/api-client';
import { Size } from '@/actions/types';

const getSizes = async (): Promise<Size[]> => apiGet<Size[]>('/sizes');

export default getSizes;
