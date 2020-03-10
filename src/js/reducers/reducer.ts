import faker from 'faker';
import { INCREMENT, TOGGLE_VIRTUALIZATION, UPDATE_FILTERS } from '../actions/actionTypes';
import { User, FilterCriteria } from '../store/types';

const emptyArr = new Array(1000).fill(undefined);

const filledArr = emptyArr.map((_value, index) => {
  faker.seed(index + 2);

  return new User(
    faker.name.findName(),
    faker.address.city(),
    faker.random.number(),
    faker.random.boolean(),
  );
});

const initialState = {
  counter: 0,
  isVirtualizeOn: true,
  data: filledArr,
  filtratedData: filledArr,
  filterCriteria: new FilterCriteria('', 'inactive'),
};

function rootReducer(prevState : any, action: any) {
  if (typeof prevState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case INCREMENT:
      return { ...prevState, counter: prevState.counter + 1 };
    case TOGGLE_VIRTUALIZATION:
      return { ...prevState, isVirtualizeOn: !prevState.isVirtualizeOn };
    case UPDATE_FILTERS:
      return { ...prevState, filterCriteria: action.filterCriteria };
    default:
      return prevState;
  }
}

export default rootReducer;
