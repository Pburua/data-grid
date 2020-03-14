import {
  INCREMENT, TOGGLE_VIRTUALIZATION, UPDATE_FILTERS, UPDATE_SORT_DIRECTION,
} from './actionTypes';
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

export function updateFilters(newFilter) {
  const action = {
    type: UPDATE_FILTERS,
    filterCriteria: newFilter,
  };
  store.dispatch(action);
}

export function updateSortDirection(newDirection, cellNumber) {
  const action = {
    type: UPDATE_SORT_DIRECTION,
    newDirection,
    cellNumber,
  };
  store.dispatch(action);
}
