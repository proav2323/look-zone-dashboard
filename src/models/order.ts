import { address } from './address';
import { cart } from './cart';

export interface order {
  _id: string;
  cart: cart;
  address: address;
  payment: number;
  date: number;
  status: string;
  userId: string;
}
