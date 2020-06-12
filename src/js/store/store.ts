import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from '../reducers/reducer';

// @ts-ignore
const store = createStore(rootReducer, devToolsEnhancer());

export default store;
