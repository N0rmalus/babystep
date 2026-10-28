import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  labelledBy: string;
  className?: string;
};

export const HomeSection = ({ children, labelledBy, className }: Props) => {
  return (
    <section aria-labelledby={labelledBy} className={cn('mx-auto w-full max-w-7xl px-4 lg:px-10', className)}>
      {children}
    </section>
  );
};
