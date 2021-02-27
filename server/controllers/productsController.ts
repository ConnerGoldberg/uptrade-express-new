import fetch from 'node-fetch';
import { getProductById } from '../services/queries/productQueries';

export const productById = (req, res) => {
  const id = req.params?.id;
  const product = getProductById(id);
  product.then((data) => res.status(200).send(data)).catch((err) => console.log(err));
};

export const getScalapayConfiguration = async function (req, res) {
  const baseUrl = 'https://staging.api.scalapay.com/v1/configurations';
  const tokenHeader = req.headers.authorization;
  const response = fetch(baseUrl, {
    method: 'GET',
    headers: { Authorization: tokenHeader, 'Content-Type': 'application/json' },
  });
  const data = (await response).json();
  data.then((data) => res.status(200).send(data)).catch((err) => console.log(err));
};
