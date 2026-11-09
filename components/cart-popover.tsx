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
import { ArrowRight, ShoppingCart, Truck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { toCurrency } from '@/business/to-currency';
import { CartCountBadge } from '@/components/navbar/cart-count-badge';
import { CartPopoverLine } from '@/components/cart-popover-line';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { getCartLineKey, getCartProductIds } from '@/lib/cart-lines';
import { useCartSummary } from '@/hooks/use-cart-summary';
import useResolvedProducts from '@/hooks/use-resolved-products';
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
  const lines = useCart((state) => state.items);
  const productIdsKey = getCartProductIds(lines).join(',');

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const { products, failedProductIds, isLoading } = useResolvedProducts(
    useMemo(() => {
      return isOpen && productIdsKey ? productIdsKey.split(',') : [];
    }, [isOpen, productIdsKey]),
  );

  const {
    resolvedLines,
    itemCount,
    subtotal,
    remainingForFreeShipping,
    freeShippingProgress,
    hasFreeShipping,
    hasLinesNeedingChoice,
    hasUnavailableLines,
    hasSoldOutLines,
    hasInsufficientStock,
    isCheckoutDisabled,
  } = useCartSummary({
    lines,
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
    duration: { open: 170, close: 130 },
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
        href="/cart"
        linkRef={setReference}
        variant="secondary"
        elementBefore={<ShoppingCart size={16} className={cn(isInCartPage && 'fill-tumbleweed-300')} />}
        elementAfter={<CartCountBadge />}
        label="Krepšelis"
        size="sm"
        className="h-11"
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
                className="scrollbar-soft border-line overflow-hidden rounded-3xl border bg-white shadow-xl"
              >
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <h2 className="text-ink text-xl font-semibold">Tavo krepšelis</h2>
                    <p className="text-ink-muted mt-1 text-sm">{getCartCountLabel(itemCount)}</p>
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

                {itemCount > 0 && (
                  <div className="bg-tumbleweed-50/70 border-line border-y px-5 py-3.5">
                    <div className="text-ink-soft flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm">
                      <Truck className="text-success" size={16} aria-hidden="true" />
                      <span>Nemokamas pristatymas</span>
                      {!hasFreeShipping && (
                        <strong className="text-ink">liko {toCurrency(remainingForFreeShipping)}</strong>
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
                  {itemCount === 0 && (
                    <div className="px-5 py-9 text-center">
                      <p className="text-ink-muted mt-2 text-sm">Krepšelis tuščias</p>
                    </div>
                  )}

                  {itemCount > 0 && isLoading && (
                    <div className="space-y-3 px-5 py-4">
                      {[0, 1].map((item) => (
                        <div key={item} className="flex animate-pulse items-center gap-4">
                          <div className="bg-muted size-16 rounded-2xl" />
                          <div className="flex-1 space-y-2">
                            <div className="bg-muted h-4 w-3/4 rounded-full" />
                            <div className="bg-muted h-3 w-1/2 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {failedProductIds.length > 0 && !isLoading && (
                    <div className="text-danger px-5 py-5 text-sm sm:px-6">
                      Nepavyko atnaujinti krepšelio prekių. Atidaryk pilną krepšelį arba bandyk dar kartą.
                    </div>
                  )}

                  {!isLoading &&
                    resolvedLines.map((resolvedLine, index) => (
                      <CartPopoverLine
                        key={getCartLineKey(resolvedLine.line)}
                        resolvedLine={resolvedLine}
                        hasDivider={index > 0}
                        onNavigate={handleNavigate}
                      />
                    ))}
                </div>

                <div className="border-line border-t p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-ink-muted text-sm">Suma</p>
                    <p className="text-ink text-2xl font-bold tabular-nums">{toCurrency(subtotal)}</p>
                  </div>

                  {hasLinesNeedingChoice && (
                    <div className="text-danger flex pb-3 text-sm">
                      <p>Kai kurioms prekėms dar nepasirinkai savybių. Pasirink jas prieš tęsiant apmokėjimą.</p>
                    </div>
                  )}

                  {hasUnavailableLines && (
                    <div className="text-danger flex pb-3 text-sm">
                      <p>Kai kurie pasirinkimai nebegalimi, pašalink juos prieš tęsiant apmokėjimą.</p>
                    </div>
                  )}

                  {hasSoldOutLines && (
                    <div className="text-danger flex pb-3 text-sm">
                      <p>Kai kurių prekių nebeliko, pašalink prieš tęsiant apmokėjimą.</p>
                    </div>
                  )}

                  {hasInsufficientStock && (
                    <div className="text-danger flex pb-3 text-sm">
                      <p>Kai kurių prekių liko mažiau, nei pasirinkai. Sumažink kiekį krepšelyje.</p>
                    </div>
                  )}

                  {isCheckoutDisabled ? (
                    <Button
                      label="Pereiti prie apmokėjimo"
                      elementAfter={<ArrowRight size={18} />}
                      onClick={() => {}}
                      disabled
                      fullWidth
                      className="py-3.5 text-base"
                    />
                  ) : (
                    <Button
                      href="/apmokejimas"
                      label="Pereiti prie apmokėjimo"
                      elementAfter={<ArrowRight size={18} />}
                      onClick={() => setIsOpen(false)}
                      fullWidth
                      className="py-3.5 text-base"
                    />
                  )}
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
