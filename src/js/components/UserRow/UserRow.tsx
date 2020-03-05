import React from 'react';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const UserRow = ({ index, style }: any) => {
  faker.seed(index + 1);

  return (
    <TableRow className="table__row" component="div" style={style}>
      <TableCell className="table__cell name" component="div">{faker.name.findName()}</TableCell>
      <TableCell className="table__cell" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell" component="div">{faker.random.number()}</TableCell>
      <TableCell className="table__cell" component="div">{faker.random.number()}</TableCell>
    </TableRow>
  );
};


export default UserRow;
