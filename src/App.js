import React from 'react';
import {browserHistory, Route, Router} from 'react-router';
import {message} from 'antd';
import './globalStyle';
import './hmt';
import Mouse from './component/Mouse';
import Apply from './page/Apply';
import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import ApplyResetPassword from './page/ApplyResetPassword';
import ResetPassword from './page/ResetPassword';
import eventbus from './eventbus';

eventbus.on('service-worker:new-version', () => {
  message.info('新版本已准备好，刷新页面即可更新');
});

export default () => (
  <div>
    <Router history={browserHistory}>
      <Route path="apply" component={Apply} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="applyResetPassword" component={ApplyResetPassword} />
      <Route path="resetPassword" component={ResetPassword} />
      <Route path="/" component={Home} />
    </Router>
    <Mouse />
  </div>
);
