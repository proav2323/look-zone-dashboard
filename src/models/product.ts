export interface product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  categoryId: string;
  stars: number;
  reviews: { userId: string; context: string; stars: number }[];
}
