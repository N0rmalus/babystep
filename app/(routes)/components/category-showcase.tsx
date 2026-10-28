import Image from 'next/image';
import Link from 'next/link';

import type { Category } from '@/actions/types';
import { HomeSection } from '@/app/(routes)/components/home-section';
import { SectionHeading } from '@/app/(routes)/components/section-heading';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';

type Props = {
  categories: Category[];
};

const MIN_ARCH_COUNT = 3;
const MAX_ARCH_COUNT = 6;
const ARCH_HEIGHT_CLASSES = ['h-105', 'h-95', 'h-85', 'h-75'];

export const CategoryShowcase = ({ categories }: Props) => {
  const visibleCategories = categories.slice(0, MAX_ARCH_COUNT);

  if (visibleCategories.length === 0) {
    return null;
  }

  const archHeightClass = ARCH_HEIGHT_CLASSES.at(Math.max(visibleCategories.length, MIN_ARCH_COUNT) - MIN_ARCH_COUNT);

  return (
    <>
      <nav aria-label="Kategorijos" className="pt-3 lg:hidden">
        <div className="scrollbar-none flex gap-3.5 overflow-x-auto px-4 pb-1">
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="text-ink flex w-18 shrink-0 flex-col items-center gap-1.5 text-center text-xs leading-tight font-semibold"
            >
              <span className="border-line bg-muted relative block size-16 overflow-hidden rounded-full border">
                <Image
                  src={getImageUrl(category.billboard?.imageUrl)}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      <HomeSection labelledBy="home-categories" className="hidden pt-24 lg:block">
        <div className="mb-10">
          <SectionHeading id="home-categories" eyebrow="Kategorijos" title="Viskas ramiam miegui" align="center" />
        </div>
        <div className="flex gap-6">
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="group text-ink flex min-w-0 flex-1 flex-col items-center gap-4"
            >
              <span
                className={cn(
                  'border-line bg-muted relative block w-full overflow-hidden rounded-t-full rounded-b-3xl border',
                  archHeightClass,
                )}
              >
                <Image
                  src={getImageUrl(category.billboard?.imageUrl)}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 400px, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="font-accent text-center text-2xl leading-tight font-semibold">{category.name}</span>
            </Link>
          ))}
        </div>
      </HomeSection>
    </>
  );
};
