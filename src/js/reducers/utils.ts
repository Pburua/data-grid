import { FilterCriteria, SortParameters, User } from '../store/types';

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
