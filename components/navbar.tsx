import Link from 'next/link';
import { MainNav } from '@/components/main-nav';
import getCategories from '@/actions/get-categories';
import getSubcategories from '@/actions/get-subcategories';
import { NavbarActions } from '@/components/navbar-actions';

const Navbar = async () => {
  const categories = await getCategories();
  const subcategories = await getSubcategories();

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-lg backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
        <Link href="/" className="flex items-center">
          <p className="text-lg font-bold text-tumbleweed-300 md:text-xl">BabyStep.lt</p>
        </Link>
        <MainNav data={categories} subcategories={subcategories} />
        <NavbarActions />
      </div>
    </header>
  );
};

export default Navbar;
