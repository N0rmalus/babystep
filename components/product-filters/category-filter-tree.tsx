'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { FilterCheckbox } from '@/components/product-filters/filter-checkbox';
import type { ProductFilterGroup } from '@/components/product-filters/types';
import { cn } from '@/lib/utils';

type Props = {
  groups: ProductFilterGroup[];
  selectedSubcategoryIds: string[];
  checkboxVariant: 'compact' | 'touch';
  onToggleSubcategory: (subcategoryId: string) => void;
};

const getInitialOpenCategoryIds = (groups: ProductFilterGroup[], selectedSubcategoryIds: string[]) => {
  const selectedIds = new Set(selectedSubcategoryIds);
  const selectedGroupIds = groups
    .filter((group) => group.subcategories.some((subcategory) => selectedIds.has(subcategory.id)))
    .map((group) => group.id);

  if (selectedGroupIds.length > 0) {
    return new Set(selectedGroupIds);
  }

  const firstExpandableGroup = groups.find((group) => group.subcategories.length > 0);

  return new Set(firstExpandableGroup ? [firstExpandableGroup.id] : []);
};

export const CategoryFilterTree = ({ groups, selectedSubcategoryIds, checkboxVariant, onToggleSubcategory }: Props) => {
  const [openCategoryIds, setOpenCategoryIds] = useState(() =>
    getInitialOpenCategoryIds(groups, selectedSubcategoryIds),
  );
  const selectedSubcategoryIdSet = new Set(selectedSubcategoryIds);

  const handleToggleCategory = (categoryId: string) => {
    setOpenCategoryIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(categoryId)) {
        nextIds.delete(categoryId);
      } else {
        nextIds.add(categoryId);
      }

      return nextIds;
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {groups.map((group) => {
        const isOpen = openCategoryIds.has(group.id);
        const canExpand = group.subcategories.length > 0;

        return (
          <div key={group.id} className="border-b border-neutral-200 pb-1 last:border-b-0 last:pb-0">
            <button
              type="button"
              className={cn(
                'group flex w-full items-center gap-2 rounded-2xl px-2.5 py-2 text-left transition',
                canExpand ? 'hover:bg-tumbleweed-50' : 'cursor-default',
              )}
              onClick={() => handleToggleCategory(group.id)}
              disabled={!canExpand}
              aria-expanded={canExpand ? isOpen : undefined}
            >
              <span
                className={cn(
                  'min-w-0 flex-1 text-sm font-semibold text-neutral-700 transition group-hover:text-neutral-950',
                  isOpen && 'text-neutral-950',
                )}
              >
                {group.name}
              </span>
              <span className="font-accent text-xs text-neutral-400">{group.count}</span>
              {canExpand && (
                <ChevronDown
                  size={16}
                  className={cn('text-neutral-400 transition-transform', isOpen && 'rotate-180 text-neutral-700')}
                  aria-hidden="true"
                />
              )}
            </button>

            {canExpand && isOpen && (
              <div className="border-tumbleweed-200 mt-1 mb-2.5 ml-2 flex flex-col gap-1 border-dashed border-l pl-2.5">
                {group.subcategories.map((subcategory) => (
                  <FilterCheckbox
                    key={subcategory.id}
                    label={subcategory.name}
                    count={subcategory.count}
                    variant={checkboxVariant}
                    checked={selectedSubcategoryIdSet.has(subcategory.id)}
                    onChange={() => onToggleSubcategory(subcategory.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
