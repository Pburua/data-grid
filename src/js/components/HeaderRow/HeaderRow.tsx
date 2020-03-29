import React from 'react';
import { useSelector } from 'react-redux';
import TableRow from '@material-ui/core/TableRow';
import { ColumnData, ReduxStorage } from '../../store/types';
import TableHeadItem from '../TableHeadItem/TableHeadItem';

const HeaderRow = () => {
  const visibleColumns: ColumnData[] = useSelector(
    (state: ReduxStorage) => [...state.columnData].filter((value: ColumnData) => value.visible),
  );

  return (
    <TableRow className="table__row table-head" key={0} component="div">
      {visibleColumns.map((value) => (
        <TableHeadItem
          key={value.fieldName}
          columnId={value.fieldName}
          type={value.type}
          text={value.text}
        />
      ))}
    </TableRow>
  );
};

export default HeaderRow;
