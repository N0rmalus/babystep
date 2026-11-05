'use client';

import { useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { ProductListFailedBox } from '@/components/product-list-failed-box';
import Button from '@/components/ui/button';
import Skeleton from '@/components/ui/skeleton';
import useCart from '@/hooks/use-cart';
import { useCartSummary } from '@/hooks/use-cart-summary';
import useFocusRefresh from '@/hooks/use-focus-refresh';
import useMounted from '@/hooks/use-mounted';
import useResolvedProducts from '@/hooks/use-resolved-products';
import type { DeliveryConfig, PaymentMethods } from '@/lib/checkout-api';
import { toCheckoutLines } from './checkout-lines';
import { CheckoutForm } from './checkout-form';
import { CheckoutSignInNote } from './checkout-sign-in-note';

type Props = {
  deliveryConfig: DeliveryConfig;
  paymentMethods: PaymentMethods;
};

export const CheckoutView = ({ deliveryConfig, paymentMethods }: Props) => {
  const router = useRouter();
  const isMounted = useMounted();
  const cartLines = useCart((state) => state.items);
  const productIdsKey = cartLines.map((line) => line.productId).join(',');
  const itemIds = useMemo(() => (productIdsKey ? productIdsKey.split(',') : []), [productIdsKey]);
  const { products, missingProductIds, failedProductIds, isLoading, refetch } = useResolvedProducts(itemIds);
  const cartSummary = useCartSummary({
    lines: cartLines,
    products,
    isLoading,
    failedProductIds,
    freeShippingThreshold: deliveryConfig.freeShippingThreshold,
  });

  const handleFocusRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useFocusRefresh({ onRefresh: handleFocusRefresh, enabled: isMounted });

  const isCartEmpty = itemIds.length === 0;

  useEffect(() => {
    if (isMounted && isCartEmpty) {
      router.replace('/cart');
    }
  }, [isCartEmpty, isMounted, router]);

  if (!isMounted || isCartEmpty) {
    return null;
  }

  const hasFailedProducts = failedProductIds.length > 0;
  const isResolving = isLoading || hasFailedProducts || products.length === 0;
  const hasStockProblem =
    missingProductIds.length > 0 || cartSummary.hasOutOfStockProducts || cartSummary.hasInsufficientStock;
  const lines = toCheckoutLines({ products, quantityByProductId: cartSummary.quantityByProductId });

  return (
    <div className="mx-auto w-full max-w-180 px-4 pt-2 sm:px-10 sm:pt-6 sm:pb-28">
      <Link
        href="/cart"
        className="text-ink-soft hover:text-link inline-flex min-h-11 items-center gap-1 text-sm font-semibold"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Grįžti į krepšelį
      </Link>

      <div className="pt-2 pb-5 lg:pb-7">
        <h1 className="font-accent text-ink text-3xl leading-tight font-bold sm:text-4xl">Apmokėjimas</h1>
      </div>

      <CheckoutSignInNote />

      <div className="mt-4 sm:mt-5">
        {hasFailedProducts && <ProductListFailedBox onFocusRefresh={handleFocusRefresh} />}
        {isResolving && !hasFailedProducts && <CheckoutLoadingState />}
        {!isResolving && hasStockProblem && <StockProblemNotice />}
        {!isResolving && !hasStockProblem && (
          <CheckoutForm
            cartLines={cartLines}
            lines={lines}
            itemCount={cartSummary.itemCount}
            subtotal={cartSummary.subtotal}
            deliveryConfig={deliveryConfig}
            paymentMethods={paymentMethods}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutLoadingState = () => (
  <div className="flex flex-col gap-6" aria-busy="true" aria-label="Įkeliama">
    <Skeleton className="h-17 w-full rounded-3xl" />
    <Skeleton className="h-48 w-full rounded-3xl" />
    <Skeleton className="h-64 w-full rounded-3xl" />
  </div>
);

const StockProblemNotice = () => (
  <section
    role="alert"
    className="border-danger-line shadow-card flex flex-col items-start gap-3 rounded-3xl border bg-white p-5 sm:p-6"
  >
    <h2 className="text-ink text-lg font-semibold">Krepšelyje kai kas pasikeitė</h2>
    <p className="text-ink-soft text-base leading-relaxed">
      Kai kurių prekių nebeliko arba liko mažiau, nei pasirinkai. Pakoreguok krepšelį ir grįžk čia.
    </p>
    <Button href="/cart" label="Grįžti į krepšelį" variant="secondary" />
  </section>
);
