import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  title: string;
  children: ReactNode;
  withTopBorder?: boolean;
};

export const FilterSection = ({ title, children, withTopBorder = false }: Props) => (
  <div className={cn('flex flex-col gap-2', withTopBorder && 'border-t border-dashed border-neutral-200 pt-4')}>
    <h2 className="font-accent text-xs font-bold tracking-widest text-neutral-900 uppercase">{title}</h2>
    {children}
  </div>
);
