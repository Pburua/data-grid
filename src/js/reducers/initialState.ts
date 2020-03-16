import faker from 'faker';
import {
  filtrate,
  sortByCriteria,
} from './utils';
import { FilterCriteria, SortParameters, User } from '../store/types';

const ROW_NUMBER = 100;

const filledArr: User[] = new Array(ROW_NUMBER).fill(undefined).map((_value, index) => {
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

const initialSortParams: SortParameters = [
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

const initialFilterCriteria: FilterCriteria = new FilterCriteria('', 'all', ['react', 'angular', 'both']);

const initialFiltratedData: User[] = filtrate([...filledArr], initialFilterCriteria);

const initialSortedAndFiltratedData: User[] = sortByCriteria([...initialFiltratedData],
  initialSortParams);

const initialRowsSelection: false[] = new Array(ROW_NUMBER).fill(false);

const initialState = {
  isVirtualizeOn: true,
  filterCriteria: initialFilterCriteria,
  sortParameters: initialSortParams,
  data: filledArr,
  filtratedData: initialFiltratedData,
  sortedAndFiltratedData: initialSortedAndFiltratedData,
  rowsSelection: initialRowsSelection,
};

export default initialState;
