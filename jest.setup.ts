import { encodingExists } from 'mysql2/node_modules/iconv-lite';
import db from './server/db/dbConnect';
encodingExists('cesu8');

afterAll(async (done) => {
  await db.pool?.end();
  done();
});
