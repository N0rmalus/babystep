import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  label: string;
  checked: boolean;
  count?: number;
  variant?: 'compact' | 'touch';
  onChange: (isChecked: boolean) => void;
};

export const FilterCheckbox = ({ label, checked, count, variant = 'compact', onChange }: Props) => {
  const isTouch = variant === 'touch';

  return (
    <label
      className={cn(
        'group flex cursor-pointer items-center gap-2.5 text-neutral-700 transition',
        isTouch ? 'tap-soft min-h-12 rounded-2xl border px-3.5 py-2.5 text-base font-semibold' : 'py-0.5 text-sm',
        isTouch && checked && 'border-neutral-950 bg-neutral-950 text-white shadow-sm',
        isTouch && !checked && 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50',
      )}
    >
      <span className={cn('relative flex shrink-0 items-center', isTouch ? 'size-5' : 'size-4')}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="absolute inset-0 cursor-pointer appearance-none"
        />
        <span
          className={cn(
            'pointer-events-none flex size-full items-center justify-center border transition-colors',
            isTouch ? 'rounded-full' : 'rounded-sm',
            checked
              ? isTouch
                ? 'border-white bg-white'
                : 'border-black bg-black'
              : 'border-neutral-400 bg-transparent group-hover:border-black',
          )}
        >
          {checked && (
            <Check
              size={isTouch ? 13 : 12}
              className={isTouch ? 'text-neutral-950' : 'text-white'}
              aria-hidden="true"
            />
          )}
        </span>
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 transition',
          isTouch ? 'leading-tight' : 'group-hover:text-neutral-950',
          isTouch && checked && 'text-white',
        )}
      >
        {label}
      </span>
      {count !== undefined && (
        <span
          className={cn(
            'shrink-0 text-xs',
            isTouch
              ? checked
                ? 'rounded-full bg-white/15 px-2 py-1 text-white'
                : 'rounded-full bg-neutral-100 px-2 py-1 text-neutral-500'
              : 'text-neutral-400',
          )}
        >
          {count}
        </span>
      )}
    </label>
  );
};
