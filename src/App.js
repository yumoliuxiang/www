import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import 'antd/dist/antd.css';
import './App.css';
import AsyncComponent from './component/AsyncComponent';

// 按路由切割 js
const Apply = AsyncComponent(() => import('./page/Apply'));
const Register = AsyncComponent(() => import('./page/Register'));
const Login = AsyncComponent(() => import('./page/Login'));
const Home = AsyncComponent(() => import('./page/Home'));
const ApplyResetPassword = AsyncComponent(() => import('./page/ApplyResetPassword'));
const ResetPassword = AsyncComponent(() => import('./page/ResetPassword'));

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="apply" component={Apply} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="applyResetPassword" component={ApplyResetPassword} />
        <Route path="resetPassword" component={ResetPassword} />
        <Route path="/" component={Home} />
      </Router>
    );
  }
}
