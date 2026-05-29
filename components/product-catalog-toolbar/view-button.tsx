import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  label: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export const ViewButton = ({ label, icon, isActive, onClick }: Props) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={cn(
      'inline-flex size-8 items-center justify-center rounded-full text-neutral-700 transition',
      isActive ? 'bg-white fill-neutral-950 text-neutral-950 shadow-sm' : 'hover:text-black',
    )}
  >
    {icon}
  </button>
);
