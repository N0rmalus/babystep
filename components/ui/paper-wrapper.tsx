import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: ReactNode;
};

export const PaperWrapper = ({ className, children }: Props) => {
  return (
    <div className={cn('border-line rounded-3xl border bg-white p-5 shadow-xs sm:p-6', className)}>{children}</div>
  );
};
