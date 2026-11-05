import { ReactNode } from 'react';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

type StepState = 'done' | 'current' | 'upcoming';

type Props = {
  number: number;
  state: StepState;
  title: string;
  headingId: string;
  action?: ReactNode;
  isLast?: boolean;
  children: ReactNode;
};

export const CheckoutStep = ({ number, state, title, headingId, action, isLast = false, children }: Props) => (
  <li
    className={cn(
      'relative grid grid-cols-[1.875rem_minmax(0,1fr)] gap-3 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-4.5',
      isLast ? undefined : 'pb-7 sm:pb-9',
    )}
  >
    {!isLast && (
      <span
        aria-hidden="true"
        className="bg-line absolute top-8.5 bottom-1 left-3.5 w-0.5 rounded-full sm:top-10 sm:left-4.25"
      />
    )}
    <StepMarker number={number} state={state} />
    <section aria-labelledby={headingId} className="flex min-w-0 flex-col gap-3 sm:gap-3.5">
      <div className="flex min-h-7.5 items-center justify-between gap-3 sm:min-h-9">
        <h2 id={headingId} className="font-accent text-ink text-xl font-semibold sm:text-2xl">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  </li>
);

const StepMarker = ({ number, state }: { number: number; state: StepState }) => {
  if (state === 'done') {
    return (
      <span
        aria-hidden="true"
        className="bg-success-soft text-success relative flex size-7.5 items-center justify-center rounded-full sm:size-9"
      >
        <Check size={16} />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative flex size-7.5 items-center justify-center rounded-full border-2 text-sm font-bold sm:size-9 sm:text-base',
        state === 'current' ? 'border-ink bg-ink text-white' : 'border-line-strong text-ink-muted bg-white',
      )}
    >
      {number}
    </span>
  );
};
