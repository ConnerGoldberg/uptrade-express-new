export type OrderItem = {
  name: string;
  category: string;
  subcategory?: string[];
  brand: string;
  gtin: string;
  sku: string;
  quantity: number;
  price: { amount: number; currency: string };
  product_id: number;
};
