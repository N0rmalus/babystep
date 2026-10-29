import { ReactNode } from 'react';

export const WISHLIST_GRID_CLASSES =
  'grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-7 sm:gap-y-10 min-[800px]:grid-cols-3 min-[1100px]:grid-cols-4';

type Props = {
  children: ReactNode;
};

export const WishlistGrid = ({ children }: Props) => <div className={WISHLIST_GRID_CLASSES}>{children}</div>;
