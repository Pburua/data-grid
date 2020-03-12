import faker from 'faker';
import { INCREMENT, TOGGLE_VIRTUALIZATION, UPDATE_FILTERS } from '../actions/actionTypes';
import { User, FilterCriteria } from '../store/types';

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

const emptyArr = new Array(50).fill(undefined);

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

const initialState = {
  counter: 0,
  isVirtualizeOn: true,
  data: filledArr,
  filtratedData: filledArr,
  filterCriteria: new FilterCriteria('', 'all', 'all'),
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
    case UPDATE_FILTERS:
      return {
        ...prevState,
        filterCriteria: action.filterCriteria,
        filtratedData: filtrate(prevState.data, action.filterCriteria),
      };
    default:
      return prevState;
  }
}

export default rootReducer;
