import React from 'react';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const UserRow = ({ index, style }: any) => {
  faker.seed(index + 1);

  return (
    <TableRow component="div" style={style}>
      <TableCell component="div">{faker.name.findName()}</TableCell>
      <TableCell component="div">{faker.random.number()}</TableCell>
      <TableCell component="div">{faker.random.number()}</TableCell>
      <TableCell component="div">{faker.random.number()}</TableCell>
      <TableCell component="div">{faker.random.number()}</TableCell>
    </TableRow>
  );
};


export default UserRow;
