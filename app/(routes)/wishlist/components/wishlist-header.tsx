import Button from '@/components/ui/button';
import { WishlistShare } from './wishlist-share';

type Props = {
  canAddAllToCart: boolean;
  onAddAllToCart: () => void;
};

export const WishlistHeader = ({ canAddAllToCart, onAddAllToCart }: Props) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
    <h1 className="font-accent text-ink text-3xl leading-tight font-bold text-balance sm:text-4xl">Norai</h1>

    <div className="relative flex flex-wrap items-center gap-2.5">
      <WishlistShare />
      <Button
        label="Viską į krepšelį"
        onClick={onAddAllToCart}
        disabled={!canAddAllToCart}
        className="flex-1 sm:flex-none"
      />
    </div>
  </div>
);
