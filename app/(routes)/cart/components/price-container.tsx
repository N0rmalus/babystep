import { cn } from '@/lib/utils';
import { toCurrency } from '@/business/to-currency';
import { getProductPricing } from '@/business/product-pricing';
import Button from '@/components/ui/button';
import { BadgePercent } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { Product } from '@/actions/types';

type Props = {
  productIds: string[];
  products: Product[];
  subtotal: number;
  shippingPrice: number;
};

export const PriceContainer = ({ productIds, products, subtotal, shippingPrice }: Props) => {
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const discount = isCouponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingPrice - discount;

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
      <div className="border-line space-y-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-ink-muted">Prekės ({productIds.length})</p>
            <div className="font-accent text-ink font-semibold">{toCurrency(subtotal)}</div>
          </div>
          <div className="border-tumbleweed-500 ml-4 border-l border-dotted">
            {products.map((product) => (
              <PriceRow key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-ink-muted">Pristatymas</p>
          <div className={cn('text-ink font-semibold')}>
            {shippingPrice === 0 ? (
              <span className="text-success font-semibold">Nemokamai</span>
            ) : (
              <span>{toCurrency(shippingPrice)}</span>
            )}
          </div>
        </div>

        {isCouponApplied && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-ink-muted">Nuolaida</p>
            <div className={cn('text-success font-semibold')}>-{toCurrency(discount)}</div>
          </div>
        )}
      </div>

      <hr />

      <div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="text-ink-muted">Suma</p>
          <div className="font-accent text-ink text-lg font-semibold">{toCurrency(total)}</div>
        </div>
      </div>

      <div className="border-line bg-muted-soft rounded-2xl border p-3">
        <label htmlFor="coupon" className="text-ink-muted text-xs font-semibold tracking-[0.16em] uppercase">
          Nuolaidos kodas
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input
            id="coupon"
            type="text"
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="BABYSTEP10"
            className="border-line placeholder:text-ink-faint focus:border-ink-faint w-full rounded-lg border bg-white px-3 py-2 text-sm outline-hidden transition"
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

const PriceRow = ({ product }: { product: Product }) => {
  const pricing = getProductPricing(product);

  return (
    <div className="text-ink-muted flex min-w-0 flex-row items-center justify-between gap-3 pl-2 text-xs">
      <span className="min-w-0 wrap-break-word sm:truncate">{product.name}</span>
      <div className="text-ink-muted text-right text-sm sm:shrink-0">
        <span>{toCurrency(pricing.effectivePrice)}</span>
      </div>
    </div>
  );
};
