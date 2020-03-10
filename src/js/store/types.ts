class User {
  name: string;

  city: string;

  score: number;

  isActive: boolean;

  constructor(name, city, score, isActive) {
    this.name = name;
    this.city = city;
    this.score = score;
    this.isActive = isActive;
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
}

class FilterCriteria {
  searchText: string;

  isActive: string;

  constructor(searchText, isActive) {
    this.searchText = searchText;
    this.isActive = isActive;
  }
}

export { User, FilterCriteria };
