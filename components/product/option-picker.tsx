'use client';

import { ReactNode } from 'react';

import type { ProductOption, ProductOptionValue } from '@/actions/types';
import { useProductPurchase } from '@/components/product/product-purchase-provider';
import { cn } from '@/lib/utils';

type Columns = 'responsive' | 'four';

type Props = {
  action?: ReactNode;
  columns?: Columns;
};

type GroupProps = {
  group: ProductOption;
  action?: ReactNode;
  columns: Columns;
};

type ValueProps = {
  value: ProductOptionValue;
  isSelected: boolean;
  isBuyable: boolean;
  onSelect: () => void;
};

type ChipProps = ValueProps & {
  columns: Columns;
};

const UNAVAILABLE_SUFFIX = 'šiuo metu nėra';

export const OptionPicker = ({ action, columns = 'responsive' }: Props) => {
  const { product } = useProductPurchase();

  if (product.variants.length === 0) {
    return null;
  }

  return (
    <>
      {product.options.map((group, index) => (
        <OptionGroup key={group.id} group={group} action={index === 0 ? action : undefined} columns={columns} />
      ))}
    </>
  );
};

const OptionGroup = ({ group, action, columns }: GroupProps) => {
  const { selection, buyableValueIds, selectValue } = useProductPurchase();
  const selectedValueId = selection[group.id];
  const selectedValue = group.values.find(({ id }) => id === selectedValueId);
  const isSwatch = group.displayType === 'SWATCH';

  const values = group.values.map((value) => {
    const valueProps = {
      value,
      isSelected: value.id === selectedValueId,
      isBuyable: buyableValueIds.has(value.id),
      onSelect: () => selectValue(group.id, value.id),
    };

    return isSwatch ? (
      <SwatchValue key={value.id} {...valueProps} />
    ) : (
      <ChipValue key={value.id} {...valueProps} columns={columns} />
    );
  });

  return (
    <fieldset>
      <div className="mb-2.5 flex items-baseline justify-between gap-4 lg:mb-3">
        <legend className="font-semibold">
          {group.name}
          {selectedValue && <span className="text-ink-muted font-normal"> · {selectedValue.label}</span>}
        </legend>
        {action}
      </div>
      {isSwatch ? (
        <div className="flex flex-wrap gap-3">{values}</div>
      ) : (
        <div className={cn('grid gap-2', columns === 'four' ? 'grid-cols-4' : 'grid-cols-2 sm:grid-cols-4')}>
          {values}
        </div>
      )}
    </fieldset>
  );
};

const ChipValue = ({ value, isSelected, isBuyable, onSelect, columns }: ChipProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    aria-label={getValueLabel(value, isBuyable)}
    onClick={onSelect}
    className={cn(
      'h-12 rounded-full px-1 text-sm font-semibold transition sm:text-base',
      columns === 'four' ? 'h-11 sm:text-sm' : '',
      isSelected && isBuyable ? 'bg-ink border-ink border-2 text-white' : '',
      isSelected && !isBuyable ? 'border-ink text-ink-muted border-2 bg-white line-through' : '',
      !isSelected && isBuyable ? 'border-line-strong text-ink hover:border-ink-faint border bg-white' : '',
      !isSelected && !isBuyable
        ? 'border-line-strong bg-muted-soft text-ink-muted hover:border-ink-faint border border-dashed line-through'
        : '',
    )}
  >
    {value.label}
  </button>
);

const SwatchValue = ({ value, isSelected, isBuyable, onSelect }: ValueProps) => (
  <button
    type="button"
    aria-pressed={isSelected}
    aria-label={getValueLabel(value, isBuyable)}
    title={value.label}
    onClick={onSelect}
    className={cn(
      'relative flex size-12 items-center justify-center rounded-full bg-white ring-inset sm:size-11',
      isSelected ? 'ring-ink ring-2' : 'ring-line ring-1',
    )}
  >
    <span
      className={cn('ring-ink/10 size-9.5 rounded-full ring-1 ring-inset sm:size-8.5', isBuyable ? '' : 'opacity-55')}
      style={{ backgroundColor: value.hex ?? undefined }}
    />
    {!isBuyable && (
      <span aria-hidden="true" className="bg-ink-muted absolute inset-x-1.5 top-1/2 h-0.5 -rotate-45 rounded-full" />
    )}
  </button>
);

const getValueLabel = (value: ProductOptionValue, isBuyable: boolean) => {
  return isBuyable ? value.label : `${value.label}, ${UNAVAILABLE_SUFFIX}`;
};
