import type { Carrier } from '@/lib/checkout-api';

export const CARRIER_NAMES = {
  omniva: 'Omniva',
  unisend: 'Unisend',
  smartposti: 'SmartPosti',
} satisfies Record<Carrier, string>;
