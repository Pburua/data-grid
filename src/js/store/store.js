import { createStore } from 'redux';
import rootReducer from '../reducers/reducer';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
