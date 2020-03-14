import React from 'react';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import store from '../../store/store';
// eslint-disable-next-line no-unused-vars
import { User } from '../../store/types';
import TableHeadItem from '../TableHeadItem/TableHeadItem';
import './UserRow.scss';

const HeadRow = (
  <TableRow className="table__row table-head" key={0} component="div">
    <TableHeadItem type="name" text="Name" />
    <TableHeadItem type="name" text="City" />
    <TableHeadItem type="int" text="Score" />
    <TableHeadItem type="bool" text="Active" />
    <TableHeadItem type="enum" text="Framework" />
    <TableHeadItem type="int" text="Int" />
    <TableHeadItem type="int" text="Int" />
    <TableHeadItem type="int" text="Int" />
    <TableHeadItem type="int" text="Int" />
    <TableHeadItem type="int" text="Int" />
    <TableHeadItem type="int" text="Int" />
  </TableRow>
);

const UserRow = ({ index, style }: any) => {
  if (index === 0) {
    return (
      <>{HeadRow}</>
    );
  }

  faker.seed(index + 1);

  const user : User = store.getState().filtratedData[index - 1];

  return (
    <TableRow className="table__row" key={index} component="div" style={style}>
      <TableCell className="table__cell name" component="div">{user.name}</TableCell>
      <TableCell className="table__cell name" component="div">{user.city}</TableCell>
      <TableCell className="table__cell int" component="div">{user.score}</TableCell>
      <TableCell className="table__cell bool" component="div">{user.isActive}</TableCell>
      <TableCell className="table__cell enum" component="div">{user.framework}</TableCell>
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
