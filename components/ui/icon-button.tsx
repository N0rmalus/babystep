import Link from 'next/link';
import { ButtonHTMLAttributes, MouseEventHandler, ReactElement, ReactNode, Ref } from 'react';

import { cn } from '@/lib/utils';

type IconButtonVariant = 'primary' | 'secondary' | 'danger';

type CommonProps = {
  icon: ReactElement;
  label: string;
  variant?: IconButtonVariant;
  badge?: ReactNode;
};

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label' | 'children' | 'className' | 'onClick' | 'title' | 'type'
>;

type ButtonElementProps = CommonProps &
  NativeButtonProps & {
    href?: never;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ref?: Ref<HTMLButtonElement>;
  };

type LinkElementProps = CommonProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ref?: Ref<HTMLAnchorElement>;
};

type Props = ButtonElementProps | LinkElementProps;

const iconButtonClasses = (variant: IconButtonVariant = 'primary') =>
  cn(
    'tap-strong relative flex size-8.5 shrink-0 items-center justify-center rounded-lg transition before:absolute before:-inset-1.5 disabled:cursor-default disabled:opacity-50',
    variant === 'primary' &&
      'text-ink hover:bg-muted aria-expanded:border-tumbleweed-300 aria-expanded:bg-tumbleweed-50 border bg-white',
    variant === 'secondary' && 'bg-ink hover:bg-ink-soft text-white',
    variant === 'danger' &&
      'hover:border-danger-line hover:bg-danger-soft text-ink-muted hover:text-danger border bg-white',
  );

const IconButtonContent = ({ icon, badge }: Pick<CommonProps, 'icon' | 'badge'>) => (
  <>
    {icon}
    {badge !== undefined && <span className="absolute -top-2 -right-2">{badge}</span>}
  </>
);

const IconButtonLink = ({ href, onClick, ref, icon, label, variant, badge }: LinkElementProps) => (
  <Link href={href} ref={ref} onClick={onClick} aria-label={label} title={label} className={iconButtonClasses(variant)}>
    <IconButtonContent icon={icon} badge={badge} />
  </Link>
);

const IconButtonElement = ({ onClick, ref, icon, label, variant, badge, ...buttonProps }: ButtonElementProps) => (
  <button
    {...buttonProps}
    ref={ref}
    type="button"
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick?.(event);
    }}
    aria-label={label}
    title={label}
    className={iconButtonClasses(variant)}
  >
    <IconButtonContent icon={icon} badge={badge} />
  </button>
);

const IconButton = (props: Props) =>
  props.href !== undefined ? <IconButtonLink {...props} /> : <IconButtonElement {...props} />;

export default IconButton;
