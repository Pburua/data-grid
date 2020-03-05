import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList as VirtualizedList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { connect } from 'react-redux';

import './UserTable.scss';
import UserRow from '../UserRow/UserRow';

function UnVirtualizedList(Row, itemCount) {
  const rows: JSX.Element [] = [];

  for (let i = 0; i < itemCount + 1; i += 1) {
    rows.push(<Row key={i} index={i} />);
  }

  return (
    <div className="table__ceil-container">
      {rows}
    </div>
  );
}

const UserTable = (props: any) => {
  const { isVirtualizeOn } = props;

  return (
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
          {isVirtualizeOn
            ? (
              <AutoSizer>
                {({ height, width }) => (
                  <VirtualizedList
                    height={height}
                    width={width}
                    itemCount={50}
                    itemSize={53}
                  >
                    {UserRow}
                  </VirtualizedList>
                )}
              </AutoSizer>
            )
            : UnVirtualizedList(UserRow, 50)}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state: any) => ({
  isVirtualizeOn: state.isVirtualizeOn,
});

export default connect(mapStateToProps)(UserTable);