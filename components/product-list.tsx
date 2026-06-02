import { Product } from '@/actions/types';
import NoResults from '@/components/ui/no-results';
import { ProductCard } from '@/components/ui/product-card/product-card';
import { cn } from '@/lib/utils';

type ProductListVariant = 'grid' | 'rail';

interface Props {
  title?: string;
  items: Product[];
  variant?: ProductListVariant;
  wishlistAction?: 'add' | 'remove';
}

const productListVariantClasses = {
  grid: 'grid-cols-2 gap-3 min-[560px]:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:gap-4',
  rail: 'scrollbar-soft grid-flow-col auto-cols-[calc((100%_-_0.75rem)/2)] gap-3 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch] @md:auto-cols-[minmax(15rem,calc((100%_-_1rem)/2))] @2xl:auto-cols-[minmax(17rem,calc((100%_-_2rem)/3))] @5xl:auto-cols-[minmax(18rem,calc((100%_-_3rem)/4))]',
} satisfies Record<ProductListVariant, string>;

export const ProductList = ({ title, items, variant = 'grid', wishlistAction = 'add' }: Props) => {
  return (
    <div className="@container flex flex-col gap-4">
      {title && <h3 className="text-3xl leading-tight font-bold text-neutral-900 md:text-4xl">{title}</h3>}
      {items.length === 0 && <NoResults />}

      <div className={cn('grid gap-4', productListVariantClasses[variant])}>
        {items.map((item) => (
          <div key={item.id} className={cn('my-1 min-w-0', variant === 'rail' && 'snap-start')}>
            <ProductCard data={item} wishlistAction={wishlistAction} />
          </div>
        ))}
      </div>
    </div>
  );
};
