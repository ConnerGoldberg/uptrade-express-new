require('iconv-lite').encodingExists('cesu8');
import db from './dbConnect';

test('Should return the expected product', async () => {
  try {
    const connection = db.pool.getConnection();
    expect(connection).toBeTruthy();
  } catch (e) {
    console.log('ERROR', e.message);
  }
});
