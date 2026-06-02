'use client';

import type { Category } from '@/actions/types';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  categories: Category[];
};

const visibleCategoryCount = 4;

const tileLayouts = [
  {
    frame: 'col-span-2 h-72 sm:h-[20.5rem] md:col-span-5 md:row-span-2 md:h-auto',
    title: 'text-lg sm:text-2xl lg:text-4xl',
    imageSizes: '(min-width: 1024px) 42vw, (min-width: 768px) 42vw, 100vw',
  },
  {
    frame: 'col-span-1 h-52 sm:h-60 md:col-span-4 md:h-auto',
    title: 'text-lg sm:text-2xl',
    imageSizes: '(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 50vw',
  },
  {
    frame: 'col-span-1 h-52 sm:h-60 md:col-span-3 md:h-auto',
    title: 'text-lg sm:text-2xl',
    imageSizes: '(min-width: 1024px) 25vw, (min-width: 768px) 25vw, 50vw',
  },
  {
    frame: 'col-span-1 h-52 sm:h-60 md:col-span-7 md:h-auto',
    title: 'text-lg sm:text-2xl lg:text-4xl',
    imageSizes: '(min-width: 1024px) 58vw, (min-width: 768px) 58vw, 50vw',
  },
] satisfies { frame: string; title: string; imageSizes: string }[];

export const CategoryMosaic = ({ categories }: Props) => {
  const visibleCategories = categories.slice(0, visibleCategoryCount);

  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:grid-rows-[minmax(220px,1fr)_minmax(220px,1fr)] lg:grid-rows-[minmax(250px,1fr)_minmax(250px,1fr)] lg:gap-5">
      {visibleCategories.map((category, index) => (
        <CategoryMosaicTile key={category.id} category={category} layout={tileLayouts[index]} priority={index === 0} />
      ))}
    </div>
  );
};

const CategoryMosaicTile = ({
  category,
  layout,
  priority = false,
}: {
  category: Category;
  layout: (typeof tileLayouts)[number] | undefined;
  priority?: boolean;
}) => {
  return (
    <Link
      href={`/category/${category.id}`}
      className={cn(
        'group focus-visible:ring-salmon-500 relative isolate overflow-hidden rounded-3xl bg-neutral-200 shadow-sm transition-shadow duration-300 outline-none hover:shadow-2xl hover:shadow-neutral-900/10 focus-visible:ring-2 focus-visible:ring-offset-4',
        layout?.frame,
      )}
    >
      <Image
        src={getImageUrl(category.billboard?.imageUrl)}
        alt={category.name}
        fill
        priority={priority}
        sizes={layout?.imageSizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/70 group-hover:via-black/25" />

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white sm:inset-x-5 sm:bottom-5 sm:gap-4 md:inset-x-7 md:bottom-7">
        <div className="min-w-0">
          <h3 className={cn('font-accent leading-none font-semibold', layout?.title)}>{category.name}</h3>
          {/* TODO: Show product count once the categories API exposes a lightweight productCount field. */}
        </div>
        <span className="group-hover:bg-salmon-500 hidden size-9 shrink-0 place-items-center rounded-full bg-white text-neutral-900 transition duration-300 group-hover:text-white sm:size-10 md:size-11 lg:grid">
          <ArrowRight
            size={19}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-rotate-45"
          />
        </span>
      </div>
    </Link>
  );
};
