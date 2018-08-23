import domains from './domains';

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

const domain = domains[localStorage.getItem('domain') || 0].value;
Object.keys(apis).forEach(key => (apis[key] = domain + apis[key]));

export default apis;
