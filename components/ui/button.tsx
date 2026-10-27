import { ButtonHTMLAttributes, MouseEventHandler, ReactNode, Ref } from 'react';

import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'danger-outlined';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-7 py-4 text-lg',
  xl: 'px-9 py-5 text-xl',
} as const;

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick' | 'type'
>;

type Props = NativeButtonProps & {
  variant?: ButtonVariant;
  size?: keyof typeof sizeClasses;
  label: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  elementBefore?: ReactNode;
  elementAfter?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  buttonRef?: Ref<HTMLButtonElement>;
} & (
    | { onClick?: MouseEventHandler<HTMLButtonElement>; type: 'submit' }
    | { onClick: MouseEventHandler<HTMLButtonElement>; type?: 'button' }
  );

const Button = ({
  disabled,
  loading,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  label,
  className,
  elementBefore,
  elementAfter,
  fullWidth = false,
  buttonRef,
  ...props
}: Props) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={(event) => {
        if (type !== 'submit') {
          event.preventDefault();
        }

        event.stopPropagation();

        onClick?.(event);
      }}
      className={cn(
        'tap-strong relative flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:cursor-default disabled:opacity-50 max-[400px]:px-2 max-[400px]:text-xs',
        variant === 'primary' && 'bg-ink hover:bg-ink-soft border-transparent text-white',
        variant === 'secondary' && 'border-line-strong text-ink hover:bg-muted hover:text-ink border bg-white',
        variant === 'danger' && 'bg-danger hover:bg-danger-strong border-transparent text-white',
        variant === 'danger-outlined' && 'border-danger-line text-danger hover:bg-danger-soft border bg-white',
        className,
        sizeClasses[size],
        fullWidth ? 'w-full' : 'w-auto',
      )}
      disabled={isDisabled}
      ref={buttonRef}
      {...props}
    >
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')} aria-hidden={loading}>
        <span
          className={cn(size === 'sm' ? 'text-sm' : size === 'md' ? 'size-4' : size === 'lg' ? 'size-5' : 'size-6')}
        >
          {elementBefore}
        </span>
        {label}
        <span>{elementAfter}</span>
      </span>

      {loading && (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <LoadingSpinner />
        </span>
      )}
    </button>
  );
};

export default Button;
