import type { Subcategory } from '@/actions/types';
import { Breadcrumbs } from '@/components/breadcrumbs';

type Props = {
  subcategory: Subcategory;
  productName: string;
};

export const ProductBreadcrumbs = ({ subcategory, productName }: Props) => {
  const { category } = subcategory;

  return (
    <Breadcrumbs
      links={[
        { label: category.name, href: `/category/${category.id}` },
        { label: subcategory.name, href: `/category/${category.id}/${subcategory.id}` },
      ]}
      current={productName}
    />
  );
};
