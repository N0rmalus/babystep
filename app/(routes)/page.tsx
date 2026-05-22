import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import Billboard from '@/components/ui/billboard';
import { ProductList } from '@/components/product-list';
import Container from '@/components/ui/container';
import Image from 'next/image';

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard();

  return (
    <Container>
      <div className="mt-8 mb-16 flex flex-col gap-16">
        <section className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex flex-1 flex-col items-start gap-6">
            <h1 className="text-4xl leading-tight font-extrabold text-gray-900 md:text-5xl">
              Sveiki atvykę į <span className="text-tumbleweed-300">BabyStep.lt!</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-600">
              Atraskite aukščiausios kokybės produktus, skirtus jūsų mažyliui – nuo drabužių iki žaislų, viskas vienoje
              vietoje.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/icon-no-bg.svg"
              alt="Baby Step"
              width={400}
              height={400}
              className="h-auto w-55 object-contain drop-shadow-[0_0_30px_rgba(217,163,127,0.7)] transition-transform duration-200 ease-out hover:scale-[1.03] hover:rotate-6 sm:w-70 md:w-90"
            />
          </div>
        </section>

        <Billboard data={billboard} />

        <section id="featured" className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-tumbleweed-300 text-3xl font-bold">Rekomenduojama</h2>
            <p className="text-base text-gray-500">Mūsų rekomenduojami produktai jūsų mažyliui</p>
          </div>
          <div className="flex flex-col gap-y-8">
            <ProductList title="" items={products} />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default HomePage;
