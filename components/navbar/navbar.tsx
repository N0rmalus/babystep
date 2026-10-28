import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import getSubcategories from '@/actions/get-subcategories';
import type { Subcategory } from '@/actions/types';
import { getBiggestDiscount } from '@/business/product-pricing';
import { BrandLink } from '@/components/navbar/brand-link';
import { HeaderSearch } from '@/components/navbar/header-search';
import { MainNav } from '@/components/navbar/main-nav';
import { MobileNavbar } from '@/components/navbar/mobile-navbar';
import { NavbarActions } from '@/components/navbar/navbar-actions';

const Navbar = async () => {
  const [categories, subcategories, saleProducts] = await Promise.all([
    getCategories(),
    getSubcategories(),
    getProducts({ isOnSale: true }),
  ]);
  const biggestDiscount = getBiggestDiscount(saleProducts);
  const subcategoriesByCategory = groupSubcategoriesByCategory(subcategories);

  return (
    <header className="border-line bg-muted-soft sticky top-0 z-40 border-b">
      <div className="px-gutter mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 lg:h-19">
        <div className="flex">
          <MobileNavbar
            biggestDiscount={biggestDiscount}
            categories={categories}
            subcategoriesByCategory={subcategoriesByCategory}
          />
          <HeaderSearch className="hidden w-80 lg:block" />
        </div>

        <BrandLink />

        <NavbarActions />
      </div>

      <div className="px-gutter pb-2.5 lg:hidden">
        <HeaderSearch />
      </div>

      <MainNav categories={categories} subcategoriesByCategory={subcategoriesByCategory} />
    </header>
  );
};

export default Navbar;

const groupSubcategoriesByCategory = (subcategories: Subcategory[]) => {
  return subcategories.reduce<Record<string, Subcategory[]>>((grouped, subcategory) => {
    grouped[subcategory.categoryId] = [...(grouped[subcategory.categoryId] ?? []), subcategory];
    return grouped;
  }, {});
};
