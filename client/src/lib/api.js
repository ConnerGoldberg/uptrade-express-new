import axios from 'axios';
import history from './history';
import { cancelableRequest } from './cancelableRequest';
import { encodeCookie, decodeCookie } from './cookieParser';

const _getCustomersRequest = cancelableRequest('get');
const _getUsersRequest = cancelableRequest('get');

export const register = (data) => {
  return axios.post('/api/register', data);
};

export const getLoggedInUser = (userId) => {
  const authCookie = decodeCookie();
  if (authCookie && authCookie.token !== '' && authCookie.token !== undefined) {
    axios.get(`/api/user/${userId}`).then((res) => {
      console.log('user', res.data);
      const user = res.data;
      window.localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
  }
};

export const login = ({ email, password }) => {
  axios
    .post('/api/login', {
      email,
      password,
    })
    .then((res) => {
      console.log('token: ', res.headers.authorization, res.data);
      encodeCookie({
        key: 'token',
        value: res.headers && res.headers.authorization,
      });
      const user = getLoggedInUser(res.data.userId);
      return user;
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

export const logOut = () => {
  encodeCookie({ key: 'token', value: '' });
  window.localStorage.removeItem('user');
};

export const getCustomers = () => {
  return _getCustomersRequest('/api/customers');
};

export const getUsers = () => {
  return _getUsersRequest('/api/users');
};
export default { login, logout, getCustomers, getUsers, register };
