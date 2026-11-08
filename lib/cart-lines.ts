export type CartLine = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type CartLineKey = Pick<CartLine, 'productId' | 'variantId'>;

export const isSameLine = (line: CartLineKey, key: CartLineKey): boolean => {
  return line.productId === key.productId && line.variantId === key.variantId;
};

export const toCartLineKey = ({ productId, variantId }: CartLineKey): CartLineKey | null => {
  const normalizedProductId = productId.trim();
  const normalizedVariantId = variantId?.trim();

  if (!normalizedProductId) {
    return null;
  }

  return normalizedVariantId
    ? { productId: normalizedProductId, variantId: normalizedVariantId }
    : { productId: normalizedProductId };
};

export const getCartProductIds = (lines: CartLine[]): string[] => {
  return [...new Set(lines.map((line) => line.productId))];
};

export const normalizeCartLines = (items: unknown): CartLine[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.reduce<CartLine[]>((lines, item) => {
    const line = toCartLine(item);

    if (!line) {
      return lines;
    }

    if (!lines.some((current) => isSameLine(current, line))) {
      return [...lines, line];
    }

    return lines.map((current) =>
      isSameLine(current, line) ? { ...current, quantity: current.quantity + line.quantity } : current,
    );
  }, []);
};

const toCartLine = (item: unknown) => {
  if (typeof item === 'string') {
    const key = toCartLineKey({ productId: item });

    return key ? { ...key, quantity: 1 } : null;
  }

  if (!isRecord(item)) {
    return null;
  }

  const productId = typeof item.productId === 'string' ? item.productId : item.id;

  if (typeof productId !== 'string') {
    return null;
  }

  const variantId = typeof item.variantId === 'string' ? item.variantId : undefined;
  const key = toCartLineKey({ productId, variantId });

  if (!key) {
    return null;
  }

  const quantity = typeof item.quantity === 'number' && item.quantity >= 1 ? Math.floor(item.quantity) : 1;

  return { ...key, quantity };
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};
