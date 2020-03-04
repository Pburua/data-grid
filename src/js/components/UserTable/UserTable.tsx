import React from 'react';
import faker from 'faker';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './UserTable.scss';

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein,
  };
}

const rows = [
  createData('1Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('1Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('1Eclair', 262, 16.0, 24, 6.0),
  createData('1Cupcake', 305, 3.7, 67, 4.3),
  createData('1Gingerbread', 356, 16.0, 49, 3.9),
  createData('2Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('2Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('2Eclair', 262, 16.0, 24, 6.0),
  createData('2Cupcake', 305, 3.7, 67, 4.3),
  createData('2Gingerbread', 356, 16.0, 49, 3.9),
  createData('3Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('3Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('3Eclair', 262, 16.0, 24, 6.0),
  createData('3Cupcake', 305, 3.7, 67, 4.3),
  createData('3Gingerbread', 356, 16.0, 49, 3.9),
];

const UserTable = () => {
  console.log(faker.name.findName());
  return (
    <TableContainer className="table-container" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default (UserTable);
