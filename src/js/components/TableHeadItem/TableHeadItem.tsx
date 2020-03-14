import React from 'react';
import { TableCell } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './TableHeadItem.scss';
import { connect } from 'react-redux';
import { applyAdditionalPriority, applyFirstPriority } from '../../actions/actions';

const TableHeadItem = ({
  type, text, columnIndex, allSortParameters,
}: any) => {
  const sortParams = allSortParameters[columnIndex];

  function handleTableHeadCellClick(event) {
    if (event.shiftKey) {
      applyAdditionalPriority(columnIndex);
    } else {
      applyFirstPriority(columnIndex);
    }
  }

  return (
    <TableCell className={`table__cell table-head__cell ${type}`} onClick={handleTableHeadCellClick} component="div">
      <div className="table-head__text">
        {text}
      </div>
      <div className="table-head__sort-controls sort-controls">
        <div className="sort-controls__icon">
          {!sortParams.isDirectionDown
            ? <ArrowDropUpIcon fontSize="small" />
            : <ArrowDropDownIcon fontSize="small" /> }
        </div>
        <div className="sort-controls__priority">
          {sortParams.priority === 10 ? '' : sortParams.priority}
        </div>
      </div>
    </TableCell>
  );
};

const mapStateToProps = (state: any) => ({
  allSortParameters: state.sortParameters,
});

export default connect(mapStateToProps)(TableHeadItem);
