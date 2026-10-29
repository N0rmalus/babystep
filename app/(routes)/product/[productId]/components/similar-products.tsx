import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { Product } from '@/actions/types';
import { ProductCard } from '@/components/ui/product-card/product-card';

type Props = {
  products: Product[];
  href: string;
};

export const SimilarProducts = ({ products, href }: Props) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="similar-title" className="bg-muted border-line mt-10 border-t lg:mt-0">
      <div className="lg:px-gutter mx-auto w-full max-w-7xl py-9 lg:pt-16 lg:pb-22">
        <div className="px-gutter mb-4 flex items-end justify-between gap-6 lg:mb-6 lg:px-0">
          <h2 id="similar-title" className="font-accent text-3xl leading-tight font-bold text-balance sm:text-4xl">
            Panašios prekės
          </h2>
          <Link
            href={href}
            aria-label="Žiūrėti panašias prekes"
            className="group text-link hidden min-h-11 items-center gap-1.5 font-semibold lg:flex"
          >
            Žiūrėti visas
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="scrollbar-soft px-gutter scroll-px-gutter flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {products.map((product) => (
            <li key={product.id} className="w-60 shrink-0 snap-start lg:w-auto">
              <ProductCard data={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
