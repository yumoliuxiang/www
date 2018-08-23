import {domain} from './domains';

const apis = {
  getCaptcha: 'user/registerCaptcha',
  getRegisterCode: 'user/registerMail',
  register: 'user/register',
  login: 'user/login',
  getUser: 'user',
  cookie: 'user/cookie',
  deleteCookie: 'user/cookie',
  getAvailableCount: 'user/number',
  getHongbao: 'user/receiving',
  getHongbaoHistory: 'user/receiving',
  refresh: 'user/receiving',
  zhuangbi: 'zhuangbi',
  resetPassword: 'user/resetPassword',
  resetPasswordCaptcha: 'user/resetPasswordCaptcha',
  resetPasswordMail: 'user/resetPasswordMail',
  getRank: 'rank',
  getPie: 'pie',
  getTrend: 'trend',
  getNotice: 'notice.json' // 为了方便随时更新公告，直接在 JSON 中维护
};

// 验证码需要完整路径
apis.getCaptcha = domain + apis.getCaptcha;
apis.resetPasswordCaptcha = domain + apis.resetPasswordCaptcha;

export default apis;
