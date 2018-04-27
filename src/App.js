import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import './App.css';
import Apply from './page/Apply';
import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import ApplyResetPassword from './page/ApplyResetPassword';
import ResetPassword from './page/ResetPassword';

export default class extends React.Component {
  onLeave = route => {
    let path = route.location.pathname;

    if (window.__PLEASE_REFRESH__) {
      window.location.href = path;
    } else {
      browserHistory.push(path);
    }
  };

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="apply" component={Apply} onLeave={this.onLeave} />
        <Route path="login" component={Login} onLeave={this.onLeave} />
        <Route path="register" component={Register} onLeave={this.onLeave} />
        <Route path="applyResetPassword" component={ApplyResetPassword} onLeave={this.onLeave} />
        <Route path="resetPassword" component={ResetPassword} onLeave={this.onLeave} />
        <Route path="/" component={Home} onLeave={this.onLeave} />
      </Router>
    );
  }
}
