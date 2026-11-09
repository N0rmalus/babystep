import toast from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type CartLine, type CartLineKey, isSameLine, normalizeCartLines, toCartLineKey } from '@/lib/cart-lines';

export type { CartLine, CartLineKey };

type AddItemOptions = CartLineKey & {
  quantity?: number;
  maxQuantity: number;
};

type SetQuantityOptions = CartLineKey & {
  quantity: number;
  maxQuantity: number;
};

type CartStore = {
  items: CartLine[];
  addItem: (options: AddItemOptions) => void;
  addItems: (productIds: string[]) => void;
  setQuantity: (options: SetQuantityOptions) => void;
  removeItem: (key: CartLineKey) => void;
  removeItems: (productIds: string[]) => void;
  removeAll: () => void;
};

const CART_STORAGE_VERSION = 4;

const upsertLine = (items: CartLine[], line: CartLine) => {
  if (!items.some((item) => isSameLine(item, line))) {
    return [...items, line];
  }

  return items.map((item) => (isSameLine(item, line) ? { ...item, quantity: line.quantity } : item));
};

const getPersistedItems = (persistedState: unknown) => {
  if (typeof persistedState !== 'object' || persistedState === null || !('items' in persistedState)) {
    return [];
  }

  return persistedState.items;
};

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: ({ quantity = 1, maxQuantity, ...key }) => {
        const lineKey = toCartLineKey(key);

        if (!lineKey || quantity < 1 || maxQuantity < 1) {
          return;
        }

        const currentItems = get().items;
        const existingQuantity = currentItems.find((item) => isSameLine(item, lineKey))?.quantity ?? 0;
        const nextQuantity = Math.min(existingQuantity + quantity, maxQuantity);

        if (nextQuantity === existingQuantity) {
          toast('Daugiau šios prekės sandėlyje nėra.');
          return;
        }

        set({ items: upsertLine(currentItems, { ...lineKey, quantity: nextQuantity }) });

        if (nextQuantity < existingQuantity + quantity) {
          toast(`Krepšelyje dabar ${nextQuantity} vnt., daugiau sandėlyje nėra.`);
          return;
        }

        toast.success('Prekė pridėta į krepšelį.');
      },
      addItems: (productIds) => {
        const currentItems = get().items;
        const newLines = productIds
          .filter((productId) => !currentItems.some((item) => isSameLine(item, { productId })))
          .map((productId) => ({ productId, quantity: 1 }));

        set({ items: [...currentItems, ...newLines] });
      },
      setQuantity: ({ quantity, maxQuantity, ...key }) => {
        const lineKey = toCartLineKey(key);

        if (!lineKey) {
          return;
        }

        const nextQuantity = Math.min(Math.max(quantity, 1), Math.max(maxQuantity, 1));

        set({
          items: get().items.map((item) => (isSameLine(item, lineKey) ? { ...item, quantity: nextQuantity } : item)),
        });
      },
      removeItem: (key) => {
        const lineKey = toCartLineKey(key);

        if (!lineKey) {
          return;
        }

        set({ items: get().items.filter((item) => !isSameLine(item, lineKey)) });
        toast.success('Prekė pašalinta iš krepšelio.');
      },
      removeItems: (productIds) => {
        const productIdSet = new Set(productIds);

        set({ items: get().items.filter((item) => !productIdSet.has(item.productId)) });
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: CART_STORAGE_VERSION,
      migrate: (persistedState) => ({ items: normalizeCartLines(getPersistedItems(persistedState)) }),
    },
  ),
);

export const selectCartItemCount = (state: CartStore) => getCartItemCount(state.items);

export const getCartItemCount = (items: CartLine[]) => items.reduce((total, item) => total + item.quantity, 0);

export default useCart;
