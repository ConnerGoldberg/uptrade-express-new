import { Duration } from 'moment';

import { DurationType } from './DurationType';

export type Price = {
  id: number;
  currency: string;
  unit_amount: number;
  duration_id: number;
  product_id: number;
  duration?: DurationType;
  created_on: Date;
  archived: boolean;
};
