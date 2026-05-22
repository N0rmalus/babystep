import getProducts from '@/actions/get-products';
import getSubcategories from '@/actions/get-subcategories';
import { notFound } from 'next/navigation';
import { Product } from '@/actions/types';
import Container from '@/components/ui/container';
import { ProductCard } from '@/components/ui/product-card/product-card';
import NoResults from '@/components/ui/no-results';
import { ProductFiltersContainer } from '@/components/product-filters-container';
import { Pagination } from '@/components/mock/pagination';
import {
  filterProducts,
  getProductPriceRange,
  parseProductFilters,
  ProductFilterSearchParams,
} from '@/lib/product-filters';

type Props = {
  params: Promise<{
    categoryId: string;
    subcategoryId: string;
  }>;
  searchParams: Promise<ProductFilterSearchParams>;
};

export const revalidate = 0;

const SubcategoryPage = async ({ params, searchParams }: Props) => {
  const [{ categoryId, subcategoryId }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const subcategories = await getSubcategories();
  const subcategory = subcategories.find((sub) => sub.id === subcategoryId && sub.categoryId === categoryId);

  if (!subcategory) {
    notFound();
  }

  const products: Product[] = await getProducts({ subcategoryId: subcategory.id });
  const filters = parseProductFilters(resolvedSearchParams);
  const filteredProducts = filterProducts(products, filters);
  const priceRange = getProductPriceRange(products);

  return (
    <Container>
      <div className="mt-8 mb-16 flex flex-col gap-16">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold capitalize">{subcategory.name}</h1>
          <p className="text-lg text-gray-500">Atraskite mūsų platų produktų asortimentą šioje kategorijoje.</p>
          <div className="bg-tumbleweed-400 mt-4 h-1 w-60 rounded-full" />
        </div>

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
            {filteredProducts.length === 0 ? (
              <NoResults />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        {filteredProducts.length > 0 && <Pagination currentPage={1} totalPages={1} />}
      </div>
    </Container>
  );
};

export default SubcategoryPage;
