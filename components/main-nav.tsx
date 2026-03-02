'use client';

import { cn } from '@/lib/utils';
import { Category, Subcategory } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface MainNavProps {
  data: Category[];
  subcategories: Subcategory[];
}

const MainNav: React.FC<MainNavProps> = ({ data, subcategories }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Group subcategories by categoryId
  const subcategoriesByCategory: Record<string, Subcategory[]> = {};
  subcategories.forEach((sub) => {
    if (!subcategoriesByCategory[sub.categoryId]) {
      subcategoriesByCategory[sub.categoryId] = [];
    }
    subcategoriesByCategory[sub.categoryId].push(sub);
  });

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

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {data.map((category) => {
        const isActive = pathname === `/category/${category.id}`;
        const subs = subcategoriesByCategory[category.id] || [];
        return (
          <div
            key={category.id}
            className="group relative"
            onMouseEnter={() => handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={`/category/${category.id}`}
              className={cn(
                'flex items-center text-sm font-medium uppercase transition-colors hover:text-black',
                isActive ? 'text-black' : 'text-neutral-500',
              )}
              onClick={() => setOpenDropdown(openDropdown === category.id ? null : category.id)}
            >
              {category.name}
              {subs.length > 0 && <ChevronDown className="mx-1" size={14} />}
            </Link>
            {subs.length > 0 && openDropdown === category.id && (
              <div
                className="absolute left-0 z-50 mt-2 w-48 rounded border bg-white shadow-lg"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                {subs.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${category.id}/${sub.id}`}
                    className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
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
  );
};

export default MainNav;
