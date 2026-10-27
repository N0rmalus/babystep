'use client';

import {
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { ChevronRight, Heart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { Category, Subcategory } from '@/actions/types';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/lib/consts';

type Props = {
  biggestDiscount: number;
  categories: Category[];
  pathname: string;
  subcategoriesByCategory: Record<string, Subcategory[]>;
};

type MobileCategorySectionProps = {
  category: Category;
  isActive: boolean;
  subcategories: Subcategory[];
  onNavigate: () => void;
};

export const MobileNavbar = ({ biggestDiscount, categories, pathname, subcategoriesByCategory }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  const handleMobileOpenChange = (isOpen: boolean) => {
    setIsMobileMenuOpen(isOpen);
  };

  const { refs: mobileRefs, context: mobileContext } = useFloating({
    open: isMobileMenuOpen,
    onOpenChange: handleMobileOpenChange,
    strategy: 'fixed',
  });

  const { isMounted: isMobileMounted, styles: mobileTransitionStyles } = useTransitionStyles(mobileContext, {
    common: {
      transformOrigin: 'top center',
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    open: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    close: {
      opacity: 0,
      transform: 'translateY(-8px)',
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
    handleMobileOpenChange(false);
  };

  return (
    <>
      <button
        ref={setMobileReference}
        type="button"
        className={cn(
          'tap-strong text-ink relative flex shrink-0 items-center justify-center rounded-lg border bg-white p-2 lg:hidden',
          isMobileMenuOpen && 'border-tumbleweed-300 bg-tumbleweed-50',
        )}
        {...getMobileReferenceProps()}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMobileMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={mobileContext} modal initialFocus={-1}>
            <div
              ref={setMobileFloating}
              className="text-ink fixed inset-0 z-50 bg-white outline-none lg:hidden"
              {...getMobileFloatingProps()}
            >
              <div style={mobileTransitionStyles} className="flex h-dvh flex-col overflow-hidden">
                <div className="border-line flex h-16 items-center justify-between gap-2 border-b px-5 sm:gap-3 sm:px-8 lg:px-8">
                  <Link
                    href="/"
                    aria-label="Babystep pradžia"
                    className="group absolute left-1/2 inline-flex shrink-0 -translate-x-1/2 items-center gap-2 leading-none lg:static lg:translate-x-0"
                  >
                    <Image
                      src="/logo2.png"
                      alt="BabyStep.lt logo"
                      width={50}
                      height={50}
                      className="size-9 object-contain transition-transform duration-200 ease-out group-hover:rotate-6 sm:size-10"
                    />

                    <span className="font-accent text-link text-xl font-bold tracking-tight transition sm:text-xl">
                      Babystep
                    </span>
                  </Link>

                  <button
                    type="button"
                    className={cn(
                      'tap-strong text-ink relative flex shrink-0 items-center justify-center rounded-lg border bg-white p-2 lg:hidden',
                    )}
                    onClick={closeMobileMenu}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="scrollbar-soft flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const isActive = pathname === `/category/${category.id}`;
                      const subs = subcategoriesByCategory[category.id] || [];

                      return (
                        <MobileCategorySection
                          key={category.id}
                          category={category}
                          isActive={isActive}
                          subcategories={subs}
                          onNavigate={closeMobileMenu}
                        />
                      );
                    })}

                    <div className="space-y-4">
                      <Link
                        href="/akcijos"
                        className="group text-sale-strong font-accent flex items-center justify-between text-xl font-bold tracking-tight"
                        onClick={closeMobileMenu}
                      >
                        <span>Akcijos</span>
                        {biggestDiscount > 0 && (
                          <span className="bg-sale-soft text-sale-strong rounded-full px-4 py-1 text-sm font-bold tracking-wider uppercase">
                            Iki -{biggestDiscount}%
                          </span>
                        )}
                      </Link>

                      <div className="border-line border-t" />

                      <Link
                        href="/wishlist"
                        className="group font-accent text-ink flex items-center justify-between text-xl font-bold tracking-tight"
                        onClick={closeMobileMenu}
                      >
                        <span>Norai</span>
                        <Heart size={20} className="text-ink-faint group-hover:text-ink transition" />
                      </Link>

                      <Link
                        href="#"
                        className="group font-accent text-ink flex items-center justify-between text-xl font-bold tracking-tight"
                        onClick={closeMobileMenu}
                      >
                        <span>Tinklaraštis</span>
                        <ChevronRight size={20} className="text-ink-faint group-hover:text-ink transition" />
                      </Link>

                      <Link
                        href="#"
                        className="group font-accent text-ink flex items-center justify-between text-xl font-bold tracking-tight"
                        onClick={closeMobileMenu}
                      >
                        <span>Apie mus</span>
                        <ChevronRight size={20} className="text-ink-faint group-hover:text-ink transition" />
                      </Link>
                    </div>
                  </div>

                  <div className="border-line border-t pt-4">
                    <div className="flex items-center gap-4">
                      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                        <Link
                          key={label}
                          href={href}
                          aria-label={label}
                          className="tap-strong border-line text-ink-soft hover:border-line-strong hover:text-ink flex size-10 items-center justify-center rounded-lg border bg-white transition"
                          onClick={closeMobileMenu}
                        >
                          <Icon size={20} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

const MobileCategorySection = ({ category, isActive, subcategories, onNavigate }: MobileCategorySectionProps) => {
  return (
    <div className="space-y-2">
      <Link
        href={`/category/${category.id}`}
        className={cn(
          'group font-accent flex items-center justify-between text-xl font-bold transition-colors',
          isActive ? 'text-tumbleweed-800' : 'hover:text-tumbleweed-800 text-ink',
        )}
        onClick={onNavigate}
      >
        <span>{category.name}</span>
        <ChevronRight size={20} className="text-ink-faint group-hover:text-ink transition" />
      </Link>

      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/category/${category.id}/${subcategory.id}`}
              className="tap-surface border-tumbleweed-100 text-ink-soft hover:border-line-strong hover:text-ink rounded-full border bg-white px-4 py-2 text-sm transition"
              onClick={onNavigate}
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
