import type { ReactNode } from 'react';
import { LandPlot, RotateCcw } from 'lucide-react';

import { getCheapestDeliveryPrice } from '@/business/delivery-pricing';
import { toCurrency } from '@/business/to-currency';
import type { CartSummary } from '@/hooks/use-cart-summary';
import type { DeliveryConfig } from '@/lib/checkout-api';
import { RETURN_PERIOD_DAYS } from '@/lib/consts';
import { cn } from '@/lib/utils';
import { CheckoutLinkButton } from './checkout-link-button';
import { type MockPromo, PromoCodeField } from './promo-code-field';

type Props = {
  cartSummary: CartSummary;
  deliveryConfig: DeliveryConfig;
  promo: MockPromo;
  total: number;
};

export const CartSummaryPanel = ({ cartSummary, deliveryConfig, promo, total }: Props) => {
  const {
    subtotal,
    hasFreeShipping,
    hasLinesNeedingChoice,
    hasUnavailableLines,
    hasSoldOutLines,
    hasInsufficientStock,
    isCheckoutDisabled,
  } = cartSummary;
  const cheapestDeliveryPrice = getCheapestDeliveryPrice({ config: deliveryConfig, subtotal });

  return (
    <aside
      aria-labelledby="cart-summary-heading"
      className="border-line shadow-card flex flex-col gap-3 rounded-2xl border bg-white p-4.5 lg:sticky lg:top-36 lg:gap-3.5 lg:rounded-3xl lg:p-6"
    >
      <h2 id="cart-summary-heading" className="text-ink text-lg font-semibold">
        Užsakymo suma
      </h2>

      <div className="text-ink-soft flex justify-between text-base">
        <span>Prekės</span>
        <span className="tabular-nums">{toCurrency(subtotal)}</span>
      </div>

      <div className="text-ink-soft flex items-start justify-between gap-3 text-base">
        <span className="flex flex-col gap-0.5">
          Pristatymas
          <span className="text-ink-muted text-sm">Pasirinksi apmokėdamas</span>
        </span>
        <span className={cn('tabular-nums', hasFreeShipping ? 'text-success font-semibold' : 'text-ink-soft')}>
          {hasFreeShipping ? 'Nemokamai' : `nuo ${toCurrency(cheapestDeliveryPrice)}`}
        </span>
      </div>

      {/* MOCK: promo codes until the admin supports them. */}
      <PromoCodeField promo={promo} />

      <div className="bg-line h-px" />

      <div className="flex items-baseline justify-between">
        <span className="text-ink text-base font-semibold">Iš viso</span>
        <span className="text-ink text-2xl font-bold tabular-nums lg:text-3xl">{toCurrency(total)}</span>
      </div>
      <span className="text-ink-muted -mt-2 text-sm">
        {hasFreeShipping ? 'Pristatymas jau įskaičiuotas.' : 'Be pristatymo. Jį pridėsime, kai pasirinksi būdą.'}
      </span>

      {hasLinesNeedingChoice && (
        <p role="alert" className="text-danger text-sm">
          Kai kurioms prekėms dar nepasirinkai savybių. Pasirink jas prieš tęsiant apmokėjimą.
        </p>
      )}

      {hasUnavailableLines && (
        <p role="alert" className="text-danger text-sm">
          Kai kurie pasirinkimai nebegalimi, pašalink juos prieš tęsiant apmokėjimą.
        </p>
      )}

      {hasSoldOutLines && (
        <p role="alert" className="text-danger text-sm">
          Kai kurių prekių nebeliko, pašalink jas prieš tęsiant apmokėjimą.
        </p>
      )}

      {hasInsufficientStock && (
        <p role="alert" className="text-danger text-sm">
          Kai kurių prekių liko mažiau, nei pasirinkai. Sumažink kiekį prieš tęsiant apmokėjimą.
        </p>
      )}

      <div className="mt-1 hidden lg:block">
        <CheckoutLinkButton isDisabled={isCheckoutDisabled} size="lg" />
      </div>

      <ul className="border-line text-ink-soft mt-1.5 hidden flex-col gap-2.5 border-t pt-3.5 text-sm lg:flex">
        <TrustItem
          icon={<RotateCcw size={16} aria-hidden="true" />}
          text={`Grąžinti gali per ${RETURN_PERIOD_DAYS} dienų`}
        />
        <TrustItem icon={<LandPlot size={16} aria-hidden="true" />} text="Paštomatas arba kurjeris į namus" />
      </ul>
    </aside>
  );
};

const TrustItem = ({ icon, text, className }: { icon: ReactNode; text: string; className?: string }) => (
  <li className={cn('flex items-center gap-2.5', className)}>
    <span className="text-ink-muted flex">{icon}</span>
    {text}
  </li>
);
