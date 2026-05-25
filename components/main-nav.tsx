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
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

import type { Category, Subcategory } from '@/actions/types';
import { cn } from '@/lib/utils';

type Props = {
  data: Category[];
  subcategories: Subcategory[];
};

type DesktopNavItemProps = {
  category: Category;
  isActive: boolean;
  subcategories: Subcategory[];
};

export const MainNav = ({ data, subcategories }: Props) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);

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

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);
  };

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-300 hover:text-black lg:hidden"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <nav className="hidden items-center gap-1 whitespace-nowrap lg:ml-4 lg:flex">
        {data.map((category) => {
          const isActive = pathname === `/category/${category.id}`;
          const subs = subcategoriesByCategory[category.id] || [];

          return <DesktopNavItem key={category.id} category={category} isActive={isActive} subcategories={subs} />;
        })}
      </nav>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          />
          <div className="fixed inset-x-4 top-18 z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl lg:hidden">
            <div className="max-h-[calc(100vh-8rem)] space-y-2 overflow-y-auto p-2">
              {data.map((category) => {
                const isActive = pathname === `/category/${category.id}`;
                const subs = subcategoriesByCategory[category.id] || [];
                const hasSubs = subs.length > 0;
                const isCategoryOpen = openMobileCategory === category.id;

                return (
                  <div key={category.id} className="rounded-xl border border-neutral-100 bg-neutral-50/70 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/category/${category.id}`}
                        className={cn(
                          'flex-1 text-sm font-semibold tracking-wide transition-colors',
                          isActive ? 'text-black' : 'text-neutral-700',
                        )}
                        onClick={closeMobileMenu}
                      >
                        {category.name}
                      </Link>
                      {hasSubs && (
                        <button
                          type="button"
                          aria-label={`Toggle ${category.name} subcategories`}
                          aria-expanded={isCategoryOpen}
                          className="rounded-full p-1 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-black"
                          onClick={() =>
                            setOpenMobileCategory((current) => (current === category.id ? null : category.id))
                          }
                        >
                          <ChevronDown
                            size={16}
                            className={cn('transition-transform', isCategoryOpen && 'rotate-180')}
                          />
                        </button>
                      )}
                    </div>
                    {hasSubs && isCategoryOpen && (
                      <div className="mt-2 border-t border-neutral-200 pt-2">
                        {subs.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/category/${category.id}/${sub.id}`}
                            className="block rounded-lg px-2 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
                            onClick={closeMobileMenu}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
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
              <div style={transitionStyles} className="rounded-xl border border-neutral-200 bg-white p-1 shadow-xl">
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
