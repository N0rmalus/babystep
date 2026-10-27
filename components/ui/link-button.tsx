import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type LinkSize = 'sm' | 'md' | 'lg' | 'xl';
type LinkVariant = 'primary' | 'secondary' | 'danger';

type Props = {
  label: string;
  href: string;
  size?: LinkSize;
  variant?: LinkVariant;
  elementBefore?: ReactNode;
  elementAfter?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
};

export const LinkButton = ({
  label,
  href,
  size = 'md',
  variant = 'primary',
  elementBefore,
  elementAfter,
  fullWidth = false,
  onClick,
}: Props) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-7 py-4 text-lg',
    xl: 'px-9 py-5 text-xl',
  };

  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        'relative flex items-center justify-center gap-2 rounded-full font-semibold transition disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-ink hover:bg-ink-soft border-transparent text-white',
        variant === 'secondary' && 'border-line-strong text-ink hover:bg-muted hover:text-ink border bg-white',
        variant === 'danger' && 'bg-danger hover:bg-danger-strong border-transparent text-white',
        sizeClasses[size],
        fullWidth ? 'w-full' : 'w-fit',
      )}
    >
      {elementBefore}
      <p className="text-nowrap">{label}</p>
      {elementAfter}
    </Link>
  );
};
