'use client';

import { Dialog, Transition } from '@headlessui/react';
import { SlidersHorizontal } from 'lucide-react';
import { Fragment, useState } from 'react';

import { ProductFiltersContainer } from '@/components/product-filters/product-filters-container';
import type { ProductFilterGroup, ProductFilterOption } from '@/components/product-filters/types';
import type { ProductFilters, ProductPriceRange } from '@/lib/product-filters';
import { getActiveProductFilterCount } from '@/lib/product-filters';

type Props = {
  initialFilters: ProductFilters;
  priceRange: ProductPriceRange;
  subcategories?: ProductFilterOption[];
  categoryGroups?: ProductFilterGroup[];
  showSaleFilter?: boolean;
};

export const MobileProductFiltersDrawer = ({
  initialFilters,
  priceRange,
  subcategories = [],
  categoryGroups = [],
  showSaleFilter = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = getActiveProductFilterCount(initialFilters);
  const filtersKey = `${JSON.stringify(initialFilters)}:${priceRange.min}:${priceRange.max}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-tumbleweed-50 hover:border-tumbleweed-300 flex h-10 items-center gap-2 rounded-full border border-transparent px-3 text-sm font-semibold text-neutral-900 transition"
        aria-label="Atidaryti filtrus"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        <span>Filtrai</span>
        {activeFilterCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-black text-[11px] font-bold text-white">
            {activeFilterCount}
          </span>
        )}
      </button>

      <Transition show={isOpen} appear as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-950/45 backdrop-blur-xs" />
          </Transition.Child>

          <div className="fixed inset-x-0 bottom-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="max-h-[82vh] overflow-hidden rounded-t-3xl border border-neutral-200 bg-white shadow-[0_-24px_80px_-28px_rgba(0,0,0,0.55)]">
                <div
                  className="sticky top-0 z-10 cursor-pointer bg-white/95 px-4 pt-4 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="mx-auto h-1.5 w-12 rounded-full bg-neutral-200" />
                </div>

                <div className="max-h-[calc(82vh-5.75rem)] overflow-y-auto px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <ProductFiltersContainer
                    key={filtersKey}
                    initialFilters={initialFilters}
                    priceRange={priceRange}
                    subcategories={subcategories}
                    categoryGroups={categoryGroups}
                    showSaleFilter={showSaleFilter}
                    variant="panel"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
