import fetch from 'node-fetch';
import { getProductById } from '../services/queries/productQueries';
import { addUserProductTransaction } from '../services/commands/productsCommands';
import { Product } from '../types/Product';
import { ScalaPayOrder } from '../types/ScalaPayOrder';

export const productById = (req, res) => {
  try {
    const id = req.params?.id;
    const product = getProductById(id);
    product
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(500);
      });
  } catch (e) {
    console.log(e.message);
  }
};

export const getScalapayConfiguration = async function (req, res) {
  try {
    const baseUrl = 'https://staging.api.scalapay.com/v1/configurations';
    const tokenHeader = req.headers.authorization;
    const response = fetch(baseUrl, {
      method: 'GET',
      headers: { Authorization: tokenHeader, 'Content-Type': 'application/json' },
    });
    const data = (await response).json();
    data
      .then((data) => res.status(200).send(data))
      .catch((err) => {
        console.log(err);
        res.status(err);
      });
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const orderWithScalapay = async (req, res) => {
  try {
    const baseUrl = 'https://staging.api.scalapay.com/v2/orders';
    const tokenHeader = req.headers.authorization;
    const scalapayOrderRequest: Partial<ScalaPayOrder> = (({
      totalAmount,
      consumer,
      merchantReference,
      billing,
      shipping,
      items,
      merchant,
      taxAmount,
    }) => ({
      totalAmount,
      consumer,
      merchantReference,
      billing,
      shipping,
      merchant,
      taxAmount,
      items: items.map((item) => ({
        name: item.name,
        category: item.category,
        brand: item.brand,
        gtin: item.gtin,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
      })),
    }))(req.body);

    const response = fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(scalapayOrderRequest),
      headers: { Authorization: tokenHeader, 'Content-Type': 'application/json' },
    });
    const data = (await response).json();
    data
      .then(async (data) => {
        let scalapayOrder = req.body;
        scalapayOrder.token = data.token;
        await addUserProductTransaction({ order: scalapayOrder });
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
};
