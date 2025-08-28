import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import getSubcategories from "@/actions/get-subcategories";

import Billboard from "@/components/ui/billboard";
import Containter from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

interface CategoryPageProps {
    params: {
        categoryId: string;
    };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params
}) => {
    const category = await getCategory(params.categoryId);
    const subcategories = await getSubcategories();
    const categorySubcategories = subcategories.filter(
        (sub) => sub.categoryId === params.categoryId
    );
    const subcategoryIds = categorySubcategories.map((sub) => sub.id);

    // Fetch all products and filter by subcategoryId
    const products = (await getProducts({})).filter(
        (product) => subcategoryIds.includes(product.subcategoryId)
    );

    return (
        <div className="bg-white">
            <Containter>
                <Billboard data={category.billboard} />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {/* Filtering UI removed */}
                        <div className="lg:col-span-5">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard key={item.id} data={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Containter>
        </div>
    );
}

export default CategoryPage;