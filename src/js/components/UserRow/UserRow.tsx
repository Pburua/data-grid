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
    <TableHeadItem columnIndex={0} type="name" text="Name" />
    <TableHeadItem columnIndex={1} type="name" text="City" />
    <TableHeadItem columnIndex={2} type="int" text="Task 1" />
    <TableHeadItem columnIndex={3} type="int" text="Task 2" />
    <TableHeadItem columnIndex={4} type="int" text="Task 3" />
    <TableHeadItem columnIndex={5} type="int" text="Total" />
    <TableHeadItem columnIndex={6} type="bool" text="Active" />
    <TableHeadItem columnIndex={7} type="enum" text="Framework" />
    <TableHeadItem columnIndex={8} type="date" text="Enrollment date" />
  </TableRow>
);

const UserRow = ({ index, style }: any) => {
  if (index === 0) {
    return (
      <>{HeadRow}</>
    );
  }

  faker.seed(index + 1);

  const user : User = store.getState().sortedAndFiltratedData[index - 1];

  return (
    <TableRow className="table__row" key={index} component="div" style={style}>
      <TableCell className="table__cell name" component="div">{user.name}</TableCell>
      <TableCell className="table__cell name" component="div">{user.city}</TableCell>
      <TableCell className="table__cell int" component="div">{user.taskScore1}</TableCell>
      <TableCell className="table__cell int" component="div">{user.taskScore2}</TableCell>
      <TableCell className="table__cell int" component="div">{user.taskScore3}</TableCell>
      <TableCell className="table__cell int" component="div">{user.totalScore}</TableCell>
      <TableCell className="table__cell bool" component="div">{user.isActive}</TableCell>
      <TableCell className="table__cell enum" component="div">{user.framework}</TableCell>
      <TableCell className="table__cell date" component="div">{user.date}</TableCell>
    </TableRow>
  );
};

export default UserRow;
