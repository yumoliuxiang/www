import React from 'react';
import {browserHistory, Route, Router} from 'react-router';
import {injectGlobal} from 'styled-components';
import './App.css';
import Media from './component/Media';
import Apply from './page/Apply';
import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import ApplyResetPassword from './page/ApplyResetPassword';
import ResetPassword from './page/ResetPassword';

injectGlobal`
  body.is-home {
    width: 1020px;
    max-width: 100%;
    
    ${Media.mobile`width: 100%;`}
  }
`;

export default () => (
  <Router history={browserHistory}>
    <Route path="apply" component={Apply} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="applyResetPassword" component={ApplyResetPassword} />
    <Route path="resetPassword" component={ResetPassword} />
    <Route path="/" component={Home} />
  </Router>
);
