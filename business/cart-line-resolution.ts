import type { Product, ProductVariant } from '@/actions/types';
import { getProductPricing, type ProductPricing } from '@/business/product-pricing';
import type { CartLine } from '@/lib/cart-lines';

const NAME_LABEL_SEPARATOR = ' – ';

type AttentionLine = {
  line: CartLine;
  product: Product;
  name: string;
};

export type ResolvedCartLine =
  | (AttentionLine & { kind: 'needsChoice' })
  | (AttentionLine & { kind: 'unavailable' })
  | (AttentionLine & { kind: 'soldOut' })
  | {
      kind: 'ok';
      line: CartLine;
      product: Product;
      variant: ProductVariant | null;
      name: string;
      pricing: ProductPricing;
      quantity: number;
      maxQuantity: number;
      isSoldOut: boolean;
      hasInsufficientStock: boolean;
    };

export type OkCartLine = Extract<ResolvedCartLine, { kind: 'ok' }>;

export const isOkLine = (line: ResolvedCartLine): line is OkCartLine => line.kind === 'ok';

type ResolveCartLinesOptions = {
  lines: CartLine[];
  products: Product[];
  now?: Date;
};

export const resolveCartLines = ({
  lines,
  products,
  now = new Date(),
}: ResolveCartLinesOptions): ResolvedCartLine[] => {
  const productById = new Map(products.map((product) => [product.id, product]));

  return lines.flatMap((line) => {
    const product = productById.get(line.productId);

    if (!product) {
      return [];
    }

    return [resolveLine({ line, product, now })];
  });
};

type ResolveLineOptions = {
  line: CartLine;
  product: Product;
  now: Date;
};

const resolveLine = ({ line, product, now }: ResolveLineOptions) => {
  if (!line.variantId && !product.hasOptions) {
    return toOkLine({ line, product, variant: null, now });
  }

  if (!line.variantId && product.variants.length === 0) {
    return { kind: 'soldOut', line, product, name: product.name } satisfies ResolvedCartLine;
  }

  if (!line.variantId) {
    return { kind: 'needsChoice', line, product, name: product.name } satisfies ResolvedCartLine;
  }

  const variant = product.variants.find(({ id }) => id === line.variantId);

  if (!variant) {
    return { kind: 'unavailable', line, product, name: product.name } satisfies ResolvedCartLine;
  }

  return toOkLine({ line, product, variant, now });
};

export type CartTotals = {
  subtotal: number;
  hasLinesNeedingChoice: boolean;
  hasUnavailableLines: boolean;
  hasSoldOutLines: boolean;
  hasInsufficientStock: boolean;
  isCheckoutBlocked: boolean;
};

export const getCartTotals = (lines: ResolvedCartLine[]): CartTotals => {
  const subtotal = lines.reduce((total, line) => {
    return line.kind === 'ok' ? total + line.pricing.effectivePrice * line.quantity : total;
  }, 0);

  const hasLinesNeedingChoice = lines.some(({ kind }) => kind === 'needsChoice');
  const hasUnavailableLines = lines.some(({ kind }) => kind === 'unavailable');
  const hasSoldOutLines = lines.some((line) => line.kind === 'soldOut' || (line.kind === 'ok' && line.isSoldOut));
  const hasInsufficientStock = lines.some((line) => line.kind === 'ok' && line.hasInsufficientStock);

  return {
    subtotal,
    hasLinesNeedingChoice,
    hasUnavailableLines,
    hasSoldOutLines,
    hasInsufficientStock,
    isCheckoutBlocked: hasLinesNeedingChoice || hasUnavailableLines || hasSoldOutLines || hasInsufficientStock,
  };
};

type OkLineOptions = {
  line: CartLine;
  product: Product;
  variant: ProductVariant | null;
  now: Date;
};

const toOkLine = ({ line, product, variant, now }: OkLineOptions) => {
  const stockCount = variant?.stockCount ?? product.stockCount;
  const isSoldOut = stockCount <= 0;

  return {
    kind: 'ok' as const,
    line,
    product,
    variant,
    name: variant ? `${product.name}${NAME_LABEL_SEPARATOR}${variant.label}` : product.name,
    pricing: getProductPricing(
      variant
        ? {
            price: variant.price,
            salePrice: variant.salePrice,
            saleStartsAt: product.saleStartsAt,
            saleEndsAt: product.saleEndsAt,
          }
        : product,
      now,
    ),
    quantity: line.quantity,
    maxQuantity: stockCount,
    isSoldOut,
    hasInsufficientStock: !isSoldOut && line.quantity > stockCount,
  };
};
