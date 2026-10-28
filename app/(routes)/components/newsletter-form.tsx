'use client';

import { Check, CircleAlert } from 'lucide-react';
import { FormEvent, useId, useState } from 'react';

import Button from '@/components/ui/button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// MOCK: validates the email and thanks the reader, but sends nothing (TODO.md "Connect the newsletter form").
export const NewsletterForm = () => {
  const [status, setStatus] = useState<'idle' | 'invalid' | 'subscribed'>('idle');
  const inputId = useId();
  const errorId = useId();
  const isInvalid = status === 'invalid';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');

    if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
      setStatus('invalid');
      return;
    }

    setStatus('subscribed');
  };

  const handleEmailChange = () => {
    if (isInvalid) {
      setStatus('idle');
    }
  };

  if (status === 'subscribed') {
    return (
      <p role="status" className="text-success mt-3 flex items-center gap-2 font-semibold lg:mt-4">
        <Check size={18} aria-hidden="true" />
        Ačiū, pirmas laiškas jau pakeliui.
      </p>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-3 flex w-full flex-col gap-2 lg:mt-4">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          El. pašto adresas
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tavo@pastas.lt"
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errorId : undefined}
          onChange={handleEmailChange}
          className="border-line-strong text-ink placeholder:text-ink-muted focus:border-tumbleweed-500 aria-invalid:border-danger h-13 min-w-0 rounded-full border bg-white px-5.5 text-base transition-colors outline-none sm:flex-1"
        />
        <Button type="submit" label="Prenumeruoti" fullWidth className="sm:w-auto" />
      </div>
      {isInvalid && (
        <p id={errorId} className="text-danger flex items-center justify-center gap-1.5 text-sm">
          <CircleAlert size={16} aria-hidden="true" />
          Įrašyk teisingą el. pašto adresą.
        </p>
      )}
    </form>
  );
};
