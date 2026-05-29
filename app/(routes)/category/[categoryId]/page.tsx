import getCategory from '@/actions/get-category';
import getProductCatalog from '@/actions/get-product-catalog';
import getSubcategories from '@/actions/get-subcategories';

import { Billboard } from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import { parseProductFilters, parseProductPage, type ProductFilterSearchParams } from '@/lib/product-filters';
import { ProductCatalogResults } from '@/components/product-catalog/product-catalog-results';
import { MobileProductFiltersDrawer } from '@/components/product-filters/mobile-product-filters-drawer';
import { ProductFiltersContainer } from '@/components/product-filters/product-filters-container';
import type { ProductFilterOption } from '@/components/product-filters/types';
import { notFound } from 'next/navigation';

export const revalidate = 0;

type Props = {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<ProductFilterSearchParams>;
};

const CategoryPage = async ({ params, searchParams }: Props) => {
  const [{ categoryId }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const filters = parseProductFilters(resolvedSearchParams);
  const page = parseProductPage(resolvedSearchParams.page);

  const [category, subcategories, catalog] = await Promise.all([
    getCategory(categoryId),
    getSubcategories(),
    getProductCatalog({ categoryId, filters, page }),
  ]);

  const categorySubcategories = subcategories.filter((sub) => sub.categoryId === categoryId);

  const subcategoryOptions: ProductFilterOption[] = categorySubcategories.map((subcategory) => ({
    id: subcategory.id,
    name: subcategory.name,
    count: catalog.subcategoryCounts[subcategory.id] ?? 0,
  }));

  const filterKey = JSON.stringify(filters);

  if (!category) {
    notFound();
  }

  return (
    <Container>
      <Billboard data={category.billboard} />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-x-7">
        <div className="hidden lg:block">
          <ProductFiltersContainer
            key={`${filterKey}:${catalog.priceRange.min}:${catalog.priceRange.max}`}
            initialFilters={filters}
            priceRange={catalog.priceRange}
            subcategories={subcategoryOptions}
          />
        </div>

        <ProductCatalogResults
          filters={filters}
          subcategories={subcategoryOptions}
          products={catalog.products}
          visibleCount={catalog.filteredCount}
          totalCount={catalog.totalCount}
          currentPage={catalog.currentPage}
          totalPages={catalog.totalPages}
          pageSize={catalog.pageSize}
          mobileFilterControl={
            <MobileProductFiltersDrawer
              initialFilters={filters}
              priceRange={catalog.priceRange}
              subcategories={subcategoryOptions}
            />
          }
        />
      </div>
    </Container>
  );
};

export default CategoryPage;
