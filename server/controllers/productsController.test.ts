require('iconv-lite').encodingExists('cesu8');
import axios from 'axios';
import * as dotenv from 'dotenv';
import db from '../db/dbConnect';
import mockScalapayOrder from '../mocks/ScalaPayOrder';
import mockScalapayConfig from '../mocks/ScalaPayConfig';
import { orderWithScalapay, getScalapayConfiguration } from './productsController';
import { getUserProductTransactionByPaymentProviderRef } from '../services/queries/productQueries';
import ScalaPayConfig from '../mocks/ScalaPayConfig';

dotenv.config();
test('Should successfully save the order information', () => {
  const authCookie = process.env.SCALAPAY_SECRET;
  expect(authCookie).toBeTruthy();
  const mockReq = { headers: { authorization: `Bearer ${authCookie}` }, body: mockScalapayOrder };
  const mockRes = {
    status: 200,
    data: {
      token: '41KLPDAZ8A',
      expires: '2021-03-21T23:45:37.086Z',
      checkoutUrl: 'https://staging.portal.scalapay.com/checkout?token=41KLPDAZ8A',
    },
  };

  orderWithScalapay(mockReq, mockRes).then(async (res) => {
    const userProductTransaction = await getUserProductTransactionByPaymentProviderRef(mockRes.data.token);
    expect(userProductTransaction.payment_provider_reference).toEqual(mockRes.data.token);
  });
});

test('Should successfully retrieve the config', () => {
  const authCookie = process.env.SCALAPAY_SECRET;
  expect(authCookie).toBeTruthy();
  const mockReq = { headers: { authorization: `Bearer ${authCookie}` } };
  const mockRes = {
    status: 200,
    data: mockScalapayConfig,
  };

  getScalapayConfiguration(mockReq, mockRes).then((res) => {
    expect(mockRes.data).toEqual(res.data);
  });
});
