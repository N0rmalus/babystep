import type { Product } from '@/actions/types';
import { getDeliveryPrice } from '@/business/delivery-pricing';
import { getProductEffectivePrice } from '@/business/product-pricing';
import type {
  Bank,
  CreateOrderInput,
  CreateOrderResult,
  DeliveryConfig,
  InsufficientStockItem,
  Order,
  OrderDelivery,
  OrderPayment,
  OrderStatus,
  PaymentMethods,
  PickupPoint,
} from '@/lib/checkout-api';
import { ApiGetError, apiGet } from '@/lib/api-client';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

type MockOrderRecord = Order & { pendingPollCount: number };

const MOCK_DELAY_MS = 300;
const MOCK_ORDERS_STORAGE_KEY = 'babystep-mock-orders';
const MOCK_PENDING_POLLS_BEFORE_PAID = 3;
const MOCK_ORDER_NUMBER_MIN = 10000;
const MOCK_ORDER_NUMBER_RANGE = 90000;
const ORDER_STATUSES = ['paid', 'pending', 'failed'] as const;

// MOCK: delivery options and prices until the admin's shared delivery config endpoint exists.
const MOCK_DELIVERY_CONFIG: DeliveryConfig = {
  options: [
    { method: 'locker', price: 3.49, carriers: ['omniva', 'unisend'] },
    { method: 'courier', price: 6.49, carriers: ['smartposti'] },
  ],
  freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
};

// MOCK: pickup points until the admin proxies Montonio Shipping's pickup points.
const MOCK_PICKUP_POINTS: PickupPoint[] = [
  {
    id: 'omniva-vln-akropolis',
    carrier: 'omniva',
    name: 'Vilnius, PC Akropolis',
    address: 'Ozo g. 25',
    city: 'Vilnius',
  },
  {
    id: 'omniva-vln-panorama',
    carrier: 'omniva',
    name: 'Vilnius, PC Panorama',
    address: 'Saltoniškių g. 9',
    city: 'Vilnius',
  },
  { id: 'omniva-vln-ozas', carrier: 'omniva', name: 'Vilnius, PC Ozas', address: 'Ozo g. 18', city: 'Vilnius' },
  {
    id: 'unisend-vln-fabijoniskes',
    carrier: 'unisend',
    name: 'Vilnius, Rimi Fabijoniškės',
    address: 'Ateities g. 91',
    city: 'Vilnius',
  },
  {
    id: 'unisend-vln-zirmunai',
    carrier: 'unisend',
    name: 'Vilnius, Maxima Žirmūnai',
    address: 'Žirmūnų g. 64',
    city: 'Vilnius',
  },
  {
    id: 'unisend-vln-pilaite',
    carrier: 'unisend',
    name: 'Vilnius, Iki Pilaitė',
    address: 'Vydūno g. 4',
    city: 'Vilnius',
  },
  { id: 'omniva-kns-mega', carrier: 'omniva', name: 'Kaunas, PC Mega', address: 'Islandijos pl. 32', city: 'Kaunas' },
  {
    id: 'omniva-kns-akropolis',
    carrier: 'omniva',
    name: 'Kaunas, PC Akropolis',
    address: 'Karaliaus Mindaugo pr. 49',
    city: 'Kaunas',
  },
  {
    id: 'unisend-kns-savanoriu',
    carrier: 'unisend',
    name: 'Kaunas, Maxima Savanorių',
    address: 'Savanorių pr. 255',
    city: 'Kaunas',
  },
  {
    id: 'unisend-kns-silainiai',
    carrier: 'unisend',
    name: 'Kaunas, Rimi Šilainiai',
    address: 'Baltų pr. 16',
    city: 'Kaunas',
  },
];

// MOCK: Lithuanian banks until the admin proxies Montonio's payment methods (with logoUrl).
const MOCK_BANKS: Bank[] = [
  { code: 'HABALT22', name: 'Swedbank' },
  { code: 'CBVILT2X', name: 'SEB' },
  { code: 'AGBLLT2X', name: 'Luminor' },
  { code: 'CBSBLT26', name: 'Artea' },
  { code: 'INDULT2X', name: 'Citadele' },
  { code: 'RVUALT2V', name: 'Revolut' },
];

const wait = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

export const mockGetDeliveryConfig = async () => {
  await wait();
  return MOCK_DELIVERY_CONFIG;
};

export const mockGetPickupPoints = async ({ query }: { query: string }) => {
  await wait();
  const normalizedQuery = query.trim().toLocaleLowerCase('lt');

  if (!normalizedQuery) {
    return MOCK_PICKUP_POINTS;
  }

  return MOCK_PICKUP_POINTS.filter((point) =>
    `${point.city} ${point.name} ${point.address} ${point.carrier}`.toLocaleLowerCase('lt').includes(normalizedQuery),
  );
};

export const mockGetPaymentMethods = async (): Promise<PaymentMethods> => {
  await wait();
  return { banks: MOCK_BANKS, isCardEnabled: true };
};

