import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (window === window.top) {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
} else {
  window.top.location.replace('https://www.mtdhb.com');
}
