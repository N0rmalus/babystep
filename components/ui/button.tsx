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
        'relative flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:cursor-not-allowed',
        variant === 'primary' && 'border-transparent bg-black text-white hover:opacity-75',
        variant === 'secondary' && 'border border-gray-300 bg-white text-black hover:bg-gray-100 hover:text-black',
        variant === 'danger' && 'border-transparent bg-rose-600 text-white hover:bg-rose-700',
        variant === 'danger-outlined' && 'border-transparent bg-rose-500 text-white hover:bg-rose-600',
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
