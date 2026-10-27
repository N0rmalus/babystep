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
      'text-ink-soft inline-flex size-8 items-center justify-center rounded-full transition',
      isActive ? 'fill-ink text-ink bg-white shadow-sm' : 'hover:text-ink',
    )}
  >
    {icon}
  </button>
);
