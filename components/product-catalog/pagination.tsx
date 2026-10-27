'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  currentItemCount: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

const range = (start: number, end: number) => Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  currentItemCount,
  onPageChange,
  className,
}: PaginationProps) => {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);

  const windowSize = 3;
  const half = Math.floor(windowSize / 2);
  const end = Math.min(safeTotal, Math.max(1, safeCurrent - half) + windowSize - 1);
  const start = Math.max(1, end - windowSize + 1);
  const pages = range(start, end);
  const canGoPrev = safeCurrent > 1;
  const canGoNext = safeCurrent < safeTotal;
  const firstVisibleItem = totalItems > 0 ? (safeCurrent - 1) * pageSize + 1 : 0;
  const lastVisibleItem = Math.min(firstVisibleItem + currentItemCount - 1, totalItems);

  const onNavigate = (page: number) => {
    if (!onPageChange || page === safeCurrent || page < 1 || page > safeTotal) {
      return;
    }

    onPageChange(page);
  };

  return (
    <nav
      className={cn(
        'border-line flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-8',
        className,
      )}
    >
      <p className="text-ink-faint text-center text-sm sm:text-left">
        Rodoma{' '}
        <span className="text-ink font-semibold tabular-nums">
          {firstVisibleItem}-{lastVisibleItem}
        </span>{' '}
        iš <span className="text-ink font-semibold tabular-nums">{totalItems}</span>
      </p>

      <div className="flex w-full items-center justify-center gap-1.5 sm:w-auto sm:justify-end sm:gap-2">
        <button
          type="button"
          onClick={() => onNavigate(safeCurrent - 1)}
          disabled={!onPageChange || !canGoPrev}
          className="border-line text-ink hover:border-line-strong hover:bg-muted-soft disabled:text-ink-faint inline-flex h-9 items-center justify-center gap-1.5 rounded-full border bg-white px-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:gap-2 sm:px-5 sm:text-base"
          aria-label="Ankstesnis puslapis"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span className="max-[380px]:sr-only">Atgal</span>
        </button>

        {start > 1 && (
          <button
            type="button"
            onClick={() => onNavigate(1)}
            className={cn(
              'text-ink hover:bg-muted flex size-9 items-center justify-center rounded-full border bg-white text-sm font-bold transition sm:size-11 sm:text-base',
            )}
            disabled={!onPageChange}
            aria-label="1 puslapis"
          >
            1
          </button>
        )}

        {start > 2 && <span className="text-ink-faint px-0.5 text-base font-bold sm:px-1 sm:text-lg">…</span>}

        {pages.map((page) => {
          const isActive = page === safeCurrent;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate(page)}
              disabled={!onPageChange}
              className={cn(
                'flex size-9 items-center justify-center rounded-full text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 sm:size-11 sm:text-base',
                isActive ? 'bg-ink hover:bg-ink-soft text-white' : 'text-ink hover:bg-muted border bg-white',
              )}
              aria-label={`${page} puslapis`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        {end < safeTotal - 1 && <span className="text-ink-faint px-0.5 text-base font-bold sm:px-1 sm:text-lg">…</span>}

        {end < safeTotal && (
          <button
            type="button"
            onClick={() => onNavigate(safeTotal)}
            disabled={!onPageChange}
            className="border-line-strong text-ink hover:border-ink-muted inline-flex size-9 items-center justify-center rounded-full border bg-white text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 sm:size-11 sm:text-base"
            aria-label={`${safeTotal} puslapis`}
          >
            {safeTotal}
          </button>
        )}

        <button
          type="button"
          onClick={() => onNavigate(safeCurrent + 1)}
          disabled={!onPageChange || !canGoNext}
          className="border-line text-ink hover:border-line-strong hover:bg-muted-soft disabled:text-ink-faint inline-flex h-9 items-center justify-center gap-1.5 rounded-full border bg-white px-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:gap-2 sm:px-5 sm:text-base"
          aria-label="Kitas puslapis"
        >
          <span className="max-[380px]:sr-only">Toliau</span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};
