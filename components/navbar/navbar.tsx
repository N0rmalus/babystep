import Image from 'next/image';
import Link from 'next/link';

import { MainNav } from '@/components/navbar/main-nav';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import getSubcategories from '@/actions/get-subcategories';
import { NavbarActions } from '@/components/navbar/navbar-actions';
import { getBiggestDiscount } from '@/business/product-pricing';

const Navbar = async () => {
  const [categories, subcategories, saleProducts] = await Promise.all([
    getCategories(),
    getSubcategories(),
    getProducts({ isOnSale: true }),
  ]);
  const biggestDiscount = getBiggestDiscount(saleProducts);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-7xl min-w-0 items-center gap-2 px-5 sm:gap-3 sm:px-8 lg:h-20 lg:px-8">
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

          <span className="font-accent text-tumbleweed-700 text-xl font-bold tracking-tight transition sm:text-2xl">
            Babystep
          </span>
        </Link>
        <MainNav data={categories} subcategories={subcategories} biggestDiscount={biggestDiscount} />
        <NavbarActions />
      </div>
    </header>
  );
};

export default Navbar;
