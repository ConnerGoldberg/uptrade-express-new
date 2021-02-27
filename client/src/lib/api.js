import axios from 'axios';
import history from './history';
import { cancelableRequest } from './cancelableRequest';
import { encodeCookie, decodeCookie } from './cookieParser';

const _getCustomersRequest = cancelableRequest('get');
const _getUsersRequest = cancelableRequest('get');
const _getUserRequest = cancelableRequest('get');
const _getProductRequest = cancelableRequest('get');

const getLoggedInUser = async () => {
  const cookie = decodeCookie();
  const authCookie = (cookie && cookie.token) || '';
  const res = await axios.get(`/api/authenticate/user`, {
    headers: {
      Authorization: authCookie,
    },
  });

  const user = res.data;
  window.localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const register = (data) => {
  return axios.post('/api/register', data);
};

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post('/api/login', {
      email,
      password,
    });
    encodeCookie({
      key: 'token',
      value: res.headers && res.headers.authorization,
    });
  } catch (err) {
    console.log('Error while logging in', err);
    history.push('/login');
  }
  return getLoggedInUser();
};

export const logout = async ({ id }) => {
  await axios.post('/api/logout', { id });
  encodeCookie({ key: 'token', value: undefined });
  history.push('/login');

  window.localStorage.removeItem('user');
};

export const getCustomers = () => {
  return _getCustomersRequest('/api/customers');
};

export const getProductById = (productId) => {
  return _getProductRequest(`/api/products/${productId}`);
};

export const getUsers = () => {
  return _getUsersRequest('/api/users');
};

export const getUserById = (userId) => {
  const authCookie = decodeCookie();
  if (authCookie && authCookie.token !== '' && authCookie.token !== undefined) {
    return _getUserRequest(`/api/user/${userId}`).then((res) => {
      console.log('user', res.data);
      const user = res.data;
      window.localStorage.setItem('user', JSON.stringify(user));
    });
  } else {
    return undefined;
  }
};

export const getScalapayConfiguration = () => {
  const authCookie = process.env.REACT_APP_SCALAPAY_SECRET;
  if (authCookie) {
    const res = axios.get(`/api/scalapay/configurations`, {
      headers: {
        Authorization: `Bearer ${authCookie}`,
      },
    });
    return res;
  }
};

export default {
  login,
  logout,
  getCustomers,
  getUsers,
  register,
  getLoggedInUser,
  getProductById,
  getScalapayConfiguration,
};
