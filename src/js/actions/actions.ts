import { INCREMENT } from './actionTypes';
import store from '../store/store';

// eslint-disable-next-line import/prefer-default-export
export function increment() {
  const action = {
    type: INCREMENT,
  };
  store.dispatch(action);
}
