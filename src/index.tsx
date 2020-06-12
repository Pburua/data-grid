import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './js/components/App/App';

import store from './js/store/store';

window.addEventListener('beforeunload', () => {
  localStorage.setItem('filterCriteria', JSON.stringify(store.getState().filterCriteria));
  localStorage.setItem('sortParameters', JSON.stringify(store.getState().sortParameters));
  localStorage.setItem('columnData', JSON.stringify(store.getState().columnData));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
