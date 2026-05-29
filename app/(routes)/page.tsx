import getBillboard from '@/actions/get-billboard';
import { getInstagramPosts } from '@/actions/get-instagram-posts';
import getProducts from '@/actions/get-products';
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
  const [featuredProducts, saleProducts, billboard, instagramPosts] = await Promise.all([
    getProducts({ isFeatured: true }),
    getProducts({ isOnSale: true }),
    getBillboard(),
    getInstagramPosts(),
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
          {/* Kategorijų mozaika */}
          <></>
        </PageSection>

        <div className="from-salmon-100 to-salmon-200 w-full space-y-4 rounded-3xl bg-linear-to-r px-6 py-7 md:px-12 md:py-16 lg:px-16 lg:py-18">
          <div className="flex flex-col items-start sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="font-accent text-3xl font-black text-neutral-900 sm:text-3xl lg:text-5xl">
                Švelnumas už <span className="text-salmon-700">mažiau</span>
              </h1>
              <p>
                Atrinkti mūsų komandos favoritai su nuolaida iki{' '}
                <span className="text-salmon-700 font-accent font-semibold">-{biggestDiscount}%</span>. Pasiūlymai
                galioja, kol baigsis prekių likučiai.
              </p>
            </div>
            <Link
              href="/akcijos"
              className="group hover:text-salmon-700 font-accent mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-900 underline transition sm:text-base sm:no-underline"
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

        <div className="from-tumbleweed-100 to-salmon-100 w-full rounded-3xl bg-linear-to-r p-20">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="font-accent text-3xl font-black text-neutral-900 sm:text-3xl lg:text-5xl">
                Pirmieji sužinokite <br /> <span className="text-salmon-700">naujienas</span>
              </h1>
              <p className="text-neutral-600">
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
