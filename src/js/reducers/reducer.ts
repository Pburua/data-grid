import {
  APPLY_ADDITIONAL_PRIORITY,
  APPLY_FIRST_PRIORITY,
  TOGGLE_VIRTUALIZATION,
  UPDATE_FILTERS,
} from '../actions/actionTypes';
import { SortParameters } from '../store/types';
import {
  filtrate,
  sortByCriteria,
} from './utils';
import initialState from './initialState';


function handleToggleVirtualization(prevState) {
  return {
    ...prevState,
    isVirtualizeOn: !prevState.isVirtualizeOn,
  };
}

function handleUpdateFilters(prevState, action) {
  const filtratedData = filtrate(prevState.data, action.filterCriteria);

  return {
    ...prevState,
    filterCriteria: action.filterCriteria,
    filtratedData,
    sortedAndFiltratedData: sortByCriteria(filtratedData, prevState.sortParameters),
  };
}

function handleApplyFirstPriority(prevState, action) {
  const updatedArr: SortParameters = prevState.sortParameters.map((value, index) => ({
    ...value,
    isDirectionDown:
      (index === action.cellNumber ? !value.isDirectionDown : value.isDirectionDown),
    priority:
      (index === action.cellNumber ? 1 : 10),
  }));
  return {
    ...prevState,
    sortParameters: updatedArr,
    sortedAndFiltratedData: sortByCriteria(prevState.filtratedData, updatedArr),
  };
}

function handleApplyAdditionalPriority(prevState, action) {
  let maxPriority = 0;

  for (let i = 0; i < prevState.sortParameters.length; i += 1) {
    const currPriority = prevState.sortParameters[i].priority;
    if (currPriority > maxPriority && currPriority !== 10) maxPriority = currPriority;
  }

  const updatedArr: SortParameters = prevState.sortParameters.map((value, index) => ({
    ...value,
    isDirectionDown:
      (index === action.cellNumber ? !value.isDirectionDown : value.isDirectionDown),
    priority:
      (index === action.cellNumber && value.priority === 10 ? maxPriority + 1 : value.priority),
  }));

  return {
    ...prevState,
    sortParameters: updatedArr,
    sortedAndFiltratedData: sortByCriteria(prevState.filtratedData, updatedArr),
  };
}


function rootReducer(prevState: any, action: any) {
  if (typeof prevState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case TOGGLE_VIRTUALIZATION: {
      return handleToggleVirtualization(prevState);
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
    default:
      return prevState;
  }
}

export default rootReducer;
