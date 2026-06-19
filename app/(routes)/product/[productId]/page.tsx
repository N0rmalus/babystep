import getProduct from '@/actions/get-product';
import { ProductViewer } from '@/app/(routes)/product/[productId]/components/product-viewer';
import { RouteFocusRefresh } from '@/components/route-focus-refresh';
import Container from '@/components/ui/container';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export const revalidate = 0;

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <RouteFocusRefresh />
      <Container className="gap-10 py-6 sm:py-10 lg:gap-14 lg:py-14">
        <ProductViewer product={product} />
      </Container>
    </>
  );
};

export default ProductPage;
