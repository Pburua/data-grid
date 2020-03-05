import { INCREMENT, TOGGLE_VIRTUALIZATION } from './actionTypes';
import store from '../store/store';

export function increment() {
  const action = {
    type: INCREMENT,
  };
  store.dispatch(action);
}

export function toggleVirtualization() {
  const action = {
    type: TOGGLE_VIRTUALIZATION,
  };
  store.dispatch(action);
}