// MOCK: skips Montonio; the "payment URL" is our own confirmation page.
export const mockCreateOrder = async ({ lines, contact, delivery, payment }: CreateOrderInput) => {
  await wait();

  const products = await Promise.all(lines.map((line) => fetchProduct(line.productId)));
  const invalidProductIds = lines.filter((_, index) => products.at(index) === null).map((line) => line.productId);
  const insufficientStockItems = lines.reduce<InsufficientStockItem[]>((items, line, index) => {
    const product = products.at(index);

    if (!product || line.quantity <= product.amountInStock) {
      return items;
    }

    return [...items, { productId: line.productId, requested: line.quantity, available: product.amountInStock }];
  }, []);

  if (invalidProductIds.length > 0 || insufficientStockItems.length > 0) {
    return {
      status: 'rejected',
      message: 'Kai kurios prekės nebegalimos.',
      invalidProductIds,
      insufficientStockItems,
    } satisfies CreateOrderResult;
  }

  const orderLines = lines.flatMap((line, index) => {
    const product = products.at(index);

    if (!product) {
      return [];
    }

    return [
      {
        productId: product.id,
        name: product.name,
        quantity: line.quantity,
        total: getProductEffectivePrice(product) * line.quantity,
        imageUrl: product.images.at(0)?.url ?? null,
      },
    ];
  });
  const subtotal = orderLines.reduce((sum, line) => sum + line.total, 0);
  const orderDelivery = toOrderDelivery(delivery);
  const option = MOCK_DELIVERY_CONFIG.options.find((current) => current.method === delivery.method);
  const deliveryPrice = getDeliveryPrice({
    price: option?.price ?? 0,
    subtotal,
    freeShippingThreshold: MOCK_DELIVERY_CONFIG.freeShippingThreshold,
  });

  if (!orderDelivery) {
    return {
      status: 'rejected',
      message: 'Pasirinktas paštomatas nebegalimas.',
      invalidProductIds: [],
      insufficientStockItems: [],
    } satisfies CreateOrderResult;
  }

  const id = crypto.randomUUID();
  const order: MockOrderRecord = {
    id,
    number: `BS-${MOCK_ORDER_NUMBER_MIN + Math.floor(Math.random() * MOCK_ORDER_NUMBER_RANGE)}`,
    status: 'paid',
    email: contact.email,
    recipient: { name: `${contact.firstName} ${contact.lastName}`, phone: contact.phone },
    lines: orderLines,
    subtotal,
    deliveryPrice,
    total: subtotal + deliveryPrice,
    delivery: orderDelivery,
    payment: toOrderPayment(payment),
    pendingPollCount: 0,
  };

  writeOrders({ ...readOrders(), [id]: order });

  return { status: 'created', orderId: id, paymentUrl: `/uzsakymas/${id}` } satisfies CreateOrderResult;
};

// MOCK: reads the order saved by mockCreateOrder; "pending" turns into "paid" after a few polls.
export const mockGetOrderStatus = async (orderId: string): Promise<Order | null> => {
  await wait();
  const orders = readOrders();
  const order = orders[orderId];

  if (!order) {
    return null;
  }

  if (order.status !== 'pending') {
    return order;
  }

  const pendingPollCount = order.pendingPollCount + 1;
  const status: OrderStatus = pendingPollCount > MOCK_PENDING_POLLS_BEFORE_PAID ? 'paid' : 'pending';
  const nextOrder: MockOrderRecord = { ...order, status, pendingPollCount };

  writeOrders({ ...orders, [orderId]: nextOrder });

  return nextOrder;
};

// MOCK: used by the development-only status switcher on the confirmation page.
export const setMockOrderStatus = (orderId: string, status: OrderStatus) => {
  const orders = readOrders();
  const order = orders[orderId];

  if (!order) {
    return;
  }

  writeOrders({ ...orders, [orderId]: { ...order, status, pendingPollCount: 0 } });
};

const toOrderDelivery = (delivery: CreateOrderInput['delivery']): OrderDelivery | null => {
  if (delivery.method === 'courier') {
    return { method: 'courier', carrier: 'smartposti', address: delivery.address };
  }

  const pickupPoint = MOCK_PICKUP_POINTS.find((point) => point.id === delivery.pickupPointId);

  return pickupPoint ? { method: 'locker', carrier: pickupPoint.carrier, pickupPoint } : null;
};

const toOrderPayment = (payment: CreateOrderInput['payment']): OrderPayment => {
  if (payment.method === 'card') {
    return { method: 'card' };
  }

  const bank = MOCK_BANKS.find((current) => current.code === payment.bankCode);

  return { method: 'bank', bankName: bank?.name ?? payment.bankCode };
};

const fetchProduct = async (productId: string) => {
  try {
    return await apiGet<Product>(`/products/${productId}`);
  } catch (error) {
    if (error instanceof ApiGetError) {
      return null;
    }

    throw error;
  }
};

const readOrders = (): Record<string, MockOrderRecord> => {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(MOCK_ORDERS_STORAGE_KEY) ?? '{}');

    if (!isRecord(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, MockOrderRecord] => isMockOrder(entry[1])),
    );
  } catch {
    return {};
  }
};

const writeOrders = (orders: Record<string, MockOrderRecord>) => {
  try {
    sessionStorage.setItem(MOCK_ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    return;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isOrderStatus = (value: unknown): value is OrderStatus => ORDER_STATUSES.some((status) => status === value);

const isMockOrder = (value: unknown): value is MockOrderRecord =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.number === 'string' &&
  isOrderStatus(value.status) &&
  Array.isArray(value.lines) &&
  isRecord(value.delivery) &&
  isRecord(value.payment) &&
  typeof value.pendingPollCount === 'number';
