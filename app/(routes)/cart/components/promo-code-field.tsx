'use client';

import { FormEvent, useId, useState } from 'react';
import { Tag, X } from 'lucide-react';

import { toCurrency } from '@/business/to-currency';
import { cn } from '@/lib/utils';

export type MockPromo = ReturnType<typeof useMockPromoCode>;

type Props = {
  promo: MockPromo;
};

// MOCK: one demo code with a 10 % discount until the admin supports promo codes.
const MOCK_PROMO_CODE = 'BABYSTEP10';
const MOCK_PROMO_RATE = 0.1;

export const useMockPromoCode = (subtotal: number) => {
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const discount = appliedCode ? Math.round(subtotal * MOCK_PROMO_RATE * 100) / 100 : 0;

  const apply = (code: string) => {
    const normalizedCode = code.trim().toUpperCase();
    const isValid = normalizedCode === MOCK_PROMO_CODE;

    if (isValid) {
      setAppliedCode(normalizedCode);
    }

    return isValid;
  };

  return { appliedCode, discount, apply, remove: () => setAppliedCode(null) };
};

export const PromoCodeField = ({ promo }: Props) => {
  const inputId = useId();
  const errorId = useId();
  const [code, setCode] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  if (promo.appliedCode) {
    return (
      <div className="flex items-center justify-between gap-3 text-base">
        <span className="text-ink-soft flex flex-wrap items-center gap-2">
          Nuolaida
          <span className="bg-sale-soft text-sale-strong inline-flex items-center gap-0.5 rounded-full py-0.5 pr-1 pl-2.5 text-sm font-semibold tracking-wide">
            {promo.appliedCode}
            <button
              type="button"
              onClick={promo.remove}
              aria-label="Pašalinti nuolaidos kodą"
              className="hover:bg-sale-strong/10 flex size-7 items-center justify-center rounded-full"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </span>
        </span>
        <span className="text-sale-strong font-semibold tabular-nums">−{toCurrency(promo.discount)}</span>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!code.trim()) {
      return;
    }

    const isApplied = promo.apply(code);
    setIsInvalid(!isApplied);

    if (isApplied) {
      setCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="sr-only">
        Nuolaidos kodas
      </label>
      <div
        className={cn(
          'bg-canvas hover:border-ink-faint focus-within:border-tumbleweed-500 focus-within:ring-tumbleweed-500/15 flex h-10 items-center gap-2 rounded-full border pr-1 pl-3.5 transition focus-within:ring-3',
          isInvalid ? 'border-danger-line' : 'border-line-strong',
        )}
      >
        <Tag size={15} className="text-ink-muted shrink-0" aria-hidden="true" />
        <input
          id={inputId}
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="Nuolaidos kodas"
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
            setIsInvalid(false);
          }}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errorId : undefined}
          className="text-ink placeholder:text-ink-faint h-full w-full min-w-0 flex-1 bg-transparent text-base font-semibold tracking-wide uppercase outline-none placeholder:font-normal placeholder:tracking-normal placeholder:normal-case"
        />
        <button
          type="submit"
          className="bg-muted text-ink hover:bg-ink h-8 shrink-0 rounded-full px-3.5 text-sm font-semibold transition hover:text-white"
        >
          Pritaikyti
        </button>
      </div>
      {isInvalid && (
        <span id={errorId} role="alert" className="text-danger pl-3.5 text-sm">
          Tokio kodo neradome. Patikrink, ar gerai įvedei.
        </span>
      )}
    </form>
  );
};
