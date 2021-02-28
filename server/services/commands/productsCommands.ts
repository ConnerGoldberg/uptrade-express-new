import { ResultSetHeader } from 'mysql2';
import db from '../../db/dbConnect';
import { ScalaPayOrder } from '../../types/ScalaPayOrder';

export async function addUserProductTransaction({ order }: { order: Partial<ScalaPayOrder> }): Promise<void> {
  try {
    const columns = [
      `user_id`,
      `payment_provider_id`,
      `total_amount`,
      `discounted_amount`,
      `reference`,
      `payment_provider_reference`,
      `archived`,
    ];
    const values = columns.map((column) => `${column} = :${column}`).join(', ');
    const insertUserProductTransactionCommand = `INSERT user_product_transaction SET ${values}`;
    const [result]: [ResultSetHeader] = await db.execute(insertUserProductTransactionCommand, {
      user_id: order.user_id,
      payment_provider_id: order.payment_provider_id,
      total_amount: order.totalAmount.amount,
      discounted_amount: order.discounts?.amount?.amount ? order.discounts?.amount?.amount : '0.00',
      reference: order.merchantReference,
      payment_provider_reference: order.token,
      archived: 0,
    });
    if (result) {
      const providerTransactionColumns = [`user_product_transaction_id`, `product_id`, `unit_amount`, `archived`];
      const providerTransactionValues = providerTransactionColumns.map((column) => `${column} = :${column}`).join(', ');
      const insertProviderTransactionProductsCommand = `INSERT provider_transaction_products SET ${providerTransactionValues}`;
      for (let i = 0; i < order.items.length; i++) {
        db.execute(insertProviderTransactionProductsCommand, {
          user_product_transaction_id: result.insertId,
          product_id: order.items[i].product_id,
          unit_amount: order.items[i].price.amount,
          archived: 0,
        });
      }
    }
  } catch (e) {
    throw new Error(`Could not add user product transaction. Reason: ${e as string}`);
  }
}
