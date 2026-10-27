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
        'group text-ink-soft flex cursor-pointer items-center gap-2.5 transition',
        isTouch ? 'tap-soft min-h-12 rounded-2xl border px-3.5 py-2.5 text-base font-semibold' : 'py-0.5 text-sm',
        isTouch && checked && 'border-ink bg-ink text-white shadow-sm',
        isTouch && !checked && 'border-line hover:border-line-strong hover:bg-muted-soft bg-white',
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
            isTouch ? 'rounded-full' : 'rounded-md',
            checked
              ? isTouch
                ? 'border-white bg-white'
                : 'border-ink bg-ink'
              : 'border-ink-faint group-hover:border-ink bg-transparent',
          )}
        >
          {checked && (
            <Check size={isTouch ? 13 : 12} className={isTouch ? 'text-ink' : 'text-white'} aria-hidden="true" />
          )}
        </span>
      </span>
      <span
        className={cn(
          'min-w-0 flex-1 transition',
          isTouch ? 'leading-tight' : 'group-hover:text-ink',
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
                : 'bg-muted text-ink-muted rounded-full px-2 py-1'
              : 'text-ink-faint',
          )}
        >
          {count}
        </span>
      )}
    </label>
  );
};
