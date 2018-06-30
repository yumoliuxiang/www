import {browserHistory} from 'react-router';

export default () => {
  localStorage.removeItem('token');
  browserHistory.push('/login');
};
