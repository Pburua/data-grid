import moment from 'moment';
import {
  FilterCriteria, SortParameter, User, UserReference,
} from '../store/types';

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

function filtrateRef(data: User[], filterCriteria: FilterCriteria) {
  const dataRef = data.map((_value, index) => ({
    userIndex: index,
  }));

  return dataRef.filter((value: UserReference) => {
    const curRow: User = data[value.userIndex];

    if (filterCriteria.searchText !== ''
      && !curRow.name.includes(filterCriteria.searchText)
      && !curRow.city.includes(filterCriteria.searchText)
      && !curRow.taskScore1.includes(filterCriteria.searchText)
      && !curRow.taskScore2.includes(filterCriteria.searchText)
      && !curRow.taskScore3.includes(filterCriteria.searchText)
      && !curRow.totalScore.includes(filterCriteria.searchText)
      && !curRow.date.includes(filterCriteria.searchText)
    ) return false;

    if (filterCriteria.isActive !== 'all'
      && filterCriteria.isActive !== curRow.isActive
    ) return false;

    if (!filterCriteria.frameworks.includes(curRow.framework)) return false;

    return true;
  });
}

function sortFilteredRef(data: User[], dataRef: UserReference[], sortParameters: SortParameter[]) {
  const sortCriteriaArr: SortParameter[] = [...sortParameters];
  sortCriteriaArr.sort((a, b) => {
    if (a.priority > b.priority) {
      return 1;
    }
    if (a.priority < b.priority) {
      return -1;
    }
    return 0;
  });

  const dataRefCopy = [...dataRef];

  return dataRefCopy.sort((a, b) => {
    for (let i = 0; i < sortCriteriaArr.length; i += 1) {
      const compareResult = compareValues(
        data[a.userIndex][sortCriteriaArr[i].sortCriteriaName],
        data[b.userIndex][sortCriteriaArr[i].sortCriteriaName],
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

function removeUserSelection() {
  const s = window.getSelection();
  if (s && s.rangeCount > 0) {
    for (let i = 0; i < s.rangeCount; i += 1) {
      s.removeRange(s.getRangeAt(i));
    }
  }
}

export {
  filtrateRef,
  sortFilteredRef,
  removeUserSelection,
};
