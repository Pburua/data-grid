import faker from 'faker';
import {
  filtrate,
  sortByCriteria,
} from './utils';
import { FilterCriteria, User } from '../store/types';

const emptyArr = new Array(100).fill(undefined);

const filledArr = emptyArr.map((_value, index) => {
  faker.seed(index + 2);

  return new User(
    faker.name.findName(),
    faker.address.city(),
    faker.random.number({ min: 0, max: 500 }),
    faker.random.number({ min: 0, max: 500 }),
    faker.random.number({ min: 0, max: 500 }),
    faker.random.boolean(),
    faker.random.number({ min: 0, max: 2 }),
    faker.date.recent(30),
  );
});

const initialSortParams = [
  {
    sortCriteriaName: 'name',
    isDirectionDown: true,
    priority: 1,
  },
  {
    sortCriteriaName: 'city',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'unconvertedTaskScore1',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'unconvertedTaskScore2',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'unconvertedTaskScore3',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'unconvertedTotalScore',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'isActive',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'framework',
    isDirectionDown: true,
    priority: 10,
  },
  {
    sortCriteriaName: 'unconvertedDate',
    isDirectionDown: true,
    priority: 10,
  },
];

const initialFilterCriteria = new FilterCriteria('', 'all', ['react', 'angular', 'both']);

const initialState = {
  isVirtualizeOn: true,
  filterCriteria: initialFilterCriteria,
  sortParameters: initialSortParams,
  data: [...filledArr],
  filtratedData: filtrate([...filledArr], initialFilterCriteria),
  sortedAndFiltratedData: sortByCriteria([...filledArr], initialSortParams),
};

export default initialState;
