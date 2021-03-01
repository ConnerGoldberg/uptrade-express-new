import { encodingExists } from 'mysql2/node_modules/iconv-lite';
import db from './server/db/dbConnect';
import { reSeedDatabase } from './testHelper';
encodingExists('cesu8');

//TODO: set up mocks for dockerized container
beforeAll(async (done) => {
  //await reSeedDatabase();
  done();
});

afterAll(async (done) => {
  await db.pool?.end();
  done();
});
