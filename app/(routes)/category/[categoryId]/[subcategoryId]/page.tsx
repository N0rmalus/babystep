import getProducts from "@/actions/get-products";
import getSubcategories from "@/actions/get-subcategories";
import { notFound } from "next/navigation";
import { Product } from "@/types";
import Container from "@/components/ui/container";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";


interface SubcategoryPageProps {
    params: {
        categoryId: string;
        subcategoryId: string;
    };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
    // Fetch all subcategories to find the one matching name and categoryId
    const subcategories = await getSubcategories();
    const subcategory = subcategories.find(
        (sub) =>
            sub.id === params.subcategoryId &&
            sub.categoryId === params.categoryId
    );

    if (!subcategory) {
        notFound();
    }

    // Fetch products for this subcategory
    const products: Product[] = await getProducts({ subcategoryId: subcategory.id });

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8">
            <Container>
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-sm">
                        {subcategory.name}
                    </h1>
                    <p className="text-lg text-gray-500">
                        Discover our curated selection of{" "}
                        <span className="font-semibold">{subcategory.name}</span> products.
                    </p>
                    <div className="w-20 h-1 bg-pink-400 rounded-full mt-4" />
                </div>
                {products.length === 0 ? (
                    <NoResults />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} data={product} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
