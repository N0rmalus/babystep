import { Share2, ShoppingCart, Trash2 } from 'lucide-react';

import Button from '@/components/ui/button';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

type Props = {
  savedCount: number;
  inStockCount: number;
  onShare: () => void;
  onClearWishlist: () => void;
  onAddAllToCart: () => void;
  canAddAllToCart: boolean;
};

export const WishlistToolbar = ({
  savedCount,
  inStockCount,
  onShare,
  onClearWishlist,
  onAddAllToCart,
  canAddAllToCart,
}: Props) => {
  return (
    <PaperWrapper className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-lg text-neutral-600">
        <span className="font-bold text-neutral-950">{savedCount}</span> prekės išsaugota ·{' '}
        <span className="font-bold text-neutral-950">{inStockCount}</span> sandėlyje
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm text-neutral-500 transition hover:text-black sm:text-base"
          >
            <Share2 size={18} className="text-tumbleweed-600" />
            Dalintis
          </button>

          <button
            type="button"
            onClick={onClearWishlist}
            className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm text-neutral-500 transition hover:text-black sm:text-base"
          >
            <Trash2 size={18} className="text-tumbleweed-600" />
            Išvalyti viską
          </button>
        </div>

        <Button
          onClick={onAddAllToCart}
          disabled={!canAddAllToCart}
          elementBefore={<ShoppingCart size={18} />}
          label="Viską į krepšelį"
        />
      </div>
    </PaperWrapper>
  );
};
