import getBillboard from '@/actions/get-billboard';
import getCategories from '@/actions/get-categories';
import { getInstagramPosts } from '@/actions/get-instagram-posts';
import getProducts from '@/actions/get-products';
import { CategoryMosaic } from '@/app/(routes)/components/category-mosaic';
import { Billboard } from '@/components/ui/billboard';
import { ProductList } from '@/components/product-list';
import Container from '@/components/ui/container';
import { InstagramFeed } from '@/app/(routes)/components/instagram-feed';
import { PageSection } from '@/app/(routes)/components/page-section';
import { PromoStrip } from '@/app/(routes)/components/promo-strip';
import { getBiggestDiscount } from '@/business/product-pricing';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

const HomePage = async () => {
  const [featuredProducts, saleProducts, billboard, instagramPosts, categories] = await Promise.all([
    getProducts({ isFeatured: true }),
    getProducts({ isOnSale: true }),
    getBillboard(),
    getInstagramPosts(),
    getCategories(),
  ]);

  const biggestDiscount = getBiggestDiscount(saleProducts);

  return (
    <>
      <Container className="flex flex-col gap-8">
        <Billboard data={billboard} />
      </Container>

      <PromoStrip />

      <Container className="flex flex-col gap-8">
        <PageSection
          smallText="Rinkis produktus pagal kategorijas"
          bigText="Atrask, ko ieško mažylis"
          position="center"
        >
          <CategoryMosaic categories={categories} />
        </PageSection>

        <div className="bg-sale-soft w-full space-y-4 rounded-3xl px-6 py-7 md:px-12 md:py-16 lg:px-16 lg:py-18">
          <div className="flex flex-col items-start sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="font-accent text-ink text-4xl font-bold tracking-tight text-balance lg:text-5xl">
                Švelnumas už <span className="text-sale-strong">mažiau</span>
              </h1>
              <p>
                Atrinkti mūsų komandos favoritai su nuolaida iki{' '}
                <span className="text-sale-strong font-semibold tabular-nums">-{biggestDiscount}%</span>. Pasiūlymai
                galioja, kol baigsis prekių likučiai.
              </p>
            </div>
            <Link
              href="/akcijos"
              className="group hover:text-sale-strong text-ink mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-semibold underline transition sm:text-base sm:no-underline"
            >
              Visos akcijos
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <ProductList items={saleProducts} variant="rail" />
        </div>

        <PageSection
          smallText="Rekomenduojama"
          bigText="Mūsų rekomenduojami produktai jūsų mažyliui"
          position="left"
          link={{ label: 'Žiūrėti rekomendacijas', href: '/' }}
        >
          <div className="flex flex-col gap-y-8">
            <ProductList items={featuredProducts} variant="rail" />
          </div>
        </PageSection>

        <PageSection
          smallText="Tinklaraištis"
          bigText="Patarimai tėvams"
          position="left"
          link={{ label: 'Žiūrėti įrašus', href: '/' }}
        >
          {/* Blogo įrašų sąrašas */}
          <></>
        </PageSection>

        <PageSection
          smallText="Sek mus Instagrame ir pasidalink savo nuotraukomis su #babystepLT"
          bigText="@babystep.lt"
          position="center"
        >
          <InstagramFeed posts={instagramPosts} />
        </PageSection>

        <div className="bg-tumbleweed-100 w-full rounded-3xl p-20">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="font-accent text-ink text-4xl font-bold tracking-tight text-balance lg:text-5xl">
                Pirmieji sužinokite <br /> <span className="text-link">naujienas</span>
              </h1>
              <p className="text-ink-muted">
                Prenumeruok naujienlaiškį ir pirmas sužinok apie naujienas, išpardavimus ir patarimus tėvams. Nuolaida
                atkeliaus į el. paštą per kelias minutes.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
