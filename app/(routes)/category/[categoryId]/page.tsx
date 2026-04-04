import getCategory from '@/actions/get-category';
import getProducts from '@/actions/get-products';
import getSubcategories from '@/actions/get-subcategories';

import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card/product-card';
import { ProductFiltersContainer } from '@/components/mock/product-filters-container';
import { Pagination } from '@/components/mock/pagination';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await getCategory(params.categoryId);
  const subcategories = await getSubcategories();
  const categorySubcategories = subcategories.filter((sub) => sub.categoryId === params.categoryId);
  const subcategoryIds = categorySubcategories.map((sub) => sub.id);

  const products = (await getProducts({})).filter((product) => subcategoryIds.includes(product.subcategoryId));

  return (
    <Container>
      <div className="mb-16 mt-8 flex flex-col gap-10">
        <Billboard data={category.billboard} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-x-8">
          <div className="lg:col-span-1">
            <ProductFiltersContainer />
          </div>

          {/* Products */}
          <div className="lg:col-span-4">
            {products.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
        {products.length > 0 && <Pagination currentPage={1} totalPages={1} />}
      </div>
    </Container>
  );
};

export default CategoryPage;
