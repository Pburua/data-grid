import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import './UserTable.scss';
import UserRow from '../UserRow/UserRow';

const UserTable = () => (
  <TableContainer className="table-container" component={Paper}>
    <Table className="table" aria-label="simple table" component="div">
      <TableHead className="table__head" component="div">
        <TableRow className="table__row" component="div">
          <TableCell className="table__cell name" component="div">Name</TableCell>
          <TableCell className="table__cell" component="div" align="right">Int</TableCell>
          <TableCell className="table__cell" component="div" align="right">Int</TableCell>
          <TableCell className="table__cell" component="div" align="right">Int</TableCell>
          <TableCell className="table__cell" component="div" align="right">Int</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="table__body" component="div">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={50}
              itemSize={47}
            >
              {UserRow}
            </List>
          )}
        </AutoSizer>
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserTable;
