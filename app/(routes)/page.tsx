import getBillboard from '@/actions/get-billboard';
import getProducts from '@/actions/get-products';
import Billboard from '@/components/ui/billboard';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Image from 'next/image';

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard();

  return (
    <Container>
      <div className="mb-16 mt-8 flex flex-col gap-16">
        <section className="flex flex-col items-center gap-8 md:flex-row">
          <div className="flex flex-1 flex-col items-start gap-6">
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
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
              className="h-auto w-[220px] object-contain drop-shadow-[0_0_30px_rgba(217,163,127,0.7)] transition-transform duration-200 ease-out hover:rotate-6 hover:scale-[1.03] sm:w-[280px] md:w-[360px]"
            />
          </div>
        </section>

        <Billboard data={billboard} />

        <section id="featured" className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold text-tumbleweed-300">Rekomenduojama</h2>
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
