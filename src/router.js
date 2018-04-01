import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Apply from './page/apply';
import Register from './page/register';
import Login from './page/login';
import Home from './page/home';
import ApplyResetPassword from './page/applyResetPassword';
import ResetPassword from './page/resetPassword';

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
