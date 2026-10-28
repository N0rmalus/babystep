'use client';

import { KeyboardEvent, useId, useRef, useState } from 'react';

import type { Product } from '@/actions/types';
import { HomeSection } from '@/app/(routes)/components/home-section';
import { SectionHeading } from '@/app/(routes)/components/section-heading';
import { ProductCard } from '@/components/ui/product-card/product-card';
import { cn } from '@/lib/utils';

type Props = {
  products: Product[];
};

const AGE_GROUPS = ['0–6 mėn.', '6–12 mėn.', '1–3 m.'];
const PRODUCTS_PER_AGE_GROUP = 4;
const TAB_KEY_STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };

// MOCK: products aren't filtered by age yet; each tab shows a different slice of the featured products (TODO.md "Mocks to replace before launch").
export const AgePicks = ({ products }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  if (products.length === 0) {
    return null;
  }

  const offset = (activeIndex * PRODUCTS_PER_AGE_GROUP) % products.length;
  const visibleProducts = [...products.slice(offset), ...products.slice(0, offset)].slice(0, PRODUCTS_PER_AGE_GROUP);
  const panelId = `${baseId}-panel`;

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = TAB_KEY_STEPS[event.key];

    if (!step) {
      return;
    }

    event.preventDefault();
    const nextIndex = (activeIndex + step + AGE_GROUPS.length) % AGE_GROUPS.length;
    setActiveIndex(nextIndex);
    tabRefs.current.at(nextIndex)?.focus();
  };

  return (
    <HomeSection labelledBy="home-age" className="pt-14 lg:pt-28">
      <div className="mb-3.5 flex flex-col gap-3.5 lg:mb-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <SectionHeading
          id="home-age"
          title="Kas tinka tavo mažyliui dabar"
          description="Išsirink amžių, o mes parodysim, nuo ko verta pradėti."
        />
        <div
          role="tablist"
          aria-label="Amžius"
          onKeyDown={handleTabKeyDown}
          className="bg-muted grid shrink-0 grid-cols-3 gap-1 rounded-full p-1 lg:flex lg:gap-2"
        >
          {AGE_GROUPS.map((label, index) => {
            const isSelected = index === activeIndex;

            return (
              <button
                key={label}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${baseId}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={panelId}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-11 rounded-full px-5 text-sm font-semibold transition-colors lg:text-base',
                  isSelected ? 'text-ink shadow-card bg-white' : 'text-ink-muted hover:text-ink',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
        className="scrollbar-none -mx-gutter scroll-px-gutter px-gutter flex snap-x snap-mandatory gap-3 overflow-x-auto pt-0.5 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:p-0"
      >
        {visibleProducts.map((product) => (
          <div key={product.id} className="w-41 shrink-0 snap-start lg:w-auto">
            <ProductCard data={product} />
          </div>
        ))}
      </div>
    </HomeSection>
  );
};
