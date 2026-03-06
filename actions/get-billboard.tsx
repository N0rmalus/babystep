import { apiGet } from '@/lib/api-client';
import { Billboard } from '@/actions/types';

const billboardId = process.env.INDEX_BILLBOARD_ID;

const getBillboard = async (): Promise<Billboard> => apiGet<Billboard>(`/billboards/${billboardId}`);

export default getBillboard;
