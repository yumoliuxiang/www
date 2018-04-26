import React from 'react';
import {Router, Route, browserHistory, withRouter} from 'react-router';
import './App.css';
import Apply from './page/Apply';
import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import ApplyResetPassword from './page/ApplyResetPassword';
import ResetPassword from './page/ResetPassword';

class App extends React.Component {
  componentDidMount() {
    // TODO
    // this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  routerWillLeave = nextLocation => {
    console.log(nextLocation);
  };

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

export default withRouter(App);
