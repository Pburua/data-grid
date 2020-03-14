import React from 'react';
import { TableCell } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './TableHeadItem.scss';
import { connect } from 'react-redux';
import { updateSortDirection } from '../../actions/actions';

const TableHeadItem = ({
  type, text, number, allSortParameters,
}: any) => {
  const sortParams = allSortParameters[number];

  function handleTableHeadCellClick() {
    updateSortDirection(!sortParams.isDirectionDown, number);
  }

  return (
    <TableCell className={`table__cell table-head__cell ${type}`} onClick={handleTableHeadCellClick} component="div">
      <div className="table-head__text">
        {text}
      </div>
      <div className="table-head__sort-controls">
        {!sortParams.isDirectionDown ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
      </div>
    </TableCell>
  );
};

const mapStateToProps = (state: any) => ({
  allSortParameters: state.sortParameters,
});

export default connect(mapStateToProps)(TableHeadItem);
