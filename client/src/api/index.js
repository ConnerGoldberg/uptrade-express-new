import axios from 'axios';
import { decodeCookie } from './cookieParser';

const apiDomain = process.env.REACT_APP_API_DOMAIN;


axios.defaults.baseURL = apiDomain;
axios.defaults.headers.common['Authorization'] = '';

axios.interceptors.request.use(function(config) {
   const cookie = decodeCookie();
   config.headers = {
       Authorization: cookie && cookie.token || '',
   };
   return config;
});
export {
    apiDomain    
};

