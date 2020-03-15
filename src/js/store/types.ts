import moment from 'moment';

class User {
  name: string;

  city: string;

  score: string;

  isActive: string;

  framework: string;

  date: string;

  constructor(name: string,
    city: string,
    score: number,
    isActive: boolean,
    framework: 0 | 1 | 2,
    date: any) {
    this.name = name.toLowerCase();
    this.city = city.toLowerCase();
    this.score = score.toLocaleString();
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
    this.date = moment(date).format('DD-MM-YYYY');
  }
}

class FilterCriteria {
  searchText: string;

  isActive: string;

  framework: string;

  constructor(searchText, isActive, framework) {
    this.searchText = searchText;
    this.isActive = isActive;
    this.framework = framework;
  }
}

interface SortParameters {
  [index: number]: {
    sortCriteriaName: string;
    isDirectionDown: boolean;
    priority: number;
  };

  sort: any;
  length: number;

  [Symbol.iterator]();
}

export { User, FilterCriteria, SortParameters };
