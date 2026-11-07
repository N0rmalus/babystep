import type { DeliveryConfig } from '@/lib/checkout-api';

type DeliveryPriceOptions = {
  price: number;
  subtotal: number;
  freeShippingThreshold: number;
};

type FreeShippingOptions = {
  subtotal: number;
  freeShippingThreshold: number;
};

export const hasFreeShipping = ({ subtotal, freeShippingThreshold }: FreeShippingOptions): boolean =>
  subtotal > 0 && subtotal >= freeShippingThreshold;

export const getDeliveryPrice = ({ price, subtotal, freeShippingThreshold }: DeliveryPriceOptions): number =>
  hasFreeShipping({ subtotal, freeShippingThreshold }) ? 0 : price;

export const getCheapestDeliveryPrice = ({
  config,
  subtotal,
}: {
  config: DeliveryConfig;
  subtotal: number;
}): number => {
  const prices = config.options.map((option) =>
    getDeliveryPrice({ price: option.price, subtotal, freeShippingThreshold: config.freeShippingThreshold }),
  );

  return prices.length > 0 ? Math.min(...prices) : 0;
};

export const getRemainingForFreeShipping = ({ subtotal, freeShippingThreshold }: FreeShippingOptions): number =>
  Math.max(freeShippingThreshold - subtotal, 0);

export const getFreeShippingProgress = ({ subtotal, freeShippingThreshold }: FreeShippingOptions): number => {
  if (freeShippingThreshold <= 0) {
    return 100;
  }

  return Math.min((subtotal / freeShippingThreshold) * 100, 100);
};
