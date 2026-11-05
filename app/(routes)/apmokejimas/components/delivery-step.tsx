import { Check, Cuboid, House, MapPin, Truck } from 'lucide-react';

import { getDeliveryPrice, getRemainingForFreeShipping, hasFreeShipping } from '@/business/delivery-pricing';
import { toCurrency } from '@/business/to-currency';
import { TextField } from '@/components/ui/text-field';
import type { DeliveryConfig, DeliveryMethod, DeliveryOption, PickupPoint } from '@/lib/checkout-api';
import { cn } from '@/lib/utils';
import { CarrierLogo } from './carrier-logo';
import { CheckoutStep } from './checkout-step';
import type { CheckoutErrors, CourierValues } from './checkout-validation';
import { ChoiceTile } from './choice-tile';
import { PickupPointPicker } from './pickup-point-picker';

type Props = {
  deliveryConfig: DeliveryConfig;
  subtotal: number;
  method: DeliveryMethod;
  pickupPointId: string | null;
  courier: CourierValues;
  errors: CheckoutErrors;
  isDone: boolean;
  onMethodChange: (method: DeliveryMethod) => void;
  onPickupPointChange: (point: PickupPoint) => void;
  onCourierChange: (field: keyof CourierValues, value: string) => void;
};

const OPTION_DETAILS = {
  locker: { title: 'Paštomatas', icon: Cuboid },
  courier: { title: 'Kurjeris į namus', icon: House },
} satisfies Record<DeliveryMethod, { title: string; icon: typeof MapPin }>;

export const DeliveryStep = ({
  deliveryConfig,
  subtotal,
  method,
  pickupPointId,
  courier,
  errors,
  isDone,
  onMethodChange,
  onPickupPointChange,
  onCourierChange,
}: Props) => {
  const { freeShippingThreshold } = deliveryConfig;
  const isFree = hasFreeShipping({ subtotal, freeShippingThreshold });

  return (
    <CheckoutStep number={2} state={isDone ? 'done' : 'current'} title="Pristatymas" headingId="checkout-delivery">
      <div role="radiogroup" aria-labelledby="checkout-delivery" className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {deliveryConfig.options.map((option) => (
          <DeliveryOptionTile
            key={option.method}
            option={option}
            price={getDeliveryPrice({ price: option.price, subtotal, freeShippingThreshold })}
            isChecked={option.method === method}
            onSelect={() => onMethodChange(option.method)}
          />
        ))}
      </div>

      {isFree ? (
        <p className="text-success flex items-center gap-2 text-sm font-semibold">
          <Check size={16} aria-hidden="true" />
          Pristatymas tau nemokamas.
        </p>
      ) : (
        <p className="text-ink-muted flex items-start gap-2 text-sm">
          <Truck size={16} className="text-link mt-0.5 shrink-0" aria-hidden="true" />
          <span>
            Pridėk prekių dar už{' '}
            <strong className="text-ink-soft tabular-nums">
              {toCurrency(getRemainingForFreeShipping({ subtotal, freeShippingThreshold }))}
            </strong>
            , ir pristatymas bus nemokamas.
          </span>
        </p>
      )}

      {method === 'locker' && (
        <PickupPointPicker selectedId={pickupPointId} error={errors.pickupPoint} onSelect={onPickupPointChange} />
      )}

      {method === 'courier' && (
        <>
          <div className="mt-1 grid grid-cols-2 gap-2.5 sm:gap-3.5">
            <TextField
              label="Gatvė ir namo nr."
              name="street"
              autoComplete="address-line1"
              value={courier.street}
              onChange={(event) => onCourierChange('street', event.target.value)}
              error={errors.street}
              className="col-span-2 sm:col-span-1"
            />
            <TextField
              label={
                <>
                  Butas <span className="font-normal tracking-normal normal-case">(nebūtina)</span>
                </>
              }
              name="apartment"
              autoComplete="address-line2"
              placeholder="Pvz. 4"
              value={courier.apartment}
              onChange={(event) => onCourierChange('apartment', event.target.value)}
              className="col-span-2 sm:col-span-1"
            />
            <TextField
              label="Miestas"
              name="city"
              autoComplete="address-level2"
              value={courier.city}
              onChange={(event) => onCourierChange('city', event.target.value)}
              error={errors.city}
            />
            <TextField
              label="Pašto kodas"
              name="postalCode"
              autoComplete="postal-code"
              placeholder="LT-00000"
              value={courier.postalCode}
              onChange={(event) => onCourierChange('postalCode', event.target.value)}
              error={errors.postalCode}
            />
          </div>
          <p className="text-ink-muted text-sm">Kurjeris paskambins numeriu, kurį nurodei kontaktuose.</p>
        </>
      )}
    </CheckoutStep>
  );
};

const DeliveryOptionTile = ({
  option,
  price,
  isChecked,
  onSelect,
}: {
  option: DeliveryOption;
  price: number;
  isChecked: boolean;
  onSelect: () => void;
}) => {
  const { title, icon: Icon } = OPTION_DETAILS[option.method];

  return (
    <ChoiceTile
      name="deliveryMethod"
      value={option.method}
      isChecked={isChecked}
      onSelect={onSelect}
      className="flex-row-reverse items-start justify-between gap-2 p-3.5 sm:p-4.5"
    >
      <span className="flex min-w-0 flex-col gap-1.5">
        <Icon size={20} className="text-link" aria-hidden="true" />
        <span className="text-ink mt-1 text-base font-semibold">{title}</span>
        <span className="flex flex-wrap items-center gap-2">
          {option.carriers.map((carrier) => (
            <CarrierLogo key={carrier} carrier={carrier} />
          ))}
        </span>
        <span className={cn('mt-1 font-bold tabular-nums', price === 0 ? 'text-success' : 'text-ink')}>
          {price === 0 ? 'Nemokamai' : toCurrency(price)}
        </span>
      </span>
    </ChoiceTile>
  );
};
