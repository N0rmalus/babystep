import getBillboard from '@/actions/get-billboard';
import getCategories from '@/actions/get-categories';
import { getInstagramPosts } from '@/actions/get-instagram-posts';
import getProducts from '@/actions/get-products';
import { AgePicks } from '@/app/(routes)/components/age-picks';
import { CategoryShowcase } from '@/app/(routes)/components/category-showcase';
import { HomeBillboard } from '@/app/(routes)/components/home-billboard';
import { InstagramSection } from '@/app/(routes)/components/instagram-section';
import { NewsletterSection } from '@/app/(routes)/components/newsletter-section';
import { SaleSection } from '@/app/(routes)/components/sale-section';
import { PageContainer } from '@/components/ui/page-container';

export const revalidate = 0;

const HomePage = async () => {
  const [featuredProducts, saleProducts, billboard, instagramPosts, categories] = await Promise.all([
    getProducts({ isFeatured: true }),
    getProducts({ isOnSale: true }),
    getBillboard(),
    getInstagramPosts(),
    getCategories(),
  ]);

  return (
    <PageContainer className="block py-0 sm:py-0">
      <HomeBillboard data={billboard} />
      <CategoryShowcase categories={categories} />
      <SaleSection products={saleProducts} />
      <AgePicks products={featuredProducts} />
      <InstagramSection posts={instagramPosts} />
      <NewsletterSection />
    </PageContainer>
  );
};

export default HomePage;
