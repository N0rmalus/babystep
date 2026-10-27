import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type BadgeColor = 'tumbleweed' | 'tumbleweed-outlined' | 'success' | 'neutral' | 'sale';

const badgeColorMap = {
  tumbleweed: {
    background: 'bg-tumbleweed-100',
    text: 'text-tumbleweed-700',
    hoverBackground: 'hover:bg-tumbleweed-200',
    hoverText: 'hover:text-tumbleweed-800',
  },
  'tumbleweed-outlined': {
    background: 'bg-white border border-tumbleweed-200',
    text: 'text-ink-soft',
    hoverBackground: 'hover:border-tumbleweed-400',
    hoverText: 'hover:text-ink',
  },
  success: {
    background: 'bg-success-soft',
    text: 'text-success',
    hoverBackground: 'hover:bg-success-soft',
    hoverText: 'hover:text-success',
  },
  neutral: {
    background: 'bg-muted',
    text: 'text-ink-muted',
    hoverBackground: 'hover:bg-muted',
    hoverText: 'hover:text-ink',
  },
  sale: {
    background: 'bg-sale-soft',
    text: 'text-sale-strong',
    hoverBackground: 'hover:bg-sale-soft',
    hoverText: 'hover:text-sale-strong',
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

const badgeSize = 'px-2 py-0.5 text-[10px] leading-4 sm:px-2.5 sm:text-[11px]';

type Props = {
  label: string | ReactNode;
  color: BadgeColor;
  wordBreak?: 'break-all' | 'keep-all';
  onClick?: () => void;
};

export const Badge = ({ label, color, wordBreak, onClick }: Props) => {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
        className={cn(
          'inline-flex items-center rounded-full transition',
          badgeSize,
          badgeColorMap[color].background,
          badgeColorMap[color].hoverBackground,
        )}
      >
        <span
          className={cn(
            'tracking-eyebrow font-semibold uppercase',
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
    <div className={cn('inline-flex items-center rounded-full transition', badgeSize, badgeColorMap[color].background)}>
      <span
        className={cn(
          'tracking-eyebrow font-semibold uppercase',
          badgeColorMap[color].text,
          wordBreak === 'break-all' ? 'break-all' : 'break-keep',
        )}
      >
        {label}
      </span>
    </div>
  );
};
