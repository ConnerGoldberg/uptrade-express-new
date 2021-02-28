import db from '../../db/dbConnect';
import { Product } from '../../types/Product';
import { Price } from '../../types/Price';
import { DurationType } from '../../types/DurationType';
import { PaymentProvider } from '../../types/PaymentProvider';

export async function getProductById(id: number): Promise<Product> {
  try {
    const columns = ['id', 'name', 'created_on', 'archived'];
    const priceColumns = ['id', 'currency', 'unit_amount', 'product_id', 'duration_id', 'created_on', 'archived'];
    const durationColumns = ['id', '`interval`', 'interval_count', 'created_on', 'archived'];

    const getProductInfoQuery = `SELECT ${columns.toString()} from products where id =:id`;
    const [[getProductInfoQueryResponse]]: [[Product]] = (await db.execute(getProductInfoQuery, { id })) as [[Product]];

    const getPriceInfoQuery = `SELECT ${priceColumns.toString()} from prices where product_id =:id`;
    const [[getPriceInfoQueryResponse]]: [[Price]] = (await db.execute(getPriceInfoQuery, { id })) as [[Price]];

    const durationId = getPriceInfoQueryResponse.duration_id;

    const getDurationInfoQuery = `SELECT ${durationColumns.toString()} from durations where id =:durationId`;
    const [[getDurationInfoQueryResponse]]: [[DurationType]] = (await db.execute(getDurationInfoQuery, {
      durationId,
    })) as [[DurationType]];

    getPriceInfoQueryResponse.duration = getDurationInfoQueryResponse;
    getProductInfoQueryResponse.price = getPriceInfoQueryResponse;

    return getProductInfoQueryResponse;
  } catch (e) {
    console.error('EXCEPTION: getProductById() -  ', e);
    throw e;
  }
}

export async function getPaymentProviderById(id: number): Promise<PaymentProvider> {
  try {
    const columns = ['id', 'provider'];

    const getPaymentProviderQuery = `SELECT ${columns.toString()} from payment_providers where id =:id`;
    const [[getPaymentProviderQueryResponse]]: [[PaymentProvider]] = (await db.execute(getPaymentProviderQuery, {
      id,
    })) as [[PaymentProvider]];

    return getPaymentProviderQueryResponse;
  } catch (e) {
    console.error('EXCEPTION: getProductById() -  ', e);
    throw e;
  }
}
