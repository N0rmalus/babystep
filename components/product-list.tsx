import { Product } from '@/actions/types';
import NoResults from '@/components/ui/no-results';
import { ProductCard } from '@/components/ui/product-card/product-card';

interface Props {
  title: string;
  items: Product[];
}

export const ProductList = ({ title, items }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl leading-tight font-bold text-neutral-900 md:text-4xl">{title}</h3>
      {items.length === 0 && <NoResults />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
