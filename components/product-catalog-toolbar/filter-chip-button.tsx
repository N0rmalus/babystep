import { X } from 'lucide-react';

import type { FilterChip } from '@/components/product-catalog-toolbar/types';

export const FilterChipButton = ({ chip }: { chip: FilterChip }) => (
  <button
    type="button"
    onClick={chip.onRemove}
    className="bg-salmon-100 text-salmon-900 border-salmon-200 hover:bg-salmon-200 font-accent inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase transition"
  >
    {chip.label}
    <X size={12} aria-hidden="true" />
  </button>
);
