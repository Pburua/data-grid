import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList as VirtualizedList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { connect } from 'react-redux';

import './UserTable.scss';
import UserRow from '../UserRow/UserRow';

function UnVirtualizedList(Row, itemCount) {
  const rows: JSX.Element [] = [];

  // TODO: change key to faker.name.findName()

  for (let i = 0; i < itemCount; i += 1) {
    rows.push(<Row key={i} index={i} />);
  }

  return (
    <>
      {rows}
    </>
  );
}

function VirtualizedListWrapper(length) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedList
          height={height}
          width={width}
          itemCount={length}
          itemSize={53}
          autoRefresh={{}}
        >
          {UserRow}
        </VirtualizedList>
      )}
    </AutoSizer>
  );
}

const UserTable = (props: any) => {
  const { isVirtualizeOn, sortedAndFiltratedData } = props;

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table" component="div">

        <TableBody className="table__body" component="div">
          {isVirtualizeOn
            ? VirtualizedListWrapper(sortedAndFiltratedData.length + 1)
            : UnVirtualizedList(UserRow, sortedAndFiltratedData.length + 1)}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state: any) => ({
  isVirtualizeOn: state.isVirtualizeOn,
  sortedAndFiltratedData: state.sortedAndFiltratedData,
});

export default connect(mapStateToProps)(UserTable);
