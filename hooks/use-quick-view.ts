import { create } from 'zustand';
import { Product } from '@/actions/types';

type QuickViewStore = {
  isOpen: boolean;
  product?: Product;
  onOpen: (product: Product) => void;
  onClose: () => void;
};

const useQuickView = create<QuickViewStore>((set) => ({
  isOpen: false,
  product: undefined,
  onOpen: (product) => set({ product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useQuickView;
