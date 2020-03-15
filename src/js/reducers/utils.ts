import moment from 'moment';
import { FilterCriteria, SortParameters, User } from '../store/types';

function filtrate(data: User[], filterCriteria: FilterCriteria) {
  return data.filter((value: User) => {
    if (filterCriteria.searchText !== ''
      && !value.name.includes(filterCriteria.searchText)
      && !value.city.includes(filterCriteria.searchText)
      && !value.taskScore1.includes(filterCriteria.searchText)
      && !value.taskScore2.includes(filterCriteria.searchText)
      && !value.taskScore3.includes(filterCriteria.searchText)
      && !value.totalScore.includes(filterCriteria.searchText)
      && !value.date.includes(filterCriteria.searchText)
    ) return false;

    if (filterCriteria.isActive !== 'all'
      && filterCriteria.isActive !== value.isActive
    ) return false;

    if (!filterCriteria.frameworks.includes(value.framework)) return false;

    return true;
  });
}

function compareNumbers(a: number, b: number) {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

function compareDates(a: moment.Moment, b: moment.Moment) {
  const daysDifference = a.diff(b, 'days', true);
  if (daysDifference > 0) return 1;
  if (daysDifference < 0) return -1;
  return 0;
}

function compareValues(a, b, isDirectionDown, sortCriteriaName) {
  if (sortCriteriaName === 'unconvertedTaskScore1'
    || sortCriteriaName === 'unconvertedTaskScore2'
    || sortCriteriaName === 'unconvertedTaskScore3'
    || sortCriteriaName === 'unconvertedTotalScore') {
    if (isDirectionDown) return compareNumbers(a, b);
    return compareNumbers(b, a);
  }

  if (sortCriteriaName === 'unconvertedDate') {
    if (isDirectionDown) return compareDates(a, b);
    return compareDates(b, a);
  }

  if (isDirectionDown) return a.localeCompare(b);
  return b.localeCompare(a);
}

function sortByCriteria(data: User[], sortParameters: SortParameters) {
  const sortCriteriaArr: SortParameters = [...sortParameters];
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
        sortCriteriaArr[i].sortCriteriaName,
      );
      if (compareResult !== 0) {
        return compareResult;
      }
    }
    return 0;
  });
}

export {
  filtrate,
  sortByCriteria,
};
