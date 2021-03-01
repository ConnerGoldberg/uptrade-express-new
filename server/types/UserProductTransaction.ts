export type UserProductTransaction = {
  id: number;
  user_id: number;
  payment_provider_id: number;
  total_amount: number;
  discounted_amount: number;
  reference: number;
  payment_provider_reference: number;
  created_on: Date;
  archived: boolean;
};
