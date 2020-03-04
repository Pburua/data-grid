import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList as List } from 'react-window';

import './UserTable.scss';
import UserRow from '../UserRow/UserRow';

const UserTable = () => (
  <TableContainer className="table-container" component={Paper}>
    <Table aria-label="simple table" component="div">
      <TableHead component="div">
        <TableRow component="div">
          <TableCell component="div">Dessert (100g serving)</TableCell>
          <TableCell component="div" align="right">Calories</TableCell>
          <TableCell component="div" align="right">Fat&nbsp;(g)</TableCell>
          <TableCell component="div" align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell component="div" align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody component="div">
        <List
          height={440}
          itemCount={50}
          itemSize={35}
          width={500}
        >
          {UserRow}
        </List>
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable;
