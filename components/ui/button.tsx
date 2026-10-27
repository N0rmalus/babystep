import Link from 'next/link';
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

const iconSizeClasses = {
  sm: 'text-sm',
  md: 'size-4',
  lg: 'size-5',
  xl: 'size-6',
} as const;

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick' | 'type'
>;

type CommonProps = {
  variant?: ButtonVariant;
  size?: keyof typeof sizeClasses;
  label: ReactNode;
  elementBefore?: ReactNode;
  elementAfter?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

type ButtonElementProps = CommonProps &
  NativeButtonProps & {
    href?: never;
    disabled?: boolean;
    loading?: boolean;
    buttonRef?: Ref<HTMLButtonElement>;
  } & (
    | { onClick?: MouseEventHandler<HTMLButtonElement>; type: 'submit' }
    | { onClick: MouseEventHandler<HTMLButtonElement>; type?: 'button' }
  );

type LinkElementProps = CommonProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  linkRef?: Ref<HTMLAnchorElement>;
  'aria-label'?: string;
};

type Props = ButtonElementProps | LinkElementProps;

const buttonClasses = (
  { variant = 'primary', size = 'md', className, fullWidth = false }: CommonProps,
  autoWidth: 'w-auto' | 'w-fit',
) =>
  cn(
    'tap-strong relative flex items-center justify-center gap-2 font-semibold transition disabled:cursor-default disabled:opacity-50 max-[400px]:px-2 max-[400px]:text-xs',
    variant === 'primary' && 'bg-ink hover:bg-ink-soft border-transparent text-white',
    variant === 'secondary' && 'border-line-strong text-ink hover:bg-muted hover:text-ink border bg-white',
    variant === 'danger' && 'bg-danger hover:bg-danger-strong border-transparent text-white',
    variant === 'danger-outlined' && 'border-danger-line text-danger hover:bg-danger-soft border bg-white',
    className,
    'rounded-full',
    sizeClasses[size],
    fullWidth ? 'w-full' : autoWidth,
  );

const ButtonContent = ({ size = 'md', label, elementBefore, elementAfter }: CommonProps) => (
  <>
    {elementBefore && <span className={iconSizeClasses[size]}>{elementBefore}</span>}
    {label}
    {elementAfter && <span>{elementAfter}</span>}
  </>
);

const ButtonLink = ({ href, onClick, linkRef, 'aria-label': ariaLabel, ...common }: LinkElementProps) => (
  <Link href={href} onClick={onClick} ref={linkRef} aria-label={ariaLabel} className={buttonClasses(common, 'w-fit')}>
    <ButtonContent {...common} />
  </Link>
);

const ButtonElement = ({
  variant,
  size,
  label,
  className,
  elementBefore,
  elementAfter,
  fullWidth,
  disabled,
  loading,
  onClick,
  type = 'button',
  buttonRef,
  ...buttonProps
}: ButtonElementProps) => {
  const common = { variant, size, label, className, elementBefore, elementAfter, fullWidth };

  return (
    <button
      {...buttonProps}
      type={type}
      onClick={(event) => {
        if (type !== 'submit') {
          event.preventDefault();
        }

        event.stopPropagation();

        onClick?.(event);
      }}
      className={buttonClasses(common, 'w-auto')}
      disabled={disabled || loading}
      ref={buttonRef}
    >
      <span className={cn('inline-flex items-center gap-2', loading && 'invisible')} aria-hidden={loading}>
        <ButtonContent {...common} />
      </span>

      {loading && (
        <span className="absolute inset-0 inline-flex items-center justify-center">
          <LoadingSpinner />
        </span>
      )}
    </button>
  );
};

const Button = (props: Props) => (props.href !== undefined ? <ButtonLink {...props} /> : <ButtonElement {...props} />);

export default Button;
