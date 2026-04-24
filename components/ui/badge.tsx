import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeColor = 'tumbleweed' | 'tumbleweed-outlined' | 'green' | 'rose';

const badgeColorMap = {
  tumbleweed: {
    background: 'bg-tumbleweed-100',
    text: 'text-tumbleweed-700',
    hoverBackground: 'hover:bg-tumbleweed-200',
    hoverText: 'hover:text-tumbleweed-800',
  },
  'tumbleweed-outlined': {
    background: 'bg-white border border-tumbleweed-200',
    text: 'text-neutral-700',
    hoverBackground: 'hover:border-tumbleweed-400',
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
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 transition',
          badgeColorMap[color].background,
          badgeColorMap[color].hoverBackground,
          variant === 'rounded' ? 'rounded-full' : 'rounded-xs',
        )}
      >
        <span
          className={cn(
            'text-[9px] font-semibold uppercase tracking-[0.16em]',
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
        variant === 'rounded' ? 'rounded-xl' : 'rounded-xs',
      )}
    >
      <span
        className={cn(
          'text-[9px] font-semibold uppercase tracking-[0.16em]',
          badgeColorMap[color].text,
          wordBreak === 'break-all' ? 'break-all' : 'break-keep',
        )}
      >
        {label}
      </span>
    </div>
  );
};
