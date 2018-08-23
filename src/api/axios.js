import axios from 'axios';
import logout from './logout';

const instance = axios.create({
  withCredentials: true
});

instance.interceptors.request.use(
  config => {
    config.headers.common['X-User-Token'] = localStorage.getItem('token');
    return config;
  },
  err => Promise.reject(err)
);

instance.interceptors.response.use(
  res => {
    const {data} = res;
    if (data.code !== 10000) {
      return data;
    }
    logout();
  },
  err => Promise.reject(err)
);

export default instance;
