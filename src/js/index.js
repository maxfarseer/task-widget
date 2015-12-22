import '../styles/reset.scss';
import '../styles/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const history = new createBrowserHistory();

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('root')
);
