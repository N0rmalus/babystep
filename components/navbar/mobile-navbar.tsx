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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Category, Subcategory } from '@/actions/types';
import { BrandLink } from '@/components/navbar/brand-link';
import { CartIconButton } from '@/components/navbar/cart-icon-button';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import { SOCIAL_LINKS } from '@/lib/consts';
import { cn } from '@/lib/utils';

type Props = {
  biggestDiscount: number;
  categories: Category[];
  subcategoriesByCategory: Record<string, Subcategory[]>;
};

type MobileCategorySectionProps = {
  category: Category;
  isActive: boolean;
  subcategories: Subcategory[];
  onNavigate: () => void;
};

const MENU_ROW_CLASSES = 'flex items-center justify-between text-xl font-semibold transition-colors';

export const MobileNavbar = ({ biggestDiscount, categories, subcategoriesByCategory }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const { refs, context } = useFloating({
    open: isMobileMenuOpen,
    onOpenChange: setIsMobileMenuOpen,
    strategy: 'fixed',
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    common: {
      transformOrigin: 'top center',
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-8px)',
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

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const { setReference, setFloating } = refs;

  const handleClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="lg:hidden">
        <IconButton ref={setReference} icon={<Menu size={18} />} label="Meniu" {...getReferenceProps()} />
      </div>

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal initialFocus={-1}>
            <div
              ref={setFloating}
              aria-label="Meniu"
              className="bg-canvas text-ink fixed inset-0 z-50 outline-none lg:hidden"
              {...getFloatingProps()}
            >
              <div style={transitionStyles} className="flex h-dvh flex-col">
                <div className="border-line px-gutter grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b">
                  <div className="flex">
                    <IconButton icon={<X size={18} />} label="Uždaryti meniu" onClick={handleClose} />
                  </div>
                  <BrandLink onClick={handleClose} />
                  <div className="flex justify-end">
                    <CartIconButton onClick={handleClose} />
                  </div>
                </div>

                <nav aria-label="Meniu" className="scrollbar-soft flex flex-1 flex-col overflow-y-auto px-5 pt-2 pb-8">
                  {categories.map((category) => (
                    <MobileCategorySection
                      key={category.id}
                      category={category}
                      isActive={pathname.startsWith(`/category/${category.id}`)}
                      subcategories={subcategoriesByCategory[category.id] ?? []}
                      onNavigate={handleClose}
                    />
                  ))}

                  <Link
                    href="/akcijos"
                    onClick={handleClose}
                    className={cn('text-sale-strong mt-1 h-14', MENU_ROW_CLASSES)}
                  >
                    <span>Akcijos</span>
                    {biggestDiscount > 0 && <Badge color="sale" label={`Iki -${biggestDiscount}%`} />}
                  </Link>

                  <hr className="border-line my-3" />

                  <Link
                    href="/wishlist"
                    onClick={handleClose}
                    className={cn(
                      'hover:text-link h-13',
                      pathname === '/wishlist' ? 'text-link' : '',
                      MENU_ROW_CLASSES,
                    )}
                  >
                    <span>Norai</span>
                    <Heart size={18} className="text-ink-muted" aria-hidden="true" />
                  </Link>

                  <GuestAccountCard />

                  <hr className="border-line mt-5 mb-4" />

                  <div className="flex gap-2.5">
                    {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                      <IconButton key={label} href={href} icon={<Icon size={16} />} label={label} />
                    ))}
                  </div>
                </nav>
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
    <div className="pt-2.5 pb-2">
      <Link
        href={`/category/${category.id}`}
        onClick={onNavigate}
        className={cn('h-11', isActive ? 'text-link' : 'hover:text-link', MENU_ROW_CLASSES)}
      >
        <span>{category.name}</span>
        <ChevronRight size={18} className="text-ink-muted" aria-hidden="true" />
      </Link>

      {subcategories.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-2.5">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={`/category/${category.id}/${subcategory.id}`}
              onClick={onNavigate}
              className="tap-surface border-tumbleweed-200 text-ink-soft hover:border-tumbleweed-300 hover:bg-tumbleweed-50 inline-flex h-10 items-center rounded-full border bg-white px-4 text-sm transition"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// MOCK: sign-in card for guests; the buttons do nothing until customer accounts exist (TODO.md "Customer accounts").
const GuestAccountCard = () => {
  const handleMockClick = () => {};

  return (
    <div className="bg-tumbleweed-50 border-tumbleweed-100 mt-3 flex flex-col gap-3 rounded-3xl border p-4.5">
      <p className="text-ink-soft text-sm leading-normal">
        Prisijunk, ir tavo norai bei užsakymai bus po ranka bet kuriame įrenginyje.
      </p>
      <Button size="sm" label="Prisijungti" onClick={handleMockClick} fullWidth className="h-11" />
      <p className="text-ink-muted text-center text-sm">
        Neturi paskyros?{' '}
        <button type="button" onClick={handleMockClick} className="text-link font-semibold underline">
          Susikurk
        </button>
      </p>
    </div>
  );
};
