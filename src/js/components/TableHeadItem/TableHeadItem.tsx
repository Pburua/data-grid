import React from 'react';
import { TableCell } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './TableHeadItem.scss';
import { useSelector } from 'react-redux';
import { applyAdditionalPriority, applyFirstPriority } from '../../actions/actions';
import { ReduxStorage, SortParameter } from '../../store/types';

const TableHeadItem = ({
  type, text, columnId,
}: any) => {
  const sortParams: SortParameter[] = useSelector(
    (state: ReduxStorage) => state.sortParameters.filter((value) => value.columnId === columnId),
  );

  function handleTableHeadCellClick(event) {
    if (event.shiftKey) {
      applyAdditionalPriority(columnId);
    } else {
      applyFirstPriority(columnId);
    }
  }

  return (
    <TableCell className={`table__cell table-head__cell ${type}`} onClick={handleTableHeadCellClick} component="div">
      <div className="table-head__text">
        {text}
      </div>
      <div className="table-head__sort-controls sort-controls">
        <div className="sort-controls__icon">
          {!sortParams[0].isDirectionDown
            ? <ArrowDropUpIcon fontSize="small" />
            : <ArrowDropDownIcon fontSize="small" /> }
        </div>
        <div className="sort-controls__priority">
          {sortParams[0].priority === 10 ? '' : sortParams[0].priority}
        </div>
      </div>
    </TableCell>
  );
};

export default TableHeadItem;
