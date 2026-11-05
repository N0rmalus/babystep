import Image from 'next/image';

import type { Payment, PaymentMethods } from '@/lib/checkout-api';
import { CheckoutStep } from './checkout-step';
import { ChoiceTile } from './choice-tile';

type Props = {
  paymentMethods: PaymentMethods;
  payment: Payment | null;
  error?: string;
  onChange: (payment: Payment) => void;
};

export const PaymentStep = ({ paymentMethods, payment, error, onChange }: Props) => (
  <CheckoutStep number={3} state={payment ? 'done' : 'current'} title="Mokėjimas" headingId="checkout-payment">
    {paymentMethods.banks.length > 0 && (
      <>
        <div role="radiogroup" aria-labelledby="checkout-banks" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {paymentMethods.banks.map((bank) => (
            <ChoiceTile
              key={bank.code}
              name="payment"
              value={bank.code}
              isChecked={payment?.method === 'bank' && payment.bankCode === bank.code}
              onSelect={() => onChange({ method: 'bank', bankCode: bank.code })}
              className="min-h-13 items-center gap-2.5 px-3 text-sm leading-tight font-bold"
            >
              {bank.logoUrl ? (
                <Image src={bank.logoUrl} alt={bank.name} width={96} height={32} className="h-6 w-auto" />
              ) : (
                <span className="text-ink">{bank.name}</span>
              )}
            </ChoiceTile>
          ))}
        </div>
      </>
    )}

    {paymentMethods.isCardEnabled && (
      <ChoiceTile
        name="payment"
        value="card"
        isChecked={payment?.method === 'card'}
        onSelect={() => onChange({ method: 'card' })}
        className="min-h-14 items-center gap-3 px-4 py-2.5"
      >
        <span className="text-ink flex min-w-0 flex-1 flex-col gap-0.5 text-base font-semibold">
          Kortelė, Apple Pay, Google Pay
          <span className="text-ink-muted text-sm font-normal">Visa, Mastercard</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <Image src="/logos/apple-pay-mark.svg" alt="Apple Pay" width={166} height={106} className="h-6 w-auto" />
          <Image src="/logos/google-pay-mark.svg" alt="Google Pay" width={1094} height={742} className="h-6 w-auto" />
        </span>
      </ChoiceTile>
    )}

    {error && (
      <span role="alert" className="text-danger pl-4.5 text-sm">
        {error}
      </span>
    )}
  </CheckoutStep>
);
