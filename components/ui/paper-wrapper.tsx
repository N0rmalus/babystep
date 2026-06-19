import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PaperWrapperVariant = 'default' | 'tumbleweed';

type Props = {
  className?: string;
  children: ReactNode;
  variant?: PaperWrapperVariant;
};

export const PaperWrapper = ({ className, children, variant = 'default' }: Props) => {
  return (
    <div
      className={cn(
        'rounded-3xl border p-5 shadow-xs sm:p-6',
        className,
        variant === 'default' ? 'border-neutral-200 bg-white' : 'border-tumbleweed-100 bg-tumbleweed-200/20',
      )}
    >
      {children}
    </div>
  );
};
