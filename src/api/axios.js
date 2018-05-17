import axios from 'axios';
import {browserHistory} from 'react-router';

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
    //0: 正常
    //1：cookie 不正确或失效
    //4: cookie 不正确，请确保内容包含 ewxshinfo 和 ewxinfo
    //10003：验证码错误
    //10010: 该红包链接已被领取或正在领取中，请换一个红包链接再来！
    //10004：邮箱已被注册
    //10005：cookie 已存在
    //10012: 红包链接不正确
    //10017: 邮箱不存在
    const codes = [0, 1, 4, 10003, 10004, 10005, 10012, 10017, 10010];

    if (codes.includes(data.code)) {
      return data;
    }
    if (data.code === 10000) {
      localStorage.clear();
      browserHistory.push('/login');
    } else {
      alert(data.message);
      return new Promise(() => {});
    }
  },
  err => Promise.reject(err)
);

export default axios;
