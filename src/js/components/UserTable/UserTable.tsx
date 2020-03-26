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
    faker.seed(i + 2);
    rows.push(<Row key={faker.name.findName()} index={i} />);
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

const UserTable = () => {
  const isVirtualizeOn: boolean = useSelector(
    (state: ReduxStorage) => state.isVirtualizeOn,
  );
  const displayingDataLength: number = useSelector(
    (state: ReduxStorage) => state.sortedAndFiltratedDataRef.length,
  );

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table" component="div">

        <TableBody className="table__body" component="div">
          {isVirtualizeOn
            ? VirtualizedListWrapper(displayingDataLength + 1)
            : UnVirtualizedList(UserRow, displayingDataLength + 1)}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default UserTable;
