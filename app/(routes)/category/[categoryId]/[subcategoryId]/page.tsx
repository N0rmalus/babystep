import getProductCatalog from '@/actions/get-product-catalog';
import getSubcategories from '@/actions/get-subcategories';
import { notFound } from 'next/navigation';
import Container from '@/components/ui/container';
import { parseProductFilters, parseProductPage, type ProductFilterSearchParams } from '@/lib/product-filters';
import { ProductFiltersContainer } from '@/components/product-filters/product-filters-container';
import { ProductCatalogResults } from '@/components/product-catalog/product-catalog-results';
import { MobileProductFiltersDrawer } from '@/components/product-filters/mobile-product-filters-drawer';
import { PageHeader } from '@/components/page-header';

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
  const filters = parseProductFilters(resolvedSearchParams);
  const page = parseProductPage(resolvedSearchParams.page);

  const [subcategories, catalog] = await Promise.all([
    getSubcategories(),
    getProductCatalog({ subcategoryId, filters, page }),
  ]);

  const subcategory = subcategories.find(
    (subcategory) => subcategory.id === subcategoryId && subcategory.categoryId === categoryId,
  );

  if (!subcategory) {
    notFound();
  }

  const filterKey = JSON.stringify(filters);

  return (
    <Container>
      <PageHeader title={subcategory.name} description={subcategory.category.name} />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-x-7">
        <div className="hidden lg:block">
          <ProductFiltersContainer
            key={`${filterKey}:${catalog.priceRange.min}:${catalog.priceRange.max}`}
            initialFilters={filters}
            priceRange={catalog.priceRange}
          />
        </div>

        <ProductCatalogResults
          filters={filters}
          products={catalog.products}
          visibleCount={catalog.filteredCount}
          totalCount={catalog.totalCount}
          currentPage={catalog.currentPage}
          totalPages={catalog.totalPages}
          pageSize={catalog.pageSize}
          mobileFilterControl={<MobileProductFiltersDrawer initialFilters={filters} priceRange={catalog.priceRange} />}
        />
      </div>
    </Container>
  );
};

export default SubcategoryPage;
