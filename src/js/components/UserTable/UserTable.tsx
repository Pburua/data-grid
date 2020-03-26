import React from 'react';
import faker from 'faker';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { FixedSizeList as VirtualizedList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import './UserTable.scss';
import { useSelector } from 'react-redux';
import UserRow from '../UserRow/UserRow';
import { ReduxStorage } from '../../store/types';

function UnVirtualizedList(Row, itemCount) {
  const rows: JSX.Element [] = [];

  for (let i = 0; i < itemCount; i += 1) {
    faker.seed(i);
    rows.push(<Row key={faker.name.findName()} index={i} />);
  }

  return (
    <>
      {rows}
    </>
  );
}

function VirtualizedListWrapper(length) {
  const defaultRowHeight = 53;
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VirtualizedList
          height={height}
          width={width}
          itemCount={length}
          itemSize={defaultRowHeight}
          autoRefresh={{}}
        >
          {UserRow}
        </VirtualizedList>
      )}
    </AutoSizer>
  );
}

const UserTable = () => {
  const isVirtualizeOn: boolean = useSelector(
    (state: ReduxStorage) => state.isVirtualizeOn,
  );
  // displayingDataLength is increased by 1 to render a header as a virtualized row
  const displayingDataLength: number = useSelector(
    (state: ReduxStorage) => state.sortedAndFiltratedDataRef.length + 1,
  );

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table" component="div">

        <TableBody className="table__body" component="div">
          {isVirtualizeOn
            ? VirtualizedListWrapper(displayingDataLength)
            : UnVirtualizedList(UserRow, displayingDataLength)}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default UserTable;
