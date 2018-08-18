import React from 'react';
import {browserHistory, Route, Router} from 'react-router';
import './globalStyle';
import './hmt';
import Mouse from './component/Mouse';
import Apply from './page/Apply';
import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import ApplyResetPassword from './page/ApplyResetPassword';
import ResetPassword from './page/ResetPassword';

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
