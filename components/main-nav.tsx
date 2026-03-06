'use client';

import { cn } from '@/lib/utils';
import { Category, Subcategory } from '@/actions/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface MainNavProps {
  data: Category[];
  subcategories: Subcategory[];
}

const MainNav: React.FC<MainNavProps> = ({ data, subcategories }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setOpenDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 120); // Small delay to allow moving to dropdown
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:border-neutral-300 hover:text-black md:hidden"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <nav className="hidden items-center gap-1 md:ml-4 md:flex">
        {data.map((category) => {
          const isActive = pathname === `/category/${category.id}`;
          const subs = subcategoriesByCategory[category.id] || [];

          return (
            <div
              key={category.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/category/${category.id}`}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-wide transition-colors hover:text-black',
                  isActive ? 'bg-neutral-100 text-black' : 'text-neutral-600',
                )}
              >
                {category.name}
                {subs.length > 0 && <ChevronDown size={14} />}
              </Link>
              {subs.length > 0 && openDropdown === category.id && (
                <div
                  className="absolute left-1/2 z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-1 shadow-xl"
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {subs.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/category/${category.id}/${sub.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
          />
          <div className="fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl md:hidden">
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

export default MainNav;
