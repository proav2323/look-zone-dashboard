import { address } from './address';
import { cart } from './cart';

export interface user {
  _id: string;
  name: string;
  email: string;
  password: string;
  address: address;
  admin: boolean;
  canEdit: boolean;
  canView: boolean;
  cart: cart;
  orders: string[];
}
