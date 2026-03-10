import { cn } from '@/lib/utils';
import { toCurrency } from '@/business/to-currency';
import Button from '@/components/ui/button';
import { BadgePercent } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMemo, useState } from 'react';
import { Product } from '@/actions/types';

type Props = {
  productIds: string[];
  products: Product[];
  items: string[];
  freeShippingThreshold: number;
};

export const PriceContainer = ({ productIds, products, items, freeShippingThreshold }: Props) => {
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const subtotal = useMemo(() => {
    return products.reduce((total, product) => total + Number(product.price), 0);
  }, [products]);

  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const estimatedTax = subtotal * 0.21;

  const shippingPrice = useMemo(() => {
    if (items.length === 0) {
      return 0;
    }

    return subtotal >= freeShippingThreshold ? 0 : 4.99;
  }, [freeShippingThreshold, items.length, subtotal]);

  const total = subtotal + shippingPrice + estimatedTax - discount;

  const onApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();

    if (!normalizedCode) {
      toast('Įvesk nuolaidos kodą.');
      return;
    }

    if (normalizedCode !== 'BABYSTEP10') {
      setIsCouponApplied(false);
      toast.error('Šis kodas šiuo metu negalioja.');
      return;
    }

    setIsCouponApplied(true);
    toast.success('Nuolaida pritaikyta.');
  };

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="space-y-3 border-neutral-200">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-neutral-600">Prekės ({productIds.length})</p>
            <div className={cn('font-semibold text-neutral-900')}>{toCurrency(subtotal)}</div>
          </div>
          <div className="ml-4 border-l border-dotted border-tumbleweed-500">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex min-w-0 flex-row items-center justify-between gap-3 pl-2 text-xs text-neutral-600"
              >
                <span className="min-w-0 break-words sm:truncate">{product.name}</span>
                <div className="text-sm text-neutral-600 sm:shrink-0">{toCurrency(Number(product.price))}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-neutral-600">Pristatymas</p>
          <div className={cn('font-semibold text-neutral-900')}>
            {shippingPrice === 0 ? (
              <span className="font-semibold text-emerald-700">Nemokamai</span>
            ) : (
              <span>{toCurrency(shippingPrice)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-neutral-600">PVM (21%)</p>
          <div className={cn('font-semibold text-neutral-900')}>{toCurrency(estimatedTax)}</div>
        </div>

        {isCouponApplied && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-neutral-600">Nuolaida</p>
            <div className={cn('font-semibold text-emerald-700')}>-{toCurrency(discount)}</div>
          </div>
        )}
      </div>

      <hr />

      <div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-neutral-600">Mokėtina suma</p>
          <div className={cn('text-lg font-semibold text-neutral-900')}>{toCurrency(total)}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
        <label htmlFor="coupon" className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Nuolaidos kodas
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="coupon"
            type="text"
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="BABYSTEP10"
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-400"
          />
          <Button
            size="sm"
            variant="secondary"
            label="Taikyti"
            onClick={onApplyCoupon}
            elementBefore={<BadgePercent size={15} />}
            className="rounded-lg sm:w-auto"
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};
