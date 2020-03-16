import {
  TOGGLE_VIRTUALIZATION,
  UPDATE_FILTERS,
  APPLY_FIRST_PRIORITY,
  APPLY_ADDITIONAL_PRIORITY, TOGGLE_ROW_SELECTION,
} from './actionTypes';
import store from '../store/store';

export function toggleVirtualization() {
  const action = {
    type: TOGGLE_VIRTUALIZATION,
  };
  store.dispatch(action);
}

export function toggleRowSelection(index, isSingleSelection) {
  const action = {
    type: TOGGLE_ROW_SELECTION,
    index,
    isSingleSelection,
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

export function applyFirstPriority(cellNumber) {
  const action = {
    type: APPLY_FIRST_PRIORITY,
    cellNumber,
  };
  store.dispatch(action);
}

export function applyAdditionalPriority(cellNumber) {
  const action = {
    type: APPLY_ADDITIONAL_PRIORITY,
    cellNumber,
  };
  store.dispatch(action);
}
