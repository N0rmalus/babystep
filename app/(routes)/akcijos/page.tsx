import getProducts from '@/actions/get-products';
import { ProductList } from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

const AkcijosPage = async () => {
  const saleProducts = await getProducts({ isOnSale: true });

  return (
    <Container className="flex flex-col gap-8">
      <ProductList title="Akcijos" items={saleProducts} />
    </Container>
  );
};

export default AkcijosPage;
