'use client';

import React from 'react';

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

const range = (start: number, end: number) => Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

export const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 3, onPageChange, className }) => {
  const safeTotal = Math.max(1, totalPages);
  const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);

  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  const end = Math.min(safeTotal, Math.max(1, safeCurrent - half) + windowSize - 1);
  const start = Math.max(1, end - windowSize + 1);

  const pages = range(start, end);

  const canGoPrev = safeCurrent > 1;
  const canGoNext = safeCurrent < safeTotal;

  return (
    <nav aria-label="Pagination" className={'flex items-center justify-center gap-2 ' + (className ? className : '')}>
      <button
        type="button"
        onClick={() => onPageChange?.(safeCurrent - 1)}
        disabled={!onPageChange || !canGoPrev}
        className="h-9 rounded-md border px-3 text-sm font-medium text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous page"
      >
        Ankstesnis
      </button>

      {start > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange?.(1)}
            disabled={!onPageChange}
            className="h-9 w-9 rounded-md border text-sm font-medium text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Page 1"
          >
            1
          </button>
          {start > 2 && <span className="px-1 text-neutral-500">…</span>}
        </>
      )}

      {pages.map((p) => {
        const isActive = p === safeCurrent;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange?.(p)}
            disabled={!onPageChange}
            className={
              'h-9 w-9 rounded-md border text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ' +
              (isActive ? 'border-black bg-black text-white' : 'text-neutral-900')
            }
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        );
      })}

      {end < safeTotal && (
        <>
          {end < safeTotal - 1 && <span className="px-1 text-neutral-500">…</span>}
          <button
            type="button"
            onClick={() => onPageChange?.(safeTotal)}
            disabled={!onPageChange}
            className="h-9 w-9 rounded-md border text-sm font-medium text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Page ${safeTotal}`}
          >
            {safeTotal}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange?.(safeCurrent + 1)}
        disabled={!onPageChange || !canGoNext}
        className="h-9 rounded-md border px-3 text-sm font-medium text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next page"
      >
        Kitas
      </button>
    </nav>
  );
};
