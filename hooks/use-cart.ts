import toast from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const normalizeProductIds = (items: unknown) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const productIds = items
    .map((item) => {
      if (typeof item === 'string') {
        return item.trim();
      }

      if (item && typeof item === 'object' && 'id' in item) {
        const id = (item as { id?: unknown }).id;

        if (typeof id === 'string') {
          return id.trim();
        }
      }

      return '';
    })
    .filter(Boolean);

  return Array.from(new Set(productIds));
};

interface CartStore {
  items: string[];
  addItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
  removeItem: (id: string) => void;
  setItems: (items: string[]) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (productId: string) => {
        const normalizedProductId = productId.trim();

        if (!normalizedProductId) {
          return;
        }

        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item === normalizedProductId);

        if (existingItem) {
          return toast('Prekė jau įtraukta į krepšelį.');
        }

        set({ items: [...currentItems, normalizedProductId] });
        toast.success('Prekė pridėta į krepšelį.');
      },
      hasItem: (productId: string) => get().items.includes(productId),
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item !== id)] });
        toast.success('Prekė pašalinta iš krepšelio.');
      },
      setItems: (items: string[]) => {
        set({ items: normalizeProductIds(items) });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as { items?: unknown } | undefined;

        return {
          items: normalizeProductIds(state?.items),
        };
      },
    },
  ),
);

export default useCart;
