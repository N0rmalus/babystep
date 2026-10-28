import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

export const PageContainer = ({ children, className }: Props) => {
  return (
    <div className={cn('px-gutter mx-auto flex w-full max-w-7xl flex-col gap-4 py-4 sm:py-14 lg:gap-10', className)}>
      {children}
    </div>
  );
};
