import Link from 'next/link';
import { AlertTriangle, Lock } from 'lucide-react';

import { toCurrency } from '@/business/to-currency';
import Button from '@/components/ui/button';
import type { DeliveryMethod } from '@/lib/checkout-api';
import { MOCK_CART_VARIANT_META } from '@/lib/mocks/product';
import { cn } from '@/lib/utils';
import type { CheckoutLine } from './checkout-lines';
import { CheckoutStep } from './checkout-step';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

type Props = {
  lines: CheckoutLine[];
  subtotal: number;
  deliveryMethod: DeliveryMethod;
  deliveryPrice: number;
  total: number;
  isTermsAccepted: boolean;
  termsError?: string;
  isSubmitting: boolean;
  onTermsChange: (isAccepted: boolean) => void;
};

const DELIVERY_METHOD_NAMES = {
  locker: 'paštomatas',
  courier: 'kurjeris',
} satisfies Record<DeliveryMethod, string>;

export const ReviewStep = ({
  lines,
  subtotal,
  deliveryMethod,
  deliveryPrice,
  total,
  isTermsAccepted,
  termsError,
  isSubmitting,
  onTermsChange,
}: Props) => (
  <CheckoutStep
    number={4}
    state={isTermsAccepted ? 'current' : 'upcoming'}
    title="Peržiūrėk ir apmokėk"
    headingId="checkout-review"
    isLast
  >
    <PaperWrapper className="flex flex-col gap-3">
      {lines.map((line) => (
        <div key={line.productId} className="text-ink-soft flex justify-between gap-4 text-sm">
          {/* MOCK: size and color until "Product variants". */}
          <span>
            {line.name} · {MOCK_CART_VARIANT_META} × {line.quantity}
          </span>
          <span className="shrink-0 tabular-nums">{toCurrency(line.total)}</span>
        </div>
      ))}

      <div className="bg-line my-1 h-px" />

      <div className="text-ink-soft flex justify-between text-base">
        <span>Prekės</span>
        <span className="tabular-nums">{toCurrency(subtotal)}</span>
      </div>
      <div className="text-ink-soft flex justify-between text-base">
        <span>Pristatymas · {DELIVERY_METHOD_NAMES[deliveryMethod]}</span>
        <span className={cn('tabular-nums', deliveryPrice === 0 ? 'text-success font-semibold' : undefined)}>
          {deliveryPrice === 0 ? 'Nemokamai' : toCurrency(deliveryPrice)}
        </span>
      </div>
      <div className="flex items-baseline justify-between pt-1">
        <span className="text-ink text-base font-semibold">Iš viso</span>
        <span className="text-ink text-2xl font-bold tabular-nums sm:text-3xl">{toCurrency(total)}</span>
      </div>

      <label className="border-line text-ink-soft flex cursor-pointer items-start gap-3 border-t pt-2.5 text-base leading-normal">
        <input
          type="checkbox"
          name="terms"
          checked={isTermsAccepted}
          onChange={(event) => onTermsChange(event.target.checked)}
          aria-invalid={Boolean(termsError)}
          className="accent-ink mt-0.5 size-5 shrink-0"
        />
        <span>
          Sutinku su{' '}
          <Link href="/taisykles-ir-salygos" className="text-link underline underline-offset-3">
            taisyklėmis
          </Link>{' '}
          ir{' '}
          <Link href="/privatumo-politika" className="text-link underline underline-offset-3">
            privatumo politika
          </Link>
        </span>
      </label>
      {termsError && (
        <p role="alert" className="text-danger -mt-1 ml-8 flex items-center gap-1.5 text-sm">
          <AlertTriangle size={14} aria-hidden="true" />
          {termsError}
        </p>
      )}

      <div className="hidden sm:block">
        <PayButton total={total} isSubmitting={isSubmitting} />
      </div>
    </PaperWrapper>
  </CheckoutStep>
);

export const PayButton = ({ total, isSubmitting }: { total: number; isSubmitting: boolean }) => (
  <Button
    type="submit"
    size="lg"
    label={`Apmokėti ${toCurrency(total)}`}
    elementBefore={<Lock size={18} aria-hidden="true" />}
    loading={isSubmitting}
    fullWidth
  />
);
