import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  title: string;
  children: ReactNode;
  withTopBorder?: boolean;
};

export const FilterSection = ({ title, children, withTopBorder = false }: Props) => (
  <div className={cn('flex flex-col gap-2', withTopBorder && 'border-line border-t border-dashed pt-4')}>
    <h2 className="font-accent text-ink text-xs font-bold tracking-widest uppercase">{title}</h2>
    {children}
  </div>
);
