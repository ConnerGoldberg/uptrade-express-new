import axios from "axios";
import history from "./history";
import { cancelableRequest } from './cancelableRequest';
import { encodeCookie, decodeCookie } from "./cookieParser";

const _getCustomersRequest = cancelableRequest('get');

export const login = ({ email, password }) => {
  return axios
    .post("/login", {
      email,
      password
    })
    .then(res => {
      encodeCookie({
        key: "token",
        value: res.headers && res.headers.authorization
      });
      return res;
    });
};

export const logout = () => {
    axios
      .post("/logout")
      .then(res => {
        encodeCookie({ key: "token", value: undefined });
        history.push("/authentication/login");
      })
      .catch(err => {
        console.log("Error while logging out");
        history.push("/authentication/login");
      });
  };

  export const getCustomers = () => {
    return _getCustomersRequest('/api/customers');
  };

  export default {login, logout, getCustomers}