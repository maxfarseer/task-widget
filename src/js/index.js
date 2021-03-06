import '../styles/reset.scss';
import '../styles/app.scss';
import React from 'react';
import {render} from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();

window.kgtrckr = {
  actions: {},
  issues: []
};

render(
  <Root store={store} />,
  document.getElementById('root')
);
