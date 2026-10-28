'use client';

import { useProductPurchase } from '@/components/product/product-purchase-provider';
import { MOCK_PRODUCT_COLORS } from '@/lib/mocks/product';
import { cn } from '@/lib/utils';

export const ColorPicker = () => {
  const { color: selectedColor, selectColor } = useProductPurchase();

  return (
    <fieldset>
      <legend className="pb-2.5 font-semibold lg:pb-3">
        Spalva <span className="text-ink-muted font-normal">· {selectedColor?.label}</span>
      </legend>
      <div className="flex gap-3">
        {/* MOCK: color options until "Product variants". */}
        {MOCK_PRODUCT_COLORS.map((option) => {
          const isSelected = option.id === selectedColor?.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              aria-label={option.isAvailable ? option.label : `${option.label}, šio dydžio nėra`}
              title={option.label}
              onClick={() => selectColor(option.id)}
              className={cn(
                'relative flex size-12 items-center justify-center rounded-full bg-white ring-inset sm:size-11',
                isSelected ? 'ring-ink ring-2' : 'ring-line ring-1',
              )}
            >
              <span
                className={cn(
                  'ring-ink/10 size-9.5 rounded-full ring-1 ring-inset sm:size-8.5',
                  option.isAvailable ? '' : 'opacity-55',
                )}
                style={{ backgroundColor: option.hex }}
              />
              {!option.isAvailable && (
                <span
                  aria-hidden="true"
                  className="bg-ink-muted absolute inset-x-1.5 top-1/2 h-0.5 -rotate-45 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
