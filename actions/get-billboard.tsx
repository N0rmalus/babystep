import { Billboard } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;
const billboardId = process.env.INDEX_BILLBOARD_ID;

const getBillboard = async (): Promise<Billboard> => {
  const res = await fetch(`${URL}/${billboardId}`);

  return res.json();
};

export default getBillboard;
