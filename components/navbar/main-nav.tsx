'use client';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import type { Category, Subcategory } from '@/actions/types';
import { MobileNavbar } from '@/components/navbar/mobile-navbar';
import { cn } from '@/lib/utils';

type Props = {
  data: Category[];
  subcategories: Subcategory[];
  biggestDiscount: number;
};

type DesktopNavItemProps = {
  category: Category;
  isActive: boolean;
  subcategories: Subcategory[];
};

export const MainNav = ({ data, subcategories, biggestDiscount }: Props) => {
  const pathname = usePathname();

  const subcategoriesByCategory = useMemo(() => {
    const grouped: Record<string, Subcategory[]> = {};

    subcategories.forEach((sub) => {
      if (!grouped[sub.categoryId]) {
        grouped[sub.categoryId] = [];
      }
      grouped[sub.categoryId].push(sub);
    });

    return grouped;
  }, [subcategories]);

  return (
    <div className="relative order-first shrink-0 lg:order-0">
      <MobileNavbar
        biggestDiscount={biggestDiscount}
        categories={data}
        pathname={pathname}
        subcategoriesByCategory={subcategoriesByCategory}
      />

      <nav className="hidden items-center gap-1 whitespace-nowrap lg:ml-4 lg:flex">
        {data.map((category) => {
          const isActive = pathname === `/category/${category.id}`;
          const subs = subcategoriesByCategory[category.id] || [];

          return <DesktopNavItem key={category.id} category={category} isActive={isActive} subcategories={subs} />;
        })}
      </nav>
    </div>
  );
};

const DesktopNavItem = ({ category, isActive, subcategories }: DesktopNavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories = subcategories.length > 0;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [offset(12), flip({ padding: 12 }), shift({ padding: 12 })],
  });

  const hover = useHover(context, {
    enabled: hasSubcategories,
    move: false,
    delay: { open: 70, close: 240 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });

  const focus = useFocus(context, {
    enabled: hasSubcategories,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);
  const { setReference, setFloating } = refs;

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: {
      open: 160,
      close: 130,
    },
    common: {
      transformOrigin: 'top center',
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-6px) scale(0.98)',
    },
    open: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    close: {
      opacity: 0,
      transform: 'translateY(-4px) scale(0.98)',
    },
  });

  return (
    <>
      <Link
        ref={setReference}
        href={`/category/${category.id}`}
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-colors hover:text-black',
          isActive || isOpen ? 'bg-neutral-100 text-black' : 'text-neutral-600',
        )}
        {...getReferenceProps({
          onClick: () => setIsOpen(false),
        })}
      >
        {category.name}
        {hasSubcategories && (
          <ChevronDown size={14} className={cn('transition-transform duration-200', isOpen && 'rotate-180')} />
        )}
      </Link>

      {hasSubcategories && isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <div ref={setFloating} style={floatingStyles} className="z-50 w-56 outline-none" {...getFloatingProps()}>
              <div style={transitionStyles} className="rounded-xl border border-neutral-200 bg-white/95 p-1 shadow-xl">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${category.id}/${subcategory.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                    onClick={() => setIsOpen(false)}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
