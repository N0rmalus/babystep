'use client';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { sortLabels, sortOptions } from '@/components/product-catalog-toolbar/sort-options';
import type { ProductSort } from '@/lib/product-filters';
import { cn } from '@/lib/utils';

type Props = {
  value: ProductSort;
  onChange: (value: ProductSort) => void;
};

export const SortDropdown = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = sortLabels[value];

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 12 }),
      shift({ padding: 12 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const { setReference, setFloating } = refs;

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 160,
      close: 130,
    },
    common: {
      transformOrigin: 'top center',
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-6px) scale(0.98)',
    },
    open: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    close: {
      opacity: 0,
      transform: 'translateY(-4px) scale(0.98)',
    },
  });

  const handleSelect = (sort: ProductSort) => {
    onChange(sort);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={setReference}
        type="button"
        aria-label="Rūšiuoti"
        aria-expanded={isOpen}
        className={cn(
          'hover:border-tumbleweed-300 bg-tumbleweed-50 flex h-10 w-full items-center justify-between gap-3 rounded-full border border-transparent px-4 text-left text-sm font-medium text-neutral-900 outline-hidden transition',
          isOpen && 'border-tumbleweed-300 bg-white',
        )}
        {...getReferenceProps()}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown size={15} className={cn('shrink-0 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <div ref={setFloating} style={floatingStyles} className="z-50 outline-none" {...getFloatingProps()}>
              <div style={transitionStyles} className="rounded-xl border border-neutral-200 bg-white p-1 shadow-xl">
                {sortOptions.map((option) => {
                  const isSelected = option.value === value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        isSelected
                          ? 'bg-neutral-100 text-black'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-black',
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check size={14} className="shrink-0" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
