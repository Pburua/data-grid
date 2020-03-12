// eslint-disable-next-line max-classes-per-file
class User {
  name: string;

  city: string;

  score: number;

  isActive: boolean;

  framework: number;

  constructor(name, city, score, isActive, framework) {
    this.name = name;
    this.city = city;
    this.score = score;
    this.isActive = isActive;
    this.framework = framework;
  }

  getName() {
    return this.name;
  }

  getCity() {
    return this.city;
  }

  getScore() {
    return this.score.toLocaleString();
  }

  getIsActive() {
    return this.isActive ? 'yes' : 'no';
  }

  getFramework() {
    let framework;
    switch (this.framework) {
      case 0: {
        framework = 'react';
        break;
      }
      case 1: {
        framework = 'angular';
        break;
      }
      default: {
        framework = 'both';
      }
    }
    return framework;
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

export { User, FilterCriteria };
