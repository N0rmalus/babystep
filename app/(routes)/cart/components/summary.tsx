'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import type { Product } from '@/actions/types';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { PriceContainer } from '@/app/(routes)/cart/components/price-container';
import type { CartSummary } from '@/hooks/use-cart-summary';
import { cn } from '@/lib/utils';

type Props = {
  productIds: string[];
  products: Product[];
  cartSummary: CartSummary;
  className?: string;
};

export const Summary = ({ productIds, products, cartSummary, className }: Props) => {
  const searchParams = useSearchParams();
  const removeAll = useCart((state) => state.removeAll);
  const { hasOutOfStockProducts, isCheckoutDisabled, isCheckingOut, onCheckout, shippingPrice, subtotal } = cartSummary;

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Mokėjimas atliktas.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Kažkas nepavyko.');
    }
  }, [searchParams, removeAll]);

  return (
    <div className={cn('space-y-4 lg:col-span-5', className)}>
      <PaperWrapper>
        <h2 className="text-lg font-semibold text-neutral-900">Užsakymo santrauka</h2>

        <PriceContainer productIds={productIds} products={products} subtotal={subtotal} shippingPrice={shippingPrice} />

        {hasOutOfStockProducts && (
          <div className="flex py-3 text-sm text-rose-700">
            <p>Kai kurių prekių nebeliko, pašalink prieš tęsiant apmokėjimą.</p>
          </div>
        )}

        <Button
          disabled={isCheckoutDisabled}
          loading={isCheckingOut}
          label="Pereiti į apmokėjimą"
          elementAfter={<ArrowRight size={18} />}
          onClick={onCheckout}
          className="rounded-xl"
          fullWidth
        />

        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-500">
          <Lock size={14} />
          Mokėjimo duomenys perduodami saugiu kanalu.
        </p>
      </PaperWrapper>

      <PaperWrapper>
        <h3 className="text-sm font-semibold tracking-[0.16em] text-neutral-500 uppercase">Reikia pagalbos?</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          Jei turi klausimų dėl užsakymo, parašyk mums. Įprastai atsakome per 1 darbo valandą.
        </p>
        <a
          href="mailto:info@babystep.lt"
          className="mt-4 inline-flex text-sm font-semibold text-neutral-900 hover:underline"
        >
          info@babystep.lt
        </a>
      </PaperWrapper>
    </div>
  );
};
