import toast from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartLine = {
  productId: string;
  variantId?: string;
  quantity: number;
};

type AddItemOptions = {
  productId: string;
  quantity?: number;
  maxQuantity: number;
};

type SetQuantityOptions = {
  productId: string;
  quantity: number;
  maxQuantity: number;
};

type CartStore = {
  items: CartLine[];
  addItem: (options: AddItemOptions) => void;
  addItems: (productIds: string[]) => void;
  setQuantity: (options: SetQuantityOptions) => void;
  removeItem: (productId: string) => void;
  removeItems: (productIds: string[]) => void;
  removeAll: () => void;
};

const CART_STORAGE_VERSION = 3;

const upsertLine = (items: CartLine[], line: CartLine) => {
  if (!items.some((item) => item.productId === line.productId)) {
    return [...items, line];
  }

  return items.map((item) => (item.productId === line.productId ? { ...item, quantity: line.quantity } : item));
};

const getPersistedItems = (persistedState: unknown) => {
  if (!isRecord(persistedState)) {
    return [];
  }

  return persistedState.items;
};

const normalizeCartLines = (items: unknown) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.reduce<CartLine[]>((lines, item) => {
    const line = toCartLine(item);

    if (!line) {
      return lines;
    }

    const existingLine = lines.find((current) => current.productId === line.productId);

    if (!existingLine) {
      return [...lines, line];
    }

    return upsertLine(lines, { ...existingLine, quantity: existingLine.quantity + line.quantity });
  }, []);
};

const toCartLine = (item: unknown): CartLine | null => {
  if (typeof item === 'string') {
    const productId = item.trim();

    return productId ? { productId, quantity: 1 } : null;
  }

  if (!isRecord(item)) {
    return null;
  }

  const productId = typeof item.productId === 'string' ? item.productId : item.id;

  if (typeof productId !== 'string' || !productId.trim()) {
    return null;
  }

  const quantity = typeof item.quantity === 'number' && item.quantity >= 1 ? Math.floor(item.quantity) : 1;
  const variantId = typeof item.variantId === 'string' ? item.variantId : undefined;

  return variantId ? { productId: productId.trim(), variantId, quantity } : { productId: productId.trim(), quantity };
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: ({ productId, quantity = 1, maxQuantity }) => {
        const normalizedProductId = productId.trim();

        if (!normalizedProductId || quantity < 1 || maxQuantity < 1) {
          return;
        }

        const currentItems = get().items;
        const existingQuantity = currentItems.find((item) => item.productId === normalizedProductId)?.quantity ?? 0;
        const nextQuantity = Math.min(existingQuantity + quantity, maxQuantity);

        if (nextQuantity === existingQuantity) {
          toast('Daugiau šios prekės sandėlyje nėra.');
          return;
        }

        set({ items: upsertLine(currentItems, { productId: normalizedProductId, quantity: nextQuantity }) });

        if (nextQuantity < existingQuantity + quantity) {
          toast(`Krepšelyje dabar ${nextQuantity} vnt., daugiau sandėlyje nėra.`);
          return;
        }

        toast.success('Prekė pridėta į krepšelį.');
      },
      addItems: (productIds) => {
        const currentItems = get().items;
        const newLines = productIds
          .filter((productId) => !currentItems.some((item) => item.productId === productId))
          .map((productId) => ({ productId, quantity: 1 }));

        set({ items: [...currentItems, ...newLines] });
      },
      setQuantity: ({ productId, quantity, maxQuantity }) => {
        const nextQuantity = Math.min(Math.max(quantity, 1), Math.max(maxQuantity, 1));

        set({
          items: get().items.map((item) => (item.productId === productId ? { ...item, quantity: nextQuantity } : item)),
        });
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) });
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

export const getCheckoutProductIds = (items: CartLine[]) =>
  items.flatMap((item) => Array.from({ length: item.quantity }, () => item.productId));

export default useCart;
