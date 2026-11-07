import { toCurrency } from '@/business/to-currency';
import { CheckoutLinkButton } from './checkout-link-button';

type Props = {
  total: number;
  isDisabled: boolean;
};

export const MobileCheckoutBar = ({ total, isDisabled }: Props) => (
  <div className="border-line bg-canvas shadow-bar sticky bottom-0 z-20 flex items-center gap-3 border-t px-4 pt-3 pb-4 lg:hidden">
    <div className="flex shrink-0 flex-col">
      <span className="text-ink-muted text-xs">Iš viso</span>
      <span className="text-ink text-lg font-bold tabular-nums">{toCurrency(total)}</span>
    </div>
    <div className="min-w-0 flex-1">
      <CheckoutLinkButton isDisabled={isDisabled} hasIcon={false} />
    </div>
  </div>
);
