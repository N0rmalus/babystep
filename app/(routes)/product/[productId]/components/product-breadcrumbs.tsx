import { ChevronRight, House } from 'lucide-react';
import Link from 'next/link';

import type { Subcategory } from '@/actions/types';

type Props = {
  subcategory: Subcategory;
  productName: string;
};

export const ProductBreadcrumbs = ({ subcategory, productName }: Props) => {
  const { category } = subcategory;

  return (
    <nav aria-label="Naršymo kelias" className="py-1 lg:py-5">
      <ol className="text-ink-muted flex items-center text-sm lg:gap-1">
        <li className="shrink-0">
          <Link
            href="/"
            aria-label="Pradžia"
            className="hover:text-link flex size-11 items-center justify-center rounded-full lg:size-8"
          >
            <House size={16} aria-hidden="true" />
          </Link>
        </li>
        <BreadcrumbSeparator />
        <li className="flex min-w-0">
          <Link
            href={`/category/${category.id}`}
            className="hover:text-link flex h-11 min-w-0 items-center px-2 lg:h-8 lg:px-1"
          >
            <span className="truncate">{category.name}</span>
          </Link>
        </li>
        <BreadcrumbSeparator />
        <li className="flex min-w-0">
          <Link
            href={`/category/${category.id}/${subcategory.id}`}
            className="hover:text-link flex h-11 min-w-0 items-center px-2 lg:h-8 lg:px-1"
          >
            <span className="truncate">{subcategory.name}</span>
          </Link>
        </li>
        <BreadcrumbSeparator />
        <li className="min-w-0">
          <span aria-current="page" className="text-ink block truncate px-2 font-bold lg:px-1">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
};

const BreadcrumbSeparator = () => (
  <li aria-hidden="true" className="text-ink-faint flex shrink-0">
    <ChevronRight size={14} />
  </li>
);
