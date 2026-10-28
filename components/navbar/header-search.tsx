'use client';

import { Search } from 'lucide-react';
import { FormEvent, useId } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

// MOCK: there is no store-wide search page yet, so submitting does nothing.
export const HeaderSearch = ({ className }: Props) => {
  const inputId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={cn('relative', className)}>
      <label htmlFor={inputId} className="sr-only">
        Paieška
      </label>
      <Search
        size={16}
        aria-hidden="true"
        className="text-ink-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
      />
      <input
        id={inputId}
        type="search"
        placeholder="Ko ieškai?"
        className="border-line-strong text-ink placeholder:text-ink-muted hover:border-ink-faint focus:border-tumbleweed-500 h-11 w-full rounded-full border bg-white pr-4 pl-11 text-base transition-colors outline-none"
      />
    </form>
  );
};
