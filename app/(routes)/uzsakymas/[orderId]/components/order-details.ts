import type { Order, OrderDelivery } from '@/lib/checkout-api';
import { CARRIER_NAMES } from '@/lib/carriers';

export const getDeliveryProgressStep = (delivery: OrderDelivery) => {
  if (delivery.method === 'locker') {
    return { title: 'Atsiimsi paštomate', text: `Kodą atsiųs ${CARRIER_NAMES[delivery.carrier]}` };
  }

  return { title: 'Atveš kurjeris', text: `${CARRIER_NAMES[delivery.carrier]} paskambins prieš atvykdamas` };
};

export const getDeliveryMethodName = (delivery: OrderDelivery) =>
  delivery.method === 'locker' ? 'paštomatas' : 'kurjeris';

export const getDeliverySentence = (delivery: OrderDelivery) => {
  if (delivery.method === 'locker') {
    return `Pristatymas į ${CARRIER_NAMES[delivery.carrier]} paštomatą, ${delivery.pickupPoint.name}.`;
  }

  return `Pristatymas kurjeriu: ${delivery.address.street}, ${delivery.address.city}.`;
};

export const getPaymentLabel = (payment: Order['payment']) =>
  payment.method === 'bank' ? `${payment.bankName}, per Montonio` : 'Kortelė, per Montonio';

export const joinNames = (names: string[]) => {
  if (names.length <= 1) {
    return names.join('');
  }

  return `${names.slice(0, -1).join(', ')} ir ${names.at(-1)}`;
};
