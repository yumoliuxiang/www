import axios from 'axios';
import logout from './logout';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    config.headers.common['X-User-Token'] = localStorage.getItem('token');
    return config;
  },
  err => Promise.reject(err)
);

axios.interceptors.response.use(
  res => {
    const {data} = res;
    if (data.code !== 10000) {
      return data;
    }
    logout();
  },
  err => Promise.reject(err)
);

export default axios;
