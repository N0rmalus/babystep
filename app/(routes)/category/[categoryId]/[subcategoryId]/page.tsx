import getProducts from "@/actions/get-products";
import getSubcategories from "@/actions/get-subcategories";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import { ProductFiltersContainer } from "@/components/product-filters-container";
import { Pagination } from "@/components/pagination";

interface SubcategoryPageProps {
    params: {
        categoryId: string;
        subcategoryId: string;
    };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
    const subcategories = await getSubcategories();
    const subcategory = subcategories.find(
        (sub) => sub.id === params.subcategoryId && sub.categoryId === params.categoryId
    );

    if (!subcategory) {
        notFound();
    }

    const products: Product[] = await getProducts({ subcategoryId: subcategory.id });

    return (
        <Container>
            <div className="mt-8 mb-16 flex flex-col gap-16">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-extrabold capitalize">{subcategory.name}</h1>
                    <p className="text-lg text-gray-500">
                        Atraskite mūsų platų produktų asortimentą šioje kategorijoje.
                    </p>
                    <div className="mt-4 h-1 w-60 rounded-full bg-tumbleweed-400" />
                </div>

                {/* Layout like your screenshot: search left, products right */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-x-8">
                    <div className="lg:col-span-1">
                        <ProductFiltersContainer />
                    </div>

                    <div className="lg:col-span-4">
                        {products.length === 0 ? (
                            <NoResults />
                        ) : (
                            <>
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} data={product} />
                                    ))}
                                </div>

                            </>
                        )}
                    </div>
                </div>
                {products.length > 0 && (
                    <Pagination currentPage={1} totalPages={1} />
                )}
            </div>
        </Container>
    );
}
