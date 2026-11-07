import { OrderConfirmation } from './components/order-confirmation';

type Props = {
  params: Promise<{ orderId: string }>;
};

export const revalidate = 0;

const OrderPage = async ({ params }: Props) => {
  const { orderId } = await params;

  return <OrderConfirmation orderId={orderId} />;
};

export default OrderPage;
