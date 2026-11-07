import { getDeliveryConfig, getPaymentMethods } from '@/lib/checkout-api';
import { CheckoutView } from './components/checkout-view';

export const revalidate = 0;

const CheckoutPage = async () => {
  const [deliveryConfig, paymentMethods] = await Promise.all([getDeliveryConfig(), getPaymentMethods()]);

  return <CheckoutView deliveryConfig={deliveryConfig} paymentMethods={paymentMethods} />;
};

export default CheckoutPage;
