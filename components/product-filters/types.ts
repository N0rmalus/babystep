export type ProductFilterOption = {
  id: string;
  name: string;
  count: number;
};

export type ProductFilterGroup = ProductFilterOption & {
  subcategories: ProductFilterOption[];
};
