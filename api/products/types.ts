export type GetProductsResponse = Products;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export type Products = Product[];
