import getCategory from '@/actions/get-category';
import getProducts from '@/actions/get-products';
import getSubcategories from '@/actions/get-subcategories';

import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import { ProductCard } from '@/components/ui/product-card/product-card';
import { ProductFiltersContainer } from '@/components/product-filters-container';
import { Pagination } from '@/components/mock/pagination';
import {
  filterProducts,
  getProductPriceRange,
  parseProductFilters,
  ProductFilterSearchParams,
} from '@/lib/product-filters';

export const revalidate = 0;

type Props = {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<ProductFilterSearchParams>;
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const [{ categoryId }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const category = await getCategory(categoryId);
  const subcategories = await getSubcategories();
  const categorySubcategories = subcategories.filter((sub) => sub.categoryId === categoryId);
  const subcategoryIds = categorySubcategories.map((sub) => sub.id);

  const products = (await getProducts({})).filter((product) => subcategoryIds.includes(product.subcategoryId));
  const filters = parseProductFilters(resolvedSearchParams);
  const filteredProducts = filterProducts(products, filters);
  const priceRange = getProductPriceRange(products);

  return (
    <Container>
      <div className="mt-8 mb-16 flex flex-col gap-10">
        <Billboard data={category.billboard} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-x-8">
          <div className="lg:col-span-1">
            <ProductFiltersContainer
              key={`${filters.query}:${filters.minPrice ?? ''}:${filters.maxPrice ?? ''}:${priceRange.min}:${priceRange.max}`}
              initialFilters={filters}
              priceRange={priceRange}
              visibleCount={filteredProducts.length}
              totalCount={products.length}
            />
          </div>

          <div className="lg:col-span-4">
            {filteredProducts.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
        {filteredProducts.length > 0 && <Pagination currentPage={1} totalPages={1} />}
      </div>
    </Container>
  );
};

export default CategoryPage;
