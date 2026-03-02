import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.subcategory?.categoryId,
  });

  return (
    <Container>
      <div className="mb-16 mt-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-xl">
            <Gallery images={product.images} />
          </div>
          <div className="mt-10 sm:mt-16 lg:mt-0">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <Info data={product} />
            </div>
          </div>
        </div>
        <hr className="my-16" />
        <ProductList title="Panašios Prekės" items={suggestedProducts} />
      </div>
    </Container>
  );
};

export default ProductPage;
