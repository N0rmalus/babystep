import { getDeliveryConfig } from '@/lib/checkout-api';
import { CartView } from './components/cart-view';

export const revalidate = 0;

const CartPage = async () => {
  const deliveryConfig = await getDeliveryConfig();

  return <CartView deliveryConfig={deliveryConfig} />;
};

export default CartPage;
