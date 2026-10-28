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
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import type { Category, Subcategory } from '@/actions/types';
import { cn } from '@/lib/utils';

type Props = {
  categories: Category[];
  subcategoriesByCategory: Record<string, Subcategory[]>;
};

type DesktopNavItemProps = {
  category: Category;
  isActive: boolean;
  subcategories: Subcategory[];
};

const NAV_LINK_CLASSES = 'text-base font-semibold transition-colors';

export const MainNav = ({ categories, subcategoriesByCategory }: Props) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Kategorijos"
      className="px-gutter mx-auto hidden h-12 max-w-7xl items-center justify-center gap-9 whitespace-nowrap lg:flex"
    >
      {categories.map((category) => (
        <DesktopNavItem
          key={category.id}
          category={category}
          isActive={pathname.startsWith(`/category/${category.id}`)}
          subcategories={subcategoriesByCategory[category.id] ?? []}
        />
      ))}
      <Link
        href="/akcijos"
        className={cn(
          'text-sale-strong decoration-2 underline-offset-8 hover:underline',
          pathname === '/akcijos' ? 'underline' : '',
          NAV_LINK_CLASSES,
        )}
      >
        Akcijos
      </Link>
    </nav>
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
          'hover:text-link inline-flex items-center gap-1',
          isActive || isOpen ? 'text-link' : 'text-ink-soft',
          NAV_LINK_CLASSES,
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
              <div style={transitionStyles} className="border-line rounded-xl border bg-white/95 p-1 shadow-xl">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/category/${category.id}/${subcategory.id}`}
                    className="text-ink-soft hover:bg-muted hover:text-ink block rounded-lg px-3 py-2 text-sm transition-colors"
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
