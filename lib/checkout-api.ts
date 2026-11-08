import type { CartLine, CartLineKey } from '@/lib/cart-lines';
import {
  mockCreateOrder,
  mockGetDeliveryConfig,
  mockGetOrderStatus,
  mockGetPaymentMethods,
  mockGetPickupPoints,
} from '@/lib/mocks/checkout';

export type LockerCarrier = 'omniva' | 'unisend';
export type CourierCarrier = 'smartposti';
export type Carrier = LockerCarrier | CourierCarrier;

export type DeliveryOption =
  | { method: 'locker'; price: number; carriers: LockerCarrier[] }
  | { method: 'courier'; price: number; carriers: CourierCarrier[] };

export type DeliveryMethod = DeliveryOption['method'];

export type DeliveryConfig = {
  options: DeliveryOption[];
  freeShippingThreshold: number;
};

export type PickupPoint = {
  id: string;
  carrier: LockerCarrier;
  name: string;
  address: string;
  city: string;
};

export type Bank = {
  code: string;
  name: string;
  logoUrl?: string;
};

export type PaymentMethods = {
  banks: Bank[];
  isCardEnabled: boolean;
};

export type CourierAddress = {
  street: string;
  apartment?: string;
  city: string;
  postalCode: string;
};

export type Delivery = { method: 'locker'; pickupPointId: string } | { method: 'courier'; address: CourierAddress };

export type Payment = { method: 'bank'; bankCode: string } | { method: 'card' };

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type CreateOrderInput = {
  lines: CartLine[];
  contact: Contact;
  delivery: Delivery;
  payment: Payment;
};

export type InsufficientStockItem = CartLineKey & {
  requested: number;
  available: number;
};

export type CreateOrderResult =
  | { status: 'created'; orderId: string; paymentUrl: string }
  | {
      status: 'rejected';
      message: string;
      invalidLines: CartLineKey[];
      insufficientStockItems: InsufficientStockItem[];
    };

export type OrderStatus = 'paid' | 'pending' | 'failed';

export type OrderLine = CartLineKey & {
  name: string;
  quantity: number;
  total: number;
  imageUrl: string | null;
};

export type OrderDelivery =
  | { method: 'locker'; carrier: LockerCarrier; pickupPoint: PickupPoint }
  | { method: 'courier'; carrier: CourierCarrier; address: CourierAddress };

export type OrderPayment = { method: 'bank'; bankName: string } | { method: 'card' };

export type Order = {
  id: string;
  number: string;
  status: OrderStatus;
  email: string;
  recipient: { name: string; phone: string };
  lines: OrderLine[];
  subtotal: number;
  deliveryPrice: number;
  total: number;
  delivery: OrderDelivery;
  payment: OrderPayment;
};

export const getDeliveryConfig = async (): Promise<DeliveryConfig> => mockGetDeliveryConfig();

export const getPickupPoints = async ({ query }: { query: string }): Promise<PickupPoint[]> =>
  mockGetPickupPoints({ query });

export const getPaymentMethods = async (): Promise<PaymentMethods> => mockGetPaymentMethods();

export const createOrder = async (input: CreateOrderInput): Promise<CreateOrderResult> => mockCreateOrder(input);

export const getOrderStatus = async (orderId: string): Promise<Order | null> => mockGetOrderStatus(orderId);
