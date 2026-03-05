import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeColor = 'tumbleweed-outlined' | 'green' | 'rose';

const badgeColorMap = {
  'tumbleweed-outlined': {
    background: 'bg-white border border-tumbleweed-700',
    text: 'text-neutral-700',
    hoverBackground: '',
    hoverText: 'hover:text-black',
  },
  green: {
    background: 'bg-emerald-100',
    text: 'text-emerald-700',
    hoverBackground: 'hover:bg-emerald-200',
    hoverText: 'hover:text-emerald-800',
  },
  rose: {
    background: 'bg-rose-100',
    text: 'text-rose-700',
    hoverBackground: 'hover:bg-rose-200',
    hoverText: 'hover:text-rose-800',
  },
} satisfies Record<
  BadgeColor,
  {
    background: string;
    text: string;
    hoverBackground: string;
    hoverText: string;
  }
>;

type Props = {
  label: string | ReactNode;
  color: BadgeColor;
  variant?: 'rounded' | 'square';
  wordBreak?: 'break-all' | 'keep-all';
  onClick?: () => void;
};

export const Badge = ({ label, color, variant, wordBreak, onClick }: Props) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 transition',
          badgeColorMap[color].background,
          badgeColorMap[color].hoverBackground,
          variant === 'rounded' ? 'rounded-full' : 'rounded-sm',
        )}
      >
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.16em]',
            badgeColorMap[color].text,
            badgeColorMap[color].hoverText,
            wordBreak === 'break-all' ? 'break-all' : 'break-keep',
          )}
        >
          {label}
        </span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 transition',
        badgeColorMap[color].background,
        variant === 'rounded' ? 'rounded-xl' : 'rounded-sm',
      )}
    >
      <span
        className={cn(
          'text-xs font-semibold uppercase tracking-[0.16em]',
          badgeColorMap[color].text,
          wordBreak === 'break-all' ? 'break-all' : 'break-keep',
        )}
      >
        {label}
      </span>
    </div>
  );
};
