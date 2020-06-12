import {
  TOGGLE_VIRTUALIZATION,
  UPDATE_FILTERS,
  APPLY_FIRST_PRIORITY,
  APPLY_ADDITIONAL_PRIORITY, TOGGLE_ROW_SELECTION, DELETE_SELECTED_ROWS, UPDATE_COLUMN_DATA,
} from './actionTypes';
import store from '../store/store';

export function toggleVirtualization() {
  const action = {
    type: TOGGLE_VIRTUALIZATION,
  };
  store.dispatch(action);
}

export function toggleRowSelection(rowId, isSingleSelection) {
  const action = {
    type: TOGGLE_ROW_SELECTION,
    rowId,
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

export function applyFirstPriority(columnId) {
  const action = {
    type: APPLY_FIRST_PRIORITY,
    columnId,
  };
  store.dispatch(action);
}

export function applyAdditionalPriority(columnId) {
  const action = {
    type: APPLY_ADDITIONAL_PRIORITY,
    columnId,
  };
  store.dispatch(action);
}

export function deleteSelectedRows() {
  const action = {
    type: DELETE_SELECTED_ROWS,
  };
  store.dispatch(action);
}

export function updateColumnData(columnData) {
  const action = {
    type: UPDATE_COLUMN_DATA,
    newColumnData: columnData,
  };
  store.dispatch(action);
}
