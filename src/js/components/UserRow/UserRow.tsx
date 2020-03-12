import React from 'react';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import store from '../../store/store';

const HeadRow = (
  <TableRow className="table__row head" key={0} component="div">
    <TableCell className="table__cell head name" component="div">Name</TableCell>
    <TableCell className="table__cell head name" component="div">City</TableCell>
    <TableCell className="table__cell head int" component="div">Score</TableCell>
    <TableCell className="table__cell head bool" component="div">Active</TableCell>
    <TableCell className="table__cell head int" component="div">Framework</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
    <TableCell className="table__cell head int" component="div">Int</TableCell>
  </TableRow>
);

const UserRow = ({ index, style }: any) => {
  if (index === 0) {
    return (
      <>{HeadRow}</>
    );
  }

  faker.seed(index + 1);

  const user = store.getState().data[index - 1];

  return (
    <TableRow className="table__row" key={index} component="div" style={style}>
      <TableCell className="table__cell name" component="div">{user.getName()}</TableCell>
      <TableCell className="table__cell name" component="div">{user.getCity()}</TableCell>
      <TableCell className="table__cell int" component="div">{user.getScore()}</TableCell>
      <TableCell className="table__cell bool" component="div">{user.getIsActive()}</TableCell>
      <TableCell className="table__cell int" component="div">{user.getFramework()}</TableCell>
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
