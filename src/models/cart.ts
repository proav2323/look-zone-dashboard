export interface cart {
  totalPrice: number;
  id: string;
  products: { id: string; qty: number; price: number }[];
}
