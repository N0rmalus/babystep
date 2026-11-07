'use client';

import { useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductListFailedBox } from '@/components/product-list-failed-box';
import { PageContainer } from '@/components/ui/page-container';
import useCart from '@/hooks/use-cart';
import { useCartSummary } from '@/hooks/use-cart-summary';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import type { DeliveryConfig } from '@/lib/checkout-api';
import { PRODUCT_REFRESH_INTERVAL_MS } from '@/lib/consts';
import { pluralize } from '@/lib/plural';
import { CartEmptyState } from './cart-empty-state';
import { CartLine } from './cart-line';
import { CartLoadingState } from './cart-loading-state';
import { CartSummaryPanel } from './cart-summary-panel';
import { FreeShippingProgress } from './free-shipping-progress';
import { MobileCheckoutBar } from './mobile-checkout-bar';
import { useMockPromoCode } from './promo-code-field';

type Props = {
  deliveryConfig: DeliveryConfig;
};

const ITEM_FORMS = { one: 'prekė', few: 'prekės', many: 'prekių' };

export const CartView = ({ deliveryConfig }: Props) => {
  const isMounted = useMounted();
  const lines = useCart((state) => state.items);
  const removeItems = useCart((state) => state.removeItems);
  const productIdsKey = lines.map((line) => line.productId).join(',');
  const itemIds = useMemo(() => (productIdsKey ? productIdsKey.split(',') : []), [productIdsKey]);

  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);
  const cartSummary = useCartSummary({
    lines,
    products,
    isLoading,
    failedProductIds,
    freeShippingThreshold: deliveryConfig.freeShippingThreshold,
  });
  const promo = useMockPromoCode(cartSummary.subtotal);

  const handleFocusRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useFocusRefresh({
    onRefresh: handleFocusRefresh,
    minIntervalMs: PRODUCT_REFRESH_INTERVAL_MS,
    enabled: isMounted,
  });

  useEffect(() => {
    if (missingProductIds.length === 0) {
      return;
    }

    if (!missingProductIds.some((productId) => itemIds.includes(productId))) {
      return;
    }

    removeItems(missingProductIds);
  }, [itemIds, missingProductIds, removeItems]);

  if (!isMounted) {
    return null;
  }

  if (itemIds.length === 0) {
    return (
      <PageContainer className="flex flex-col gap-8">
        <CartEmptyState />
      </PageContainer>
    );
  }

  const hasFailedProducts = failedProductIds.length > 0;
  const isResolvingProducts = isLoading || hasFailedProducts;
  const total = cartSummary.subtotal - promo.discount;

  return (
    <div>
      <PageContainer className="gap-5 lg:gap-7">
        <div className="flex items-baseline gap-3 pt-2 lg:pt-0">
          <h1 className="font-accent text-ink text-3xl leading-tight font-bold lg:text-4xl">Krepšelis</h1>
          <span className="text-ink-muted text-base">
            <span className="tabular-nums">{cartSummary.itemCount}</span> {pluralize(cartSummary.itemCount, ITEM_FORMS)}
          </span>
        </div>

        {hasFailedProducts && <ProductListFailedBox onFocusRefresh={handleFocusRefresh} />}
        {isResolvingProducts && !hasFailedProducts && <CartLoadingState />}

        {!isResolvingProducts && (
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_25rem] xl:gap-10">
            <div className="flex flex-col gap-4 lg:gap-5">
              <FreeShippingProgress
                subtotal={cartSummary.subtotal}
                freeShippingThreshold={deliveryConfig.freeShippingThreshold}
              />

              <ul
                aria-label="Prekės krepšelyje"
                className="xl:border-line xl:shadow-card flex flex-col gap-3 xl:gap-0 xl:rounded-3xl xl:border xl:bg-white xl:px-6 xl:py-1"
              >
                {products.map((product) => (
                  <CartLine
                    key={product.id}
                    product={product}
                    quantity={cartSummary.quantityByProductId.get(product.id) ?? 1}
                  />
                ))}
              </ul>

              <Link
                href="/"
                className="group text-link hidden min-h-11 items-center gap-1.5 self-start font-semibold lg:inline-flex"
              >
                <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
                Tęsti apsipirkimą
              </Link>
            </div>

            <CartSummaryPanel cartSummary={cartSummary} deliveryConfig={deliveryConfig} promo={promo} total={total} />

            <Link
              href="/"
              aria-label="Grįžti į parduotuvę"
              className="group text-link inline-flex min-h-11 items-center gap-1.5 self-center justify-self-center font-semibold lg:hidden"
            >
              <ArrowLeft size={16} aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5" />
              Tęsti apsipirkimą
            </Link>
          </div>
        )}
      </PageContainer>

      {!isResolvingProducts && <MobileCheckoutBar total={total} isDisabled={cartSummary.isCheckoutDisabled} />}
    </div>
  );
};
