import React from 'react';
import {browserHistory, Route, Router, Redirect} from 'react-router';
import {BackTop} from 'antd';
import './globalStyle';
import './hmt';
import Mouse from './component/Mouse';
import Loadable from './component/Loadable';

export default () => (
  <div>
    <Router history={browserHistory}>
      <Route path="apply" component={Loadable(() => import('./page/Apply'))} />
      <Route path="login" component={Loadable(() => import('./page/Login'))} />
      <Route path="register" component={Loadable(() => import('./page/Register'))} />
      <Route path="applyResetPassword" component={Loadable(() => import('./page/ApplyResetPassword'))} />
      <Route path="resetPassword" component={Loadable(() => import('./page/ResetPassword'))} />
      <Route path="/" component={Loadable(() => import('./page/Home'))} />
      <Redirect from="*" to="/" />
    </Router>
    <BackTop />
    <Mouse />
  </div>
);
