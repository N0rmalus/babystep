import getCategories from '@/actions/get-categories';
import getProductCatalog from '@/actions/get-product-catalog';
import getSubcategories from '@/actions/get-subcategories';
import { PageHeader } from '@/components/page-header';
import { ProductCatalogResults } from '@/components/product-catalog/product-catalog-results';
import { MobileProductFiltersDrawer } from '@/components/product-filters/mobile-product-filters-drawer';
import { ProductFiltersContainer } from '@/components/product-filters/product-filters-container';
import Container from '@/components/ui/container';
import { parseProductFilters, parseProductPage, type ProductFilterSearchParams } from '@/lib/product-filters';

export const revalidate = 0;

type Props = {
  searchParams: Promise<ProductFilterSearchParams>;
};

const AkcijosPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const parsedFilters = parseProductFilters(resolvedSearchParams);

  const filters = {
    ...parsedFilters,
    isOnSale: false,
  };

  const page = parseProductPage(resolvedSearchParams.page);

  const [categories, subcategories, catalog] = await Promise.all([
    getCategories(),
    getSubcategories(),
    getProductCatalog({ filters, page, baseOnSale: true }),
  ]);

  const categoryGroups = categories.map((category) => {
    const categorySubcategories = subcategories
      .filter((subcategory) => subcategory.categoryId === category.id)
      .map((subcategory) => ({
        id: subcategory.id,
        name: subcategory.name,
        count: catalog.subcategoryCounts[subcategory.id] ?? 0,
      }));

    return {
      id: category.id,
      name: category.name,
      count: categorySubcategories.reduce((totalCount, subcategory) => totalCount + subcategory.count, 0),
      subcategories: categorySubcategories,
    };
  });

  const subcategoryOptions = categoryGroups.flatMap((group) => group.subcategories);
  const filterKey = JSON.stringify(filters);

  return (
    <Container>
      <PageHeader title="Akcijos" description="Švelnūs atradimai geresne kaina" />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[18.5rem_minmax(0,1fr)] lg:gap-x-7">
        <div className="hidden lg:block">
          <ProductFiltersContainer
            key={`${filterKey}:${catalog.priceRange.min}:${catalog.priceRange.max}`}
            initialFilters={filters}
            priceRange={catalog.priceRange}
            categoryGroups={categoryGroups}
            showSaleFilter={false}
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
          searchPlaceholder="Ieškoti akcijose..."
          mobileFilterControl={
            <MobileProductFiltersDrawer
              initialFilters={filters}
              priceRange={catalog.priceRange}
              categoryGroups={categoryGroups}
              showSaleFilter={false}
            />
          }
        />
      </div>
    </Container>
  );
};

export default AkcijosPage;
