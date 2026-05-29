'use client';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
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

  const onMobileOpenChange = (isOpen: boolean) => {
    setIsMobileMenuOpen(isOpen);

    if (!isOpen) {
      setOpenMobileCategory(null);
    }
  };

  const {
    refs: mobileRefs,
    floatingStyles: mobileFloatingStyles,
    context: mobileContext,
  } = useFloating({
    open: isMobileMenuOpen,
    onOpenChange: onMobileOpenChange,
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(14),
      flip({ padding: 12 }),
      shift({ padding: 12 }),
      size({
        padding: 12,
        apply({ availableHeight, availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(availableHeight, 520)}px`,
            maxWidth: `${Math.min(availableWidth, 480)}px`,
          });
        },
      }),
    ],
  });

  const { isMounted: isMobileMounted, styles: mobileTransitionStyles } = useTransitionStyles(mobileContext, {
    duration: { open: 170, close: 130 },
    common: {
      transformOrigin: 'top left',
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-8px) scale(0.98)',
    },
    open: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    close: {
      opacity: 0,
      transform: 'translateY(-6px) scale(0.98)',
    },
  });

  const mobileClick = useClick(mobileContext);
  const mobileDismiss = useDismiss(mobileContext);
  const mobileRole = useRole(mobileContext, { role: 'dialog' });
  const { getReferenceProps: getMobileReferenceProps, getFloatingProps: getMobileFloatingProps } = useInteractions([
    mobileClick,
    mobileDismiss,
    mobileRole,
  ]);
  const { setReference: setMobileReference, setFloating: setMobileFloating } = mobileRefs;

  const closeMobileMenu = () => {
    onMobileOpenChange(false);
  };

  return (
    <div className="relative order-first shrink-0 lg:order-0">
      <button
        ref={setMobileReference}
        type="button"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-300 hover:text-black lg:hidden',
          isMobileMenuOpen && 'border-tumbleweed-300 bg-tumbleweed-50 text-black',
        )}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        {...getMobileReferenceProps()}
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

      {isMobileMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={mobileContext} modal={false} initialFocus={-1}>
            <div
              ref={setMobileFloating}
              style={mobileFloatingStyles}
              className="z-50 w-[calc(100vw-1rem)] outline-none sm:w-md lg:hidden"
              {...getMobileFloatingProps()}
            >
              <div
                style={mobileTransitionStyles}
                className="max-h-[inherit] overflow-hidden rounded-3xl border border-neutral-200 bg-white/95 shadow-2xl backdrop-blur-xl"
              >
                <div className="scrollbar-soft max-h-[inherit] space-y-2 overflow-y-auto p-2">
                  {data.map((category) => {
                    const isActive = pathname === `/category/${category.id}`;
                    const subs = subcategoriesByCategory[category.id] || [];
                    const hasSubs = subs.length > 0;
                    const isCategoryOpen = openMobileCategory === category.id;

                    return (
                      <div
                        key={category.id}
                        className={cn(
                          'rounded-2xl border px-3 py-2 transition-colors',
                          isActive ? 'border-tumbleweed-200 bg-tumbleweed-50' : 'border-neutral-100 bg-white',
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/category/${category.id}`}
                            className={cn(
                              'flex-1 rounded-xl px-1 py-1.5 text-sm font-bold tracking-wide transition-colors',
                              isActive ? 'text-black' : 'text-neutral-700 hover:text-black',
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
                              className="hover:bg-tumbleweed-100 rounded-full p-2 text-neutral-600 transition hover:text-black"
                              onClick={() =>
                                setOpenMobileCategory((current) => (current === category.id ? null : category.id))
                              }
                            >
                              <ChevronDown
                                size={16}
                                className={cn('transition-transform duration-200', isCategoryOpen && 'rotate-180')}
                              />
                            </button>
                          )}
                        </div>

                        {hasSubs && isCategoryOpen && (
                          <div className="border-tumbleweed-100 mt-2 space-y-1 border-t pt-2">
                            {subs.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/category/${category.id}/${sub.id}`}
                                className="block rounded-xl px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
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
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
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
