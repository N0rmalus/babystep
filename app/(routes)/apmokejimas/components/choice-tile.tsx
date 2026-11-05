import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  name: string;
  value: string;
  isChecked: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
};

export const ChoiceTile = ({ name, value, isChecked, onSelect, children, className }: Props) => (
  <label
    className={cn(
      'hover:border-tumbleweed-300 has-focus-visible:outline-tumbleweed-500 flex cursor-pointer rounded-2xl transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2',
      isChecked ? 'border-tumbleweed-500 bg-tumbleweed-50 border-2' : 'border-line-strong border bg-white',
      className,
    )}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={isChecked}
      onChange={onSelect}
      className="accent-ink size-4.5 shrink-0"
    />
    {children}
  </label>
);
