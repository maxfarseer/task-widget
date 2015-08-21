import '../styles/app.scss';
import React from 'react';
import Root from './containers/Root';
import HashHistory from 'react-router/lib/HashHistory'

const history = new HashHistory();

React.render(
  <Root history={history} />,
  document.getElementById('root')
);
