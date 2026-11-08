import { Fragment } from 'react';
import Link from 'next/link';

import type { Product } from '@/actions/types';
import { getListSeparator } from '@/lib/list-separator';
import { getProductHref } from '@/lib/product-href';

type Props = {
  products: Pick<Product, 'id' | 'name'>[];
};

export const NeedsChoiceLinks = ({ products }: Props) =>
  products.map(({ id, name }, index) => (
    <Fragment key={id}>
      {getListSeparator({ index, count: products.length })}
      <Link href={getProductHref({ productId: id })} className="text-success underline underline-offset-3">
        {name.trim()}
      </Link>
    </Fragment>
  ));
