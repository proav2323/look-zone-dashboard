export interface cart {
  totalPrice: number;
  id: string;
  products: { productId: string; qty: number; price: number }[];
}
