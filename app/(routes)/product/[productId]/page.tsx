import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

interface ProductPageProps {
    params: {
        productId: string;
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const product = await getProduct(params.productId);
    const suggestedProducts = await getProducts({
        categoryId: product?.subcategory?.categoryId
    })

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
                            <Gallery images={product.images} />
                        </div>
                        <div className="mt-10 sm:mt-16 lg:mt-0">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <Info data={product} />
                            </div>
                        </div>
                    </div>
                    <hr className="my-16" />
                    <ProductList title="Related Items" items={suggestedProducts} />
                </div>
            </Container>
        </div>
    );
}

export default ProductPage;