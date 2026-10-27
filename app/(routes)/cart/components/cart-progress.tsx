import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { toCurrency } from '@/business/to-currency';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

type Props = {
  freeShippingProgress: number;
  remainingForFreeShipping: number;
};

export const CartProgress = ({ freeShippingProgress, remainingForFreeShipping }: Props) => {
  return (
    <PaperWrapper>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-ink text-lg font-semibold">Nemokamas pristatymas</h2>
        <p className="text-ink-muted text-sm">Nuo {toCurrency(FREE_SHIPPING_THRESHOLD)}</p>
      </div>

      <div
        className="bg-muted mt-4 h-2.5 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={freeShippingProgress}
      >
        <div
          className="bg-tumbleweed-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${freeShippingProgress}%` }}
        />
      </div>

      <p className="text-ink-soft mt-3 text-sm font-medium">
        {remainingForFreeShipping === 0
          ? 'Puiku! Nemokamas pristatymo-informacija jau pritaikytas.'
          : `Pridėk prekių dar už ${toCurrency(remainingForFreeShipping)} ir gausi nemokamą pristatymą.`}
      </p>
    </PaperWrapper>
  );
};
