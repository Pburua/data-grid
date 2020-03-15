import moment from 'moment';

class User {
  name: string;

  city: string;

  score: string;

  unconvertedScore: number;

  isActive: string;

  framework: string;

  date: string;

  unconvertedDate: moment.Moment;

  constructor(name: string,
    city: string,
    score: number,
    isActive: boolean,
    framework: 0 | 1 | 2,
    date: any) {
    this.name = name.toLowerCase();

    this.city = city.toLowerCase();

    this.unconvertedScore = score;
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

    const dateObject = moment(date);
    this.unconvertedDate = dateObject;
    this.date = dateObject.format('DD-MM-YYYY');
  }
}

class FilterCriteria {
  searchText: string;

  isActive: string;

  frameworks: string[];

  constructor(searchText, isActive, frameworks) {
    this.searchText = searchText;
    this.isActive = isActive;
    this.frameworks = frameworks;
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
