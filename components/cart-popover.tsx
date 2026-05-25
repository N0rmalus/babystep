'use client';

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  size,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import { ArrowRight, ShoppingBag, Trash2, Truck } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { toCurrency } from '@/business/to-currency';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { useCartSummary } from '@/hooks/use-cart-summary';
import useResolvedProducts from '@/hooks/use-resolved-products';
import { getImageUrl } from '@/lib/image-url';
import { cn } from '@/lib/utils';

const getCartCountLabel = (count: number) => {
  if (count === 0) {
    return '0 prekių';
  }

  if (count === 1) {
    return '1 prekė';
  }

  if (count > 9 && count < 20) {
    return `${count} prekių`;
  }

  const lastDigit = count % 10;

  return lastDigit === 0 ? `${count} prekių` : `${count} prekės`;
};

export const CartPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isInCartPage = usePathname().includes('/cart');
  const itemIds = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);

  const { products, failedProductIds, isLoading } = useResolvedProducts(
    useMemo(() => {
      return isOpen ? itemIds : [];
    }, [isOpen, itemIds]),
  );

  const {
    subtotal,
    remainingForFreeShipping,
    freeShippingProgress,
    hasFreeShipping,
    hasOutOfStockProducts,
    isCheckoutDisabled,
    isCheckingOut,
    onCheckout,
  } = useCartSummary({
    productIds: itemIds,
    products,
    isLoading,
    failedProductIds,
  });

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(14),
      flip({ padding: 12 }),
      shift({ padding: 12 }),
      size({
        padding: 12,
        apply({ availableHeight, availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.min(availableHeight, 760)}px`,
            maxWidth: `${Math.min(availableWidth, 480)}px`,
          });
        },
      }),
    ],
  });

  const hover = useHover(context, {
    move: false,
    delay: { open: 80, close: 300 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: { open: 180, close: 150 },
    common: {
      transformOrigin: 'top right',
    },
    initial: {
      opacity: 0,
      transform: 'translateY(-8px) scale(0.98)',
    },
    open: {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    close: {
      opacity: 0,
      transform: 'translateY(-6px) scale(0.98)',
    },
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getFloatingProps } = useInteractions([hover, dismiss, role]);
  const { setReference, setFloating } = refs;

  return (
    <>
      <Button
        buttonRef={setReference}
        variant="secondary"
        elementBefore={<ShoppingBag size={18} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
        elementAfter={
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-semibold text-white xl:h-6 xl:min-w-6 xl:px-1.5">
            {itemIds.length}
          </span>
        }
        label={<span className="hidden xl:inline">Krepšelis</span>}
        size="sm"
        aria-label="Krepšelis"
        className="relative flex h-10 w-auto shrink-0 items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-0 text-neutral-700 transition hover:border-neutral-300 hover:bg-white hover:text-black xl:h-auto xl:px-4 xl:py-2"
        onClick={() => router.push('/cart')}
      />

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <div
              ref={setFloating}
              style={floatingStyles}
              className="z-50 w-[calc(100vw-1rem)] outline-none sm:w-md"
              {...getFloatingProps()}
            >
              <div
                style={transitionStyles}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl"
              >
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <h2 className="font-accent text-2xl font-black text-neutral-900">Tavo krepšelis</h2>
                    <p className="mt-1 text-sm text-neutral-500">{getCartCountLabel(itemIds.length)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      router.push('/cart');
                    }}
                    className="bg-tumbleweed-50 text-tumbleweed-900 hover:bg-tumbleweed-100 inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition"
                  >
                    Peržiūrėti
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>

                {itemIds.length > 0 && (
                  <div className="bg-tumbleweed-50/70 border-y border-neutral-200 px-5 py-3.5">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-neutral-800">
                      <Truck className="text-emerald-700" size={16} aria-hidden="true" />
                      <span>Nemokamas pristatymas</span>
                      {!hasFreeShipping && (
                        <strong className="text-neutral-950">liko {toCurrency(remainingForFreeShipping)}</strong>
                      )}
                    </div>
                    <div className="bg-tumbleweed-100 mt-3 h-1.5 overflow-hidden rounded-full">
                      <div
                        className="bg-tumbleweed-500 h-full rounded-full transition-all"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="max-h-[min(44vh,21rem)] overflow-y-auto">
                  {itemIds.length === 0 && (
                    <div className="px-5 py-9 text-center">
                      <p className="font-accent text-xl font-bold text-neutral-900">Krepšelis tuščias</p>
                      <p className="mt-2 text-sm text-neutral-500">Įsidėk patikusias prekes ir jos atsiras čia.</p>
                    </div>
                  )}

                  {itemIds.length > 0 && isLoading && (
                    <div className="space-y-3 px-5 py-4">
                      {[0, 1].map((item) => (
                        <div key={item} className="flex animate-pulse items-center gap-4">
                          <div className="size-16 rounded-2xl bg-neutral-100" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded-full bg-neutral-100" />
                            <div className="h-3 w-1/2 rounded-full bg-neutral-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {failedProductIds.length > 0 && !isLoading && (
                    <div className="px-5 py-5 text-sm text-rose-600 sm:px-6">
                      Nepavyko atnaujinti krepšelio prekių. Atidaryk pilną krepšelį arba bandyk dar kartą.
                    </div>
                  )}

                  {!isLoading &&
                    products.map((product, index) => {
                      const isOutOfStock = product.amountInStock <= 0;

                      return (
                        <div
                          key={product.id}
                          className={cn(
                            'hover:bg-tumbleweed-50/80 mx-3 my-1.5 flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors',
                            index > 0 && 'border-t border-dashed border-neutral-200',
                            isOutOfStock && 'bg-rose-50/70 opacity-75 hover:bg-rose-50',
                          )}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                              router.push(`/product/${product.id}`);
                            }}
                            className="grid min-w-0 flex-1 grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 text-left"
                          >
                            <span className="relative size-14 overflow-hidden rounded-xl bg-neutral-100">
                              <Image
                                src={getImageUrl(product.images?.at(0)?.url)}
                                alt={product.name}
                                fill
                                className={cn('object-cover', isOutOfStock && 'grayscale')}
                                sizes="72px"
                              />
                            </span>

                            <span className="min-w-0">
                              <span className="line-clamp-2 text-sm leading-tight font-bold text-neutral-900">
                                {product.name}
                              </span>
                              <span className="mt-1 block truncate text-xs text-neutral-500">
                                {product.subcategory?.category?.name ?? 'Kategorija'} ·{' '}
                                {product.subcategory?.name ?? 'Subkategorija'}
                              </span>
                              <span
                                className={cn(
                                  'mt-2 block text-xs',
                                  isOutOfStock ? 'font-semibold text-rose-600' : 'text-neutral-500',
                                )}
                              >
                                {isOutOfStock ? 'Išparduota' : `1 × ${toCurrency(Number(product.price))}`}
                              </span>
                            </span>
                          </button>

                          <div className="flex shrink-0 flex-col items-end gap-4">
                            <span className="font-accent text-base font-black text-neutral-900">
                              {toCurrency(Number(product.price))}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(product.id)}
                              className="text-rose-500 transition hover:text-rose-600"
                              aria-label={`Pašalinti ${product.name} iš krepšelio`}
                            >
                              <Trash2 size={18} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="border-t border-neutral-200 p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">Suma</p>
                    <p className="font-accent text-2xl font-black text-neutral-900">{toCurrency(subtotal)}</p>
                  </div>

                  {hasOutOfStockProducts && (
                    <div className="flex pb-3 text-sm text-rose-700">
                      <p>Kai kurių prekių nebeliko, pašalink prieš tęsiant apmokėjimą.</p>
                    </div>
                  )}

                  <Button
                    label="Pereiti į apmokėjimą"
                    elementAfter={<ArrowRight size={18} />}
                    onClick={onCheckout}
                    loading={isCheckingOut}
                    disabled={isCheckoutDisabled}
                    fullWidth
                    className="rounded-full py-3.5 text-base"
                  />
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
