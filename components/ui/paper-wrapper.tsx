import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: ReactNode;
};

export const PaperWrapper = ({ className, children }: Props) => {
  return (
    <div className={cn('border-line shadow-card rounded-3xl border bg-white p-5 sm:p-6', className)}>{children}</div>
  );
};
