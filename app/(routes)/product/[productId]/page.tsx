import { notFound } from 'next/navigation';

import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import type { Product } from '@/actions/types';
import { ProductPurchaseProvider } from '@/components/product/product-purchase-provider';
import { RouteFocusRefresh } from '@/components/route-focus-refresh';
import { MobileBuyBar } from './components/mobile-buy-bar';
import { ProductBreadcrumbs } from './components/product-breadcrumbs';
import { ProductBuyBox } from './components/product-buy-box';
import { ProductDetails } from './components/product-details';
import { ProductMedia } from './components/product-media';
import { ProductReviews } from './components/product-reviews';
import { SimilarProducts } from './components/similar-products';

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

const SIMILAR_PRODUCTS_COUNT = 4;

export const revalidate = 0;

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  const { subcategory } = product;
  const similarProducts = await getSimilarProducts(product);

  return (
    <ProductPurchaseProvider key={product.id} product={product}>
      <RouteFocusRefresh />
      <div className="lg:px-gutter mx-auto w-full max-w-7xl lg:pb-20">
        <div className="px-2 lg:px-0">
          <ProductBreadcrumbs subcategory={subcategory} productName={product.name} />
        </div>

        <div className="px-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-0">
          <ProductMedia images={product.images} name={product.name} />
          <ProductBuyBox />
        </div>

        <div className="px-4 lg:px-0">
          <ProductDetails description={product.description} />
          {/* MOCK: reviews until "Customer accounts" (reviews). */}
          <ProductReviews />
        </div>
      </div>

      <SimilarProducts products={similarProducts} href={`/category/${subcategory.categoryId}/${subcategory.id}`} />
      <MobileBuyBar />
    </ProductPurchaseProvider>
  );
};

export default ProductPage;

const getSimilarProducts = async (product: Product) => {
  const excludeCurrent = (products: Product[]) => products.filter((item) => item.id !== product.id);
  const subcategoryProducts = excludeCurrent(await getProducts({ subcategoryId: product.subcategoryId }));

  if (subcategoryProducts.length > 0) {
    return subcategoryProducts.slice(0, SIMILAR_PRODUCTS_COUNT);
  }

  const categoryProducts = excludeCurrent(await getProducts({ categoryId: product.subcategory.categoryId }));

  return categoryProducts.slice(0, SIMILAR_PRODUCTS_COUNT);
};
