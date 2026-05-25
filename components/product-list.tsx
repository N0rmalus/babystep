import { Product } from '@/actions/types';
import NoResults from '@/components/ui/no-results';
import { ProductCard } from '@/components/ui/product-card/product-card';
import { cn } from '@/lib/utils';

type ProductListVariant = 'grid' | 'rail';

interface Props {
  title?: string;
  items: Product[];
  variant?: ProductListVariant;
}

const productListVariantClasses = {
  grid: 'grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))]',
  rail: 'scrollbar-soft grid-flow-col auto-cols-[100%] snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch] @sm:auto-cols-[minmax(15rem,calc(50%_-_0.5rem))] @2xl:auto-cols-[minmax(17rem,calc(33.333%_-_0.667rem))] @4xl:auto-cols-[minmax(18.5rem,calc(25%_-_0.75rem))] @5xl:auto-cols-[minmax(18.5rem,calc(25%_-_0.75rem))]',
} satisfies Record<ProductListVariant, string>;

export const ProductList = ({ title, items, variant = 'grid' }: Props) => {
  return (
    <div className="@container flex flex-col gap-4">
      {title && <h3 className="text-3xl leading-tight font-bold text-neutral-900 md:text-4xl">{title}</h3>}
      {items.length === 0 && <NoResults />}

      <div className={cn('grid gap-4', productListVariantClasses[variant])}>
        {items.map((item) => (
          <div key={item.id} className={cn('my-1 min-w-0', variant === 'rail' && 'snap-start')}>
            <ProductCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
