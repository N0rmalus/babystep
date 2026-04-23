import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import { Gallery } from '@/components/gallery';
import { Info } from '@/components/info';
import ProductList from '@/components/product-list';
import { RouteFocusRefresh } from '@/components/route-focus-refresh';
import Container from '@/components/ui/container';

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

export const revalidate = 0;

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProduct(productId);

  const suggestedProducts = await getProducts({
    categoryId: product?.subcategory?.categoryId,
  });

  return (
    <div className="mt-16 space-y-10">
      <RouteFocusRefresh />
      <Container>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          <Gallery images={product.images} />
          <div className="mt-10 sm:mt-16 lg:mt-0">
            <div className="rounded-2xl bg-white p-4 shadow-xl md:p-8">
              <Info data={product} />
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-tumbleweed-50 py-8 pb-16 shadow-[inset_0_8px_20px_rgba(0,0,0,0.08)]">
        <Container>
          <ProductList title="Panašios Prekės" items={suggestedProducts} />
        </Container>
      </div>
    </div>
  );
};

export default ProductPage;
