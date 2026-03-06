import { apiGet } from '@/lib/api-client';
import { Color } from '@/actions/types';

const getColors = async (): Promise<Color[]> => apiGet<Color[]>('/colors');

export default getColors;
