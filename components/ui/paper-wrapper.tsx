import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  children: ReactNode;
};

export const PaperWrapper = ({ className, children }: Props) => {
  return (
    <div className={cn('rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6', className)}>
      {children}
    </div>
  );
};
