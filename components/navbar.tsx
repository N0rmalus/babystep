import Link from 'next/link';

import Container from '@/components/ui/container';
import MainNav from '@/components/main-nav';
import getCategories from '@/actions/get-categories';
import getSubcategories from '@/actions/get-subcategories';
import NavbarActions from '@/components/navbar-actions';

const Navbar = async () => {
  const categories = await getCategories();
  const subcategories = await getSubcategories();

  return (
    <header className="sticky top-0 z-40 bg-white/95 shadow-lg backdrop-blur">
      <Container>
        <div className="relative flex h-16 items-center gap-3 md:h-20">
          <Link href="/" className="flex items-center">
            <p className="text-lg font-bold text-tumbleweed-300 md:text-xl">BabyStep.lt</p>
          </Link>
          <MainNav data={categories} subcategories={subcategories} />
          <NavbarActions />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
