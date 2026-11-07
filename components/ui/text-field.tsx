import { InputHTMLAttributes, ReactNode, Ref, useId } from 'react';

import { cn } from '@/lib/utils';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className' | 'prefix'> & {
  label: ReactNode;
  error?: string;
  prefix?: string;
  elementBefore?: ReactNode;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
};

export const TextField = ({ label, error, prefix, elementBefore, inputRef, className, ...inputProps }: Props) => {
  const id = useId();
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <label htmlFor={id} className="eyebrow text-ink-muted">
        {label}
      </label>
      <div
        className={cn(
          'hover:border-ink-faint focus-within:border-tumbleweed-500 focus-within:ring-tumbleweed-100 relative flex h-12 items-center overflow-hidden rounded-full border bg-white transition focus-within:ring-3',
          hasError ? 'border-danger-line' : 'border-line-strong',
        )}
      >
        {prefix && (
          <span className="border-line text-ink-soft flex h-full shrink-0 items-center border-r pr-3 pl-4.5">
            {prefix}
          </span>
        )}
        {elementBefore && (
          <span className="text-ink-muted pointer-events-none absolute left-4.5 flex">{elementBefore}</span>
        )}
        <input
          {...inputProps}
          id={id}
          ref={inputRef}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            'text-ink placeholder:text-ink-faint h-full min-w-0 flex-1 bg-transparent px-4.5 text-base outline-none',
            elementBefore ? 'pl-11' : undefined,
          )}
        />
      </div>
      {hasError && (
        <span id={errorId} role="alert" className="text-danger pl-4.5 text-sm">
          {error}
        </span>
      )}
    </div>
  );
};
