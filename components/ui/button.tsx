import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', variant = 'primary', size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-3 text-base',
      lg: 'px-7 py-4 text-lg',
      xl: 'px-9 py-5 text-xl',
    };

    return (
      <button
        className={cn(
          'w-auto rounded-full font-semibold transition disabled:cursor-not-allowed',
          variant === 'primary'
            ? 'border-transparent bg-black text-white hover:opacity-75'
            : 'border border-gray-300 bg-white text-black hover:bg-gray-100 hover:text-black',
          sizeClasses[size],
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
