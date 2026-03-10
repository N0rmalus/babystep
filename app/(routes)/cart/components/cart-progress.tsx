import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { toCurrency } from '@/business/to-currency';

type Props = {
  subtotal: number;
  freeShippingThreshold: number;
};

export const CartProgress = ({ subtotal, freeShippingThreshold }: Props) => {
  const normalizedSubtotal = Math.max(subtotal, 0);
  const progress = Math.min((normalizedSubtotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - normalizedSubtotal, 0);

  return (
    <PaperWrapper>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">Privalumai</h2>
        <p className="text-sm text-neutral-600">Nemokamas pristatymas nuo {toCurrency(freeShippingThreshold)}</p>
      </div>

      <div
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-neutral-100"
        role="progressbar"
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-tumbleweed-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-sm font-medium text-neutral-700">
        {remaining === 0
          ? 'Puiku! Nemokamas pristatymas jau pritaikytas.'
          : `Pridėk prekių dar už ${toCurrency(remaining)} ir gausi nemokamą pristatymą.`}
      </p>
    </PaperWrapper>
  );
};
