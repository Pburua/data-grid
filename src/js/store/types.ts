import moment from 'moment';

class User {
  name: string;

  city: string;

  taskScore1: string;

  taskScore2: string;

  taskScore3: string;

  totalScore: string;

  unconvertedTaskScore1: number;

  unconvertedTaskScore2: number;

  unconvertedTaskScore3: number;

  unconvertedTotalScore: number;

  isActive: string;

  framework: string;

  date: string;

  unconvertedDate: moment.Moment;

  isSelected: boolean;

  constructor(name: string,
    city: string,
    taskScore1: number,
    taskScore2: number,
    taskScore3: number,
    isActive: boolean,
    framework: 0 | 1 | 2,
    date: any,
    isSelected: boolean) {
    this.name = name.toLowerCase();

    this.city = city.toLowerCase();

    this.unconvertedTaskScore1 = taskScore1;
    this.taskScore1 = taskScore1.toLocaleString();

    this.unconvertedTaskScore2 = taskScore2;
    this.taskScore2 = taskScore2.toLocaleString();

    this.unconvertedTaskScore3 = taskScore3;
    this.taskScore3 = taskScore3.toLocaleString();

    const totalScore = taskScore1 + taskScore2 + taskScore3;
    this.unconvertedTotalScore = totalScore;
    this.totalScore = totalScore.toLocaleString();

    this.isActive = isActive ? 'yes' : 'no';
    switch (framework) {
      case 0: {
        this.framework = 'react';
        break;
      }
      case 1: {
        this.framework = 'angular';
        break;
      }
      default: {
        this.framework = 'both';
      }
    }

    const dateObject = moment(date);
    this.unconvertedDate = dateObject;
    this.date = dateObject.format('DD-MM-YYYY');

    this.isSelected = isSelected;
  }
}

interface UserReference {
  userIndex: number,
}

interface FilterCriteria {
  searchText: string;

  isActive: string;

  frameworks: string[];
}

interface SortParameter {
  columnId: string;
  sortCriteriaName: string;
  isDirectionDown: boolean;
  priority: number;
}

interface ColumnData {
  type: string;
  text: string;
  fieldName: string;
  visible: boolean;
}

interface ReduxStorage {
  isVirtualizeOn: boolean;
  filterCriteria: FilterCriteria, // local storage
  sortParameters: SortParameter[], // local storage
  data: User[],
  filtratedDataRef: UserReference[],
  sortedAndFiltratedDataRef: UserReference[],
  columnData: ColumnData[], // local storage
}

export {
  User, FilterCriteria, SortParameter, ReduxStorage, ColumnData, UserReference,
};
