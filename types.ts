export interface Product {
  id: string;
  subcategoryId: string;
  name: string;
  price: string;
  amountInStock: number;
  isFeatured: boolean;
  description: string;
  images: Image[];
  subcategory: Subcategory;
}

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  category: Category;
}
