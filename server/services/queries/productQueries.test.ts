require('iconv-lite').encodingExists('cesu8');
import { getProductById, getPaymentProviderById } from './productQueries';

test('Should return the expected product', async () => {
  const mockReq = { params: { id: 1 } };
  const product = await getProductById(mockReq.params.id);
  expect(product.id).toEqual(mockReq.params.id);
});

test('Should return the expected payment provider', async () => {
  const mockReq = { params: { id: 1 } };
  const paymentProvider = await getPaymentProviderById(mockReq.params.id);
  expect(paymentProvider.id).toEqual(mockReq.params.id);
});
