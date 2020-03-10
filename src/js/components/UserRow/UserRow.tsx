import React from 'react';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const HeadRow = (
  <TableRow className="table__row head" key={0} component="div">
    <TableCell className="table__cell head name" component="div">Name</TableCell>
    <TableCell className="table__cell head name" component="div">City</TableCell>
    <TableCell className="table__cell head int" component="div">Score</TableCell>
    <TableCell className="table__cell head bool" component="div">Active</TableCell>
    <TableCell className="table__cell head int" component="div">Birth date</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
  </TableRow>
);

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

const UserRow = ({ index, style }: any) => {
  if (index === 0) {
    return (
      <>{HeadRow}</>
    );
  }

  faker.seed(index + 1);

  const user = new User(
    faker.name.findName(),
    faker.address.city(),
    faker.random.number(),
    faker.random.boolean(),
  );

  return (
    <TableRow className="table__row" key={index} component="div" style={style}>
      <TableCell className="table__cell name" component="div">{user.getName()}</TableCell>
      <TableCell className="table__cell name" component="div">{user.getCity()}</TableCell>
      <TableCell className="table__cell int" component="div">{user.getScore()}</TableCell>
      <TableCell className="table__cell bool" component="div">{user.getIsActive()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell int" component="div">{faker.random.number()}</TableCell>
    </TableRow>
  );
};


export default UserRow;
