'use client';

import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import { Product } from '@/actions/types';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { PriceContainer } from '@/app/(routes)/cart/components/price-container';

type Props = {
  productIds: string[];
  products: Product[];
  isResolvingProducts: boolean;
  className?: string;
  freeShippingThreshold: number;
};

type InsufficientStockItem = {
  productId: string;
  requested: number;
  available: number;
};

type CheckoutErrorPayload = {
  message?: string;
  invalidProductIds?: string[];
  insufficientStockItems?: InsufficientStockItem[];
};

export const Summary = ({ productIds, products, isResolvingProducts, freeShippingThreshold }: Props) => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const productNameById = useMemo(() => {
    return new Map(products.map((product) => [product.id, product.name]));
  }, [products]);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Mokėjimas atliktas.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Kažkas nepavyko.');
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    try {
      setIsCheckingOut(true);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds,
      });

      window.location.href = response.data.url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as CheckoutErrorPayload | undefined;
        const invalidProductIds = errorData?.invalidProductIds ?? [];
        const insufficientStockItems = errorData?.insufficientStockItems ?? [];

        if (invalidProductIds.length > 0) {
          const productNames = invalidProductIds.map((productId) => {
            return productNameById.get(productId) ?? `prekė (${productId.slice(0, 8)})`;
          });

          toast.error(`Šios prekės nebegalimos: ${productNames.join(', ')}.`);
          return;
        }

        if (insufficientStockItems.length > 0) {
          const stockDetails = insufficientStockItems.map((item) => {
            const productName = productNameById.get(item.productId) ?? `prekė (${item.productId.slice(0, 8)})`;
            return `${productName} (likutis: ${item.available}, pasirinkta: ${item.requested})`;
          });

          toast.error(`Pasikeitė likučiai: ${stockDetails.join('; ')}.`);
          return;
        }

        if (errorData?.message) {
          toast.error(errorData.message);
          return;
        }
      }

      toast.error('Nepavyko inicijuoti atsiskaitymo. Bandyk dar kartą.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="space-y-4 lg:col-span-5">
      <PaperWrapper>
        <h2 className="text-lg font-semibold text-neutral-900">Užsakymo santrauka</h2>

        <PriceContainer
          productIds={productIds}
          products={products}
          items={items}
          freeShippingThreshold={freeShippingThreshold}
        />

        <Button
          disabled={productIds.length === 0 || isResolvingProducts}
          loading={isCheckingOut}
          label={items.length === 0 ? 'Krepšelis tuščias' : 'Tęsti atsiskaitymą'}
          onClick={onCheckout}
          className="mt-5 rounded-xl"
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
