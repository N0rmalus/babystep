'use client';

import { ReactNode } from 'react';

import { useProductPurchase } from '@/components/product/product-purchase-provider';
import { MOCK_PRODUCT_SIZES } from '@/lib/mocks/product';
import { cn } from '@/lib/utils';

type Props = {
  action?: ReactNode;
  columns?: 'responsive' | 'four';
};

export const SizePicker = ({ action, columns = 'responsive' }: Props) => {
  const { size: selectedSize, selectSize } = useProductPurchase();

  return (
    <fieldset>
      <div className="mb-2.5 flex items-baseline justify-between gap-4 lg:mb-3">
        <legend className="font-semibold">
          Dydis <span className="text-ink-muted font-normal">· {selectedSize?.label}</span>
        </legend>
        {action}
      </div>
      <div className={cn('grid gap-2', columns === 'four' ? 'grid-cols-4' : 'grid-cols-2 sm:grid-cols-4')}>
        {/* MOCK: size options until "Product variants". */}
        {MOCK_PRODUCT_SIZES.map((option) => {
          const isSelected = option.id === selectedSize?.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={option.isAvailable ? option.label : `${option.label}, šiuo metu nėra`}
              onClick={() => selectSize(option.id)}
              className={cn(
                'h-12 rounded-full px-1 text-sm font-semibold transition sm:text-base',
                columns === 'four' ? 'h-11 sm:text-sm' : '',
                isSelected && option.isAvailable ? 'bg-ink border-ink border-2 text-white' : '',
                isSelected && !option.isAvailable ? 'border-ink text-ink-muted border-2 bg-white line-through' : '',
                !isSelected && option.isAvailable
                  ? 'border-line-strong text-ink hover:border-ink-faint border bg-white'
                  : '',
                !isSelected && !option.isAvailable
                  ? 'border-line-strong bg-muted-soft text-ink-muted hover:border-ink-faint border border-dashed line-through'
                  : '',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
