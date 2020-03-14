import faker from 'faker';
import {
  APPLY_FIRST_PRIORITY,
  INCREMENT, TOGGLE_VIRTUALIZATION, UPDATE_FILTERS, UPDATE_SORT_DIRECTION,
} from '../actions/actionTypes';
import { User, FilterCriteria, SortParameters } from '../store/types';

function filtrate(data: User[], filterCriteria: FilterCriteria) {
  return data.filter((value: User) => {
    if (filterCriteria.searchText !== ''
      && !value.name.includes(filterCriteria.searchText)
      && !value.city.includes(filterCriteria.searchText)
      && !value.score.includes(filterCriteria.searchText)
    ) return false;

    if (filterCriteria.isActive !== 'all'
      && filterCriteria.isActive !== value.isActive
    ) return false;

    if (filterCriteria.framework !== 'all'
      && filterCriteria.framework !== value.framework
    ) return false;

    return true;
  });
}

function compareNumbers(a, b) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function compareValues(a, b, isDirectionDown) {
  const aNum = parseInt(a.replace(/\s/g, ''), 10);

  if (aNum) {
    const bNum = parseInt(b.replace(/\s/g, ''), 10);
    if (isDirectionDown) return compareNumbers(aNum, bNum);
    return compareNumbers(bNum, aNum);
  }
  if (isDirectionDown) return a.localeCompare(b);
  return b.localeCompare(a);
}

function sortByCriteria(data: User[], sortParameters: SortParameters) {
  const sortCriteriaArr : SortParameters = [...sortParameters];
  sortCriteriaArr.sort((a, b) => {
    if (a.priority > b.priority) {
      return 1;
    }
    if (a.priority < b.priority) {
      return -1;
    }
    return 0;
  });

  const dataCopy = [...data];

  return dataCopy.sort((a, b) => {
    for (let i = 0; i < sortCriteriaArr.length; i += 1) {
      const compareResult = compareValues(
        a[sortCriteriaArr[i].sortCriteriaName],
        b[sortCriteriaArr[i].sortCriteriaName],
        sortCriteriaArr[i].isDirectionDown,
      );
      if (compareResult !== 0) {
        return compareResult;
      }
    }
    return 0;
  });
}

const emptyArr = new Array(10).fill(undefined);

const filledArr = emptyArr.map((_value, index) => {
  faker.seed(index + 2);

  return new User(
    faker.name.findName(),
    faker.address.city(),
    faker.random.number({ min: 0, max: 1500 }),
    faker.random.boolean(),
    faker.random.number({ min: 0, max: 2 }),
  );
});

const initialSortParams = [
  {
    sortCriteriaName: 'name',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'city',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'score',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'isActive',
    isDirectionDown: false,
    priority: 1,
  },
  {
    sortCriteriaName: 'framework',
    isDirectionDown: true,
    priority: 10,
  },
];

const initialFilterCriteria = new FilterCriteria('', 'all', 'all');

const initialState = {
  counter: 0,
  isVirtualizeOn: true,
  filterCriteria: initialFilterCriteria,
  sortParameters: initialSortParams,
  data: [...filledArr],
  filtratedData: filtrate([...filledArr], initialFilterCriteria),
  sortedAndFiltratedData: sortByCriteria([...filledArr], initialSortParams),
};

function rootReducer(prevState: any, action: any) {
  if (typeof prevState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case INCREMENT:
      return {
        ...prevState,
        counter: prevState.counter + 1,
      };
    case TOGGLE_VIRTUALIZATION:
      return {
        ...prevState,
        isVirtualizeOn: !prevState.isVirtualizeOn,
      };
    case UPDATE_FILTERS: {
      const filtratedData = filtrate(prevState.data, action.filterCriteria);

      return {
        ...prevState,
        filterCriteria: action.filterCriteria,
        filtratedData,
        sortedAndFiltratedData: sortByCriteria(filtratedData, prevState.sortParameters),
      };
    }
    case UPDATE_SORT_DIRECTION: {
      const updatedArr: SortParameters = Array.from(prevState.sortParameters);
      updatedArr[action.cellNumber].isDirectionDown = action.newDirection;
      return {
        ...prevState,
        sortParameters: updatedArr,
        sortedAndFiltratedData: sortByCriteria(prevState.filtratedData, updatedArr),
      };
    }
    case APPLY_FIRST_PRIORITY: {
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
    default:
      return prevState;
  }
}

export default rootReducer;
