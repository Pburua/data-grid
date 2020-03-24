import {
  APPLY_ADDITIONAL_PRIORITY,
  APPLY_FIRST_PRIORITY, DELETE_SELECTED_ROWS, TOGGLE_ROW_SELECTION,
  TOGGLE_VIRTUALIZATION, UPDATE_COLUMN_DATA,
  UPDATE_FILTERS,
} from '../actions/actionTypes';
import { ReduxStorage, SortParameter, User } from '../store/types';
import {
  filtrate,
  sortByCriteria, sortByCriteriaRef,
} from './utils';
// eslint-disable-next-line import/named
import { initialState } from './initialState';

function clearSelection(data: User[]) {
  const newData = [...data];
  for (let i = 0; i < newData.length; i += 1) {
    newData[i].isSelected = false;
  }
  return newData;
}

function handleToggleVirtualization(prevState: ReduxStorage) {
  const newData = clearSelection(prevState.data);

  return {
    ...prevState,
    isVirtualizeOn: !prevState.isVirtualizeOn,
    data: newData,
  };
}

function handleToggleRowSelection(prevState: ReduxStorage, action) {
  const newData = [...prevState.data];

  if (action.isSingleSelection) {
    // очистить все
    for (let i = 0; i < newData.length; i += 1) {
      newData[i].isSelected = false;
    }
    // выделить одну
    for (let i = 0; i < newData.length; i += 1) {
      if (newData[i].name === action.rowId) {
        newData[i].isSelected = true;
        break;
      }
    }
  } else {
    // выделить одну
    for (let i = 0; i < newData.length; i += 1) {
      if (newData[i].name === action.rowId) {
        newData[i].isSelected = true;
        break;
      }
    }
  }

  const filtratedData = filtrate(newData, prevState.filterCriteria);

  return {
    ...prevState,
    data: newData,
    filtratedData,
    sortedAndFiltratedData: sortByCriteria(filtratedData, prevState.sortParameters),
    sortedAndFiltratedDataRef: sortByCriteriaRef(filtratedData, prevState.sortParameters),
  };
}

function handleUpdateFilters(prevState: ReduxStorage, action) {
  const newData = clearSelection(prevState.data);

  const filtratedData = filtrate(newData, action.filterCriteria);

  return {
    ...prevState,
    filterCriteria: action.filterCriteria,
    data: newData,
    filtratedData,
    sortedAndFiltratedData: sortByCriteria(filtratedData, prevState.sortParameters),
    sortedAndFiltratedDataRef: sortByCriteriaRef(filtratedData, prevState.sortParameters),
  };
}

function handleApplyFirstPriority(prevState: ReduxStorage, action) {
  const newData = clearSelection(prevState.data);

  // найти в prevState.sortParameters такой элемент,
  // что action.columnId = prevState.sortParameters[i].columnId

  const updatedArr: SortParameter[] = prevState.sortParameters.map((value) => ({
    ...value,
    isDirectionDown:
      (value.columnId === action.columnId ? !value.isDirectionDown : value.isDirectionDown),
    priority:
      (value.columnId === action.columnId ? 1 : 10),
  }));

  const filtratedData = filtrate(newData, prevState.filterCriteria);

  return {
    ...prevState,
    data: newData,
    filtratedData,
    sortParameters: updatedArr,
    sortedAndFiltratedData: sortByCriteria(prevState.filtratedData, updatedArr),
    sortedAndFiltratedDataRef: sortByCriteriaRef(prevState.filtratedData, updatedArr),
  };
}

function handleApplyAdditionalPriority(prevState: ReduxStorage, action) {
  let maxPriority = 0;

  for (let i = 0; i < prevState.sortParameters.length; i += 1) {
    const currPriority = prevState.sortParameters[i].priority;
    if (currPriority > maxPriority && currPriority !== 10) maxPriority = currPriority;
  }

  // найти в prevState.sortParameters такой элемент,
  // что action.columnId = prevState.sortParameters[i].columnId

  const updatedArr: SortParameter[] = prevState.sortParameters.map((value) => ({
    ...value,
    isDirectionDown:
      (value.columnId === action.columnId ? !value.isDirectionDown : value.isDirectionDown),
    priority:
      (value.columnId === action.columnId && value.priority === 10
        ? maxPriority + 1 : value.priority),
  }));

  const newData = clearSelection(prevState.data);

  const filtratedData = filtrate(newData, prevState.filterCriteria);

  return {
    ...prevState,
    data: newData,
    filtratedData,
    sortParameters: updatedArr,
    sortedAndFiltratedData: sortByCriteria(prevState.filtratedData, updatedArr),
    sortedAndFiltratedDataRef: sortByCriteriaRef(prevState.filtratedData, updatedArr),
  };
}

function handleDeleteSelectedRows(prevState: ReduxStorage) {
  const newData = prevState.data.filter((value) => !value.isSelected);

  const filtratedData = filtrate(newData, prevState.filterCriteria);

  return {
    ...prevState,
    data: newData,
    filtratedData,
    sortedAndFiltratedData: sortByCriteria(filtratedData, prevState.sortParameters),
    sortedAndFiltratedDataRef: sortByCriteriaRef(filtratedData, prevState.sortParameters),
  };
}

function handleUpdateColumnData(prevState: ReduxStorage, action) {
  return {
    ...prevState,
    columnData: action.newColumnData,
  };
}

function rootReducer(prevState: ReduxStorage, action: any) {
  if (typeof prevState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case TOGGLE_VIRTUALIZATION: {
      return handleToggleVirtualization(prevState);
    }
    case TOGGLE_ROW_SELECTION: {
      return handleToggleRowSelection(prevState, action);
    }
    case UPDATE_FILTERS: {
      return handleUpdateFilters(prevState, action);
    }
    case APPLY_FIRST_PRIORITY: {
      return handleApplyFirstPriority(prevState, action);
    }
    case APPLY_ADDITIONAL_PRIORITY: {
      return handleApplyAdditionalPriority(prevState, action);
    }
    case DELETE_SELECTED_ROWS: {
      return handleDeleteSelectedRows(prevState);
    }
    case UPDATE_COLUMN_DATA: {
      return handleUpdateColumnData(prevState, action);
    }
    default:
      return prevState;
  }
}

export default rootReducer;
