import { Consumer } from './Consumer';
import { OrderInfo } from './OrderInfo';
import { OrderItem } from './OrderItem';

export type ScalaPayOrder = {
  token: string;
  totalAmount: { amount: number; currency: string };
  consumer: Consumer;
  merchantReference: string;
  billing?: OrderInfo;
  shipping: OrderInfo;
  items: OrderItem[];
};
