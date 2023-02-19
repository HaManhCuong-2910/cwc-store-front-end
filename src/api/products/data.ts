export type TProduct = {
  _id: string;
  name: string;
  description: string;
  is_hot: boolean;
  category: Category;
  price: number;
  sales: number;
  slug: string;
  images: string[];
  quantities: Quantity[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  parent: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Quantity = {
  size: number;
  quantity: number;
  _id: string;
};

export interface TGetListProducts {
  page?: number;
  limit?: number;
  name?: string;
  description?: string;
  price?: number;
  sales?: number;
  images?: string[];
  is_hot?: boolean;
  quantities?: Quantity[];
  category?: string;
  slug?: string;
}
