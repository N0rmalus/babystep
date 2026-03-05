import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from 'react';

import { cn } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label: ReactNode;
  loading?: boolean;
  elementBefore?: ReactNode;
  elementAfter?: ReactNode;
  fullWidth?: boolean;
  buttonRef?: Ref<HTMLButtonElement>;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      disabled,
      loading,
      type = 'button',
      variant = 'primary',
      size = 'md',
      label,
      elementBefore,
      elementAfter,
      fullWidth = false,
      buttonRef,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-3 text-base',
      lg: 'px-7 py-4 text-lg',
      xl: 'px-9 py-5 text-xl',
    };

    return (
      <button
        type={type}
        className={cn(
          'relative flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:cursor-not-allowed',
          variant === 'primary'
            ? 'border-transparent bg-black text-white hover:opacity-75'
            : 'border border-gray-300 bg-white text-black hover:bg-gray-100 hover:text-black',
          sizeClasses[size],
          fullWidth ? 'w-full' : 'w-auto',
          className,
        )}
        disabled={disabled || loading}
        ref={buttonRef}
        {...props}
      >
        <span className={cn('inline-flex items-center gap-2', loading && 'invisible')} aria-hidden={loading}>
          {elementBefore && <>{elementBefore}</>}
          {label}
          {elementAfter && <>{elementAfter}</>}
        </span>

        {loading && (
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <LoadingSpinner />
          </span>
        )}
      </button>
    );
  },
);

export default Button;
