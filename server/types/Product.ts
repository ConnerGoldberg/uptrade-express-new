import { Price } from './Price';

export type Product = {
  id: number;
  name: string;
  created_on: Date;
  price?: Price;
  archived: boolean;
};
