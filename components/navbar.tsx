import Image from 'next/image';
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
      <div className="relative mx-auto flex h-16 max-w-7xl min-w-0 items-center gap-2 px-4 sm:gap-3 sm:px-6 md:h-20 lg:px-8">
        <Link
          href="/"
          aria-label="Babystep pradžia"
          className="group inline-flex shrink-0 items-center gap-1.5 leading-none sm:gap-2"
        >
          <Image
            src="/logo2.png"
            alt="BabyStep.lt logo"
            width={50}
            height={50}
            className="size-9 object-contain transition-transform duration-200 ease-out group-hover:rotate-6 sm:size-10"
          />

          <span className="font-accent text-tumbleweed-700 text-xl font-bold tracking-tight transition sm:text-2xl">
            Babystep
          </span>
        </Link>
        <MainNav data={categories} subcategories={subcategories} />
        <NavbarActions />
      </div>
    </header>
  );
};

export default Navbar;
