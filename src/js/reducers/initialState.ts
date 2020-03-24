import faker from 'faker';
import {
  filtrate,
  sortByCriteria, sortByCriteriaRef,
} from './utils';
import {
  ColumnData, FilterCriteria, ReduxStorage, SortParameter, User,
} from '../store/types';

const ROW_NUMBER = 1000;

let loadedItem;

let initialFilterCriteria: FilterCriteria;
loadedItem = localStorage.getItem('filterCriteria');
if (loadedItem) initialFilterCriteria = JSON.parse(loadedItem);
else {
  initialFilterCriteria = {
    searchText: '',
    isActive: 'all',
    frameworks: ['react', 'angular', 'both'],
  };
}

let initialSortParams: SortParameter[];
loadedItem = localStorage.getItem('sortParameters');
if (loadedItem) initialSortParams = JSON.parse(loadedItem);
else {
  initialSortParams = [
    {
      columnId: 'name',
      sortCriteriaName: 'name',
      isDirectionDown: true,
      priority: 1,
    },
    {
      columnId: 'city',
      sortCriteriaName: 'city',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'taskScore1',
      sortCriteriaName: 'unconvertedTaskScore1',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'taskScore2',
      sortCriteriaName: 'unconvertedTaskScore2',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'taskScore3',
      sortCriteriaName: 'unconvertedTaskScore3',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'totalScore',
      sortCriteriaName: 'unconvertedTotalScore',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'isActive',
      sortCriteriaName: 'isActive',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'framework',
      sortCriteriaName: 'framework',
      isDirectionDown: true,
      priority: 10,
    },
    {
      columnId: 'date',
      sortCriteriaName: 'unconvertedDate',
      isDirectionDown: true,
      priority: 10,
    },
  ];
}

let initialColumns: ColumnData[];
loadedItem = localStorage.getItem('columnData');
if (loadedItem) initialColumns = JSON.parse(loadedItem);
else {
  initialColumns = [
    {
      type: 'name', text: 'Name', fieldName: 'name', visible: true,
    },
    {
      type: 'name', text: 'City', fieldName: 'city', visible: true,
    },
    {
      type: 'int', text: 'Task 1', fieldName: 'taskScore1', visible: true,
    },
    {
      type: 'int', text: 'Task 2', fieldName: 'taskScore2', visible: true,
    },
    {
      type: 'int', text: 'Task 3', fieldName: 'taskScore3', visible: true,
    },
    {
      type: 'int', text: 'Total', fieldName: 'totalScore', visible: true,
    },
    {
      type: 'bool', text: 'Active', fieldName: 'isActive', visible: true,
    },
    {
      type: 'enum', text: 'Framework', fieldName: 'framework', visible: true,
    },
    {
      type: 'date', text: 'Enrollment date', fieldName: 'date', visible: true,
    },
  ];
}


const initialData: User[] = new Array(ROW_NUMBER).fill(undefined).map((_value, index) => {
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
    false,
  );
});

const initialFiltratedData: User[] = filtrate([...initialData], initialFilterCriteria);

const initialSortedAndFiltratedData: User[] = sortByCriteria([...initialFiltratedData],
  initialSortParams);

const initialSortedAndFiltratedDataRef = sortByCriteriaRef([...initialFiltratedData],
  initialSortParams);


const initialState: ReduxStorage = {
  isVirtualizeOn: true,
  filterCriteria: initialFilterCriteria,
  sortParameters: initialSortParams,
  columnData: initialColumns,
  data: initialData,
  filtratedData: initialFiltratedData,
  sortedAndFiltratedData: initialSortedAndFiltratedData,
  sortedAndFiltratedDataRef: initialSortedAndFiltratedDataRef,
};

export { initialState, ROW_NUMBER };
