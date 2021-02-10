/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { createPool } from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();
function create(): any {
  try {
    const pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: parseInt(process.env.DB_PORT) || 3306,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      connectionLimit: 10,
      queueLimit: 0,
      waitForConnections: true,
      namedPlaceholders: true,
      multipleStatements: true,
      timezone: 'Z',
    });

    const promisePool = pool.promise();

    return promisePool;
  } catch (error) {
    return console.log(`Could not connect - ${error}`);
  }
}

const pool = create();

export default {
  pool,
  connection: async () => pool.getConnection(),
  execute: (...params: any) => pool.execute(...params),
  query: (...params: any) => pool.query(...params),
};
