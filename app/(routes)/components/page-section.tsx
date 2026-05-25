import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  smallText: string;
  bigText: string;
  position: 'left' | 'center';
  link?: {
    label: string;
    href: string;
  };
};

export const PageSection = ({ children, smallText, bigText, position, link }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div
        className={cn(
          'flex gap-4',
          position === 'center'
            ? 'flex-col items-center text-center'
            : 'flex-col items-start sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        {position === 'center' ? (
          <>
            <div className="flex flex-col items-center">
              <p className="text-tumbleweed-700 text-xs font-semibold tracking-widest uppercase">{smallText}</p>
              <h1 className="font-accent text-3xl font-black sm:text-4xl">{bigText}</h1>
              <div className="bg-tumbleweed-700 mt-4 h-1 w-60 rounded-full" />
            </div>
            {link && <SectionLink link={link} />}
          </>
        ) : (
          <>
            <div>
              <p className="text-tumbleweed-700 text-xs font-semibold tracking-widest uppercase">{smallText}</p>
              <h1 className="font-accent text-3xl font-black text-neutral-900 sm:text-4xl">{bigText}</h1>
            </div>
            {link && <SectionLink link={link} />}
          </>
        )}
      </div>
      {children}
    </div>
  );
};

const SectionLink = ({ link }: { link: NonNullable<Props['link']> }) => {
  return (
    <Link
      href={link.href}
      className="group hover:text-tumbleweed-700 font-accent inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-900 transition sm:text-base"
    >
      {link.label}
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
};
