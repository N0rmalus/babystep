import { ChevronRight, House } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';

type BreadcrumbLink = {
  label: string;
  href: string;
};

type Props = {
  links?: BreadcrumbLink[];
  current: string;
  className?: string;
};

export const Breadcrumbs = ({ links = [], current, className }: Props) => (
  <nav aria-label="Naršymo kelias" className={cn('-ml-2 py-1 lg:ml-0 lg:py-5', className)}>
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
      {links.map((link) => (
        <Fragment key={link.href}>
          <BreadcrumbSeparator />
          <li className="flex min-w-0">
            <Link href={link.href} className="hover:text-link flex h-11 min-w-0 items-center px-2 lg:h-8 lg:px-1">
              <span className="truncate">{link.label}</span>
            </Link>
          </li>
        </Fragment>
      ))}
      <BreadcrumbSeparator />
      <li className="min-w-0">
        <span aria-current="page" className="text-ink block truncate px-2 font-bold lg:px-1">
          {current}
        </span>
      </li>
    </ol>
  </nav>
);

const BreadcrumbSeparator = () => (
  <li aria-hidden="true" className="text-ink-faint flex shrink-0">
    <ChevronRight size={14} />
  </li>
);
