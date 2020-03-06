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

  for (let i = 0; i < itemCount; i += 1) {
    rows.push(<Row key={i} index={i} />);
  }

  return (
    <>
      {rows}
    </>
  );
}

const UserTable = (props: any) => {
  const { isVirtualizeOn } = props;

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table" component="div">

        <TableBody className="table__body" component="div">

          {isVirtualizeOn
            ? (
              <AutoSizer>
                {({ height, width }) => (
                  <VirtualizedList
                    height={height}
                    width={width}
                    itemCount={51}
                    itemSize={53}
                  >
                    {UserRow}
                  </VirtualizedList>
                )}
              </AutoSizer>
            )
            : UnVirtualizedList(UserRow, 51)}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

const mapStateToProps = (state: any) => ({
  isVirtualizeOn: state.isVirtualizeOn,
});

export default connect(mapStateToProps)(UserTable);
