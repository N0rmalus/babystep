'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import { toCurrency } from '@/business/to-currency';
import { MOCK_CART_VARIANT_META } from '@/lib/mocks/product';
import { pluralize } from '@/lib/plural';
import { cn } from '@/lib/utils';
import type { CheckoutLine } from './checkout-lines';

type Props = {
  lines: CheckoutLine[];
  itemCount: number;
  total: number;
};

const THUMBNAIL_COUNT = 3;
const ITEM_FORMS = { one: 'prekė', few: 'prekės', many: 'prekių' };

export const OrderSummaryToggle = ({ lines, itemCount, total }: Props) => {
  const listId = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section aria-label="Tavo užsakymas" className="border-line shadow-card rounded-2xl border bg-white sm:rounded-3xl">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((current) => !current)}
        className="text-ink flex w-full items-center gap-3.5 px-4 py-3.5 text-left sm:px-4.5"
      >
        <span aria-hidden="true" className="flex">
          {lines.slice(0, THUMBNAIL_COUNT).map((line, index) => (
            <span
              key={line.productId}
              className={cn(
                'bg-muted relative size-10 overflow-hidden rounded-lg border-2 border-white',
                index > 0 ? '-ml-2.5' : undefined,
              )}
            >
              <Image fill src={line.imageUrl} alt="" sizes="40px" className="object-cover" />
            </span>
          ))}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-semibold">Tavo užsakymas</span>
          <span className="text-ink-muted text-sm">
            {itemCount} {pluralize(itemCount, ITEM_FORMS)} · {isOpen ? 'Slėpti' : 'Rodyti'}
          </span>
        </span>
        <span className="text-lg font-bold tabular-nums">{toCurrency(total)}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={cn(
            'text-ink-muted shrink-0 transition-transform motion-reduce:transition-none',
            isOpen ? 'rotate-180' : undefined,
          )}
        />
      </button>

      {isOpen && (
        <ul id={listId} className="border-line flex flex-col gap-3 border-t px-4 pt-3.5 pb-4 sm:px-4.5">
          {lines.map((line) => (
            <li key={line.productId} className="flex items-center gap-3">
              <span className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-xl">
                <Image fill src={line.imageUrl} alt="" sizes="48px" className="object-cover" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-ink text-sm font-semibold">{line.name}</span>
                {/* MOCK: size and color until "Product variants". */}
                <span className="text-ink-muted text-sm">
                  {MOCK_CART_VARIANT_META} · {line.quantity} vnt.
                </span>
              </span>
              <span className="text-ink text-sm font-semibold tabular-nums">{toCurrency(line.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
