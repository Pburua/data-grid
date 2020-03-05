import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './js/components/App/App';

import store from './js/store/store';

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('app'),
);
