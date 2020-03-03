import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/components/App.jsx';

import { Provider } from "react-redux";
import store from "./js/store/store";

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>
  , document.getElementById('app')
);
