export type ProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
};

export type ProductFilter = {
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
};
