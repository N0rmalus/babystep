'use client';

import { Minus, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md';
  label?: string;
  isDisabled?: boolean;
};

const MIN_QUANTITY = 1;

const sizeClasses = {
  sm: { group: 'h-9', button: 'size-8', value: 'min-w-5 text-sm', icon: 14 },
  md: { group: 'h-12', button: 'size-11', value: 'min-w-6', icon: 16 },
} as const;

export const QuantitySelector = ({
  value,
  max,
  onChange,
  size = 'md',
  label = 'Kiekis',
  isDisabled = false,
}: Props) => {
  const classes = sizeClasses[size];
  const canDecrease = !isDisabled && value > MIN_QUANTITY;
  const canIncrease = !isDisabled && value < max;

  const handleDecrease = () => {
    onChange(Math.max(value - 1, MIN_QUANTITY));
  };

  const handleIncrease = () => {
    onChange(Math.min(value + 1, max));
  };

  return (
    <div
      role="group"
      aria-label={label}
      onClick={(event) => event.stopPropagation()}
      className={cn('border-line-strong flex w-fit items-center rounded-full border bg-white px-0.5', classes.group)}
    >
      <button
        type="button"
        aria-label="Mažinti kiekį"
        onClick={handleDecrease}
        disabled={!canDecrease}
        className={cn(
          'text-ink hover:bg-muted disabled:text-line-strong flex items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:hover:bg-transparent',
          classes.button,
        )}
      >
        <Minus size={classes.icon} aria-hidden="true" />
      </button>
      <span aria-live="polite" className={cn('text-center font-bold tabular-nums', classes.value)}>
        {value}
      </span>
      <button
        type="button"
        aria-label="Didinti kiekį"
        onClick={handleIncrease}
        disabled={!canIncrease}
        className={cn(
          'text-ink hover:bg-muted disabled:text-line-strong flex items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:hover:bg-transparent',
          classes.button,
        )}
      >
        <Plus size={classes.icon} aria-hidden="true" />
      </button>
    </div>
  );
};
