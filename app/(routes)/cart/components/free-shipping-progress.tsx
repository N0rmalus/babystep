import { Check, Truck } from 'lucide-react';

import {
  getFreeShippingProgress,
  getRemainingForFreeShipping,
  hasFreeShipping as getHasFreeShipping,
} from '@/business/delivery-pricing';
import { toCurrency } from '@/business/to-currency';
import { cn } from '@/lib/utils';

type Props = {
  subtotal: number;
  freeShippingThreshold: number;
};

export const FreeShippingProgress = ({ subtotal, freeShippingThreshold }: Props) => {
  const hasFreeShipping = getHasFreeShipping({ subtotal, freeShippingThreshold });
  const progress = getFreeShippingProgress({ subtotal, freeShippingThreshold });
  const remaining = getRemainingForFreeShipping({ subtotal, freeShippingThreshold });

  return (
    <section
      aria-label="Nemokamas pristatymas"
      className="border-line shadow-card flex flex-col gap-2.5 rounded-2xl border bg-white px-4 py-3.5 lg:gap-3 lg:rounded-3xl lg:px-5.5 lg:py-4.5"
    >
      {hasFreeShipping ? (
        <p className="text-success flex items-center gap-2.5 text-sm font-semibold lg:text-base">
          <Check size={18} aria-hidden="true" />
          Pristatymas tau nemokamas
        </p>
      ) : (
        <p className="text-ink-soft flex items-center gap-2.5 text-sm lg:text-base">
          <Truck size={18} className="text-link shrink-0" aria-hidden="true" />
          <span>
            Iki nemokamo pristatymo liko <strong className="text-ink tabular-nums">{toCurrency(remaining)}</strong>
          </span>
        </p>
      )}

      <div
        role="progressbar"
        aria-label="Iki nemokamo pristatymo"
        aria-valuemin={0}
        aria-valuemax={freeShippingThreshold}
        aria-valuenow={Math.round(Math.min(subtotal, freeShippingThreshold))}
        className="bg-muted h-2 overflow-hidden rounded-full"
      >
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none',
            hasFreeShipping ? 'bg-success' : 'bg-tumbleweed-500',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};
