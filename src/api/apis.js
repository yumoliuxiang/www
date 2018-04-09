const domain = 'https://api.mtdhb.com/';

const apis = {
  getCaptcha: 'user/registerCaptcha',
  getRegisterCode: 'user/registerMail',
  register: 'user/register',
  login: 'user/login',
  logout: 'user/logout',
  getUser: 'user',
  cookie: 'user/cookie',
  deleteCookie: 'user/clear',
  getAvailableCount: 'user/available',
  getHongbao: 'user/receiving',
  getHongbaoHistory: 'user/receiving',
  refresh: 'user/refresh',
  zhuangbi: 'zhuangbi',
  resetPassword: 'user/resetPassword',
  resetPasswordCaptcha: 'user/resetPasswordCaptcha',
  resetPasswordMail: 'user/resetPasswordMail',
  getRank: 'rank',
  getNotice: 'notice.json' // 为了方便随时更新公告，直接在 JSON 中维护
};

export default Object.keys(apis).reduce((obj, key) => {
  obj[key] = domain + apis[key];
  return obj;
}, {});
