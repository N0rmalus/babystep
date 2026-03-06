'use client';

import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Product } from '@/actions/types';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';

interface SummaryProps {
  productIds: string[];
  products: Product[];
  isResolvingProducts: boolean;
}

const Summary: React.FC<SummaryProps> = ({ productIds, products, isResolvingProducts }) => {
  const searchParams = useSearchParams();
  const removeAll = useCart((state) => state.removeAll);

  const totalPrice = products.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds,
      });

      window.location.href = response.data.url;
    } catch {
      toast.error('Nepavyko pradėti atsiskaitymo. Patikrinkite krepšelio prekes.');
    }
  };

  return (
    <div className="mt-16 rounded-lg border border-gray-200 bg-white px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900"> Užsakymo santrauka </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Bendra kaina</div>
          <span className="text-tumbleweed-300">
            <Currency value={totalPrice} />
          </span>
        </div>
      </div>
      {productIds.length > 0 && isResolvingProducts && (
        <p className="mt-3 text-sm text-neutral-500">Atnaujinama krepšelio informacija...</p>
      )}
      <Button
        disabled={productIds.length === 0 || isResolvingProducts}
        label="Atsiskaitymas"
        onClick={onCheckout}
        className="mt-6"
        fullWidth
      />
    </div>
  );
};

export default Summary;
