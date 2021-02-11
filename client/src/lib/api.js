import axios from 'axios';
import history from './history';
import { cancelableRequest } from './cancelableRequest';
import { encodeCookie, decodeCookie } from './cookieParser';

const _getCustomersRequest = cancelableRequest('get');
const _getUsersRequest = cancelableRequest('get');

export const register = (data) => {
  return axios.post('/api/register', data);
};

export const login = ({ email, password }) => {
  return axios
    .post('/api/login', {
      email,
      password,
    })
    .then((res) => {
      encodeCookie({
        key: 'token',
        value: res.headers && res.headers.authorization,
      });
      return res;
    });
};

export const logout = () => {
  axios
    .post('/logout')
    .then((res) => {
      encodeCookie({ key: 'token', value: undefined });
      history.push('/login');
    })
    .catch((err) => {
      console.log('Error while logging out');
      history.push('/login');
    });
};

export const getCustomers = () => {
  return _getCustomersRequest('/api/customers');
};

export const getUsers = () => {
  return _getUsersRequest('/api/users');
};
export default { login, logout, getCustomers, getUsers, register };
