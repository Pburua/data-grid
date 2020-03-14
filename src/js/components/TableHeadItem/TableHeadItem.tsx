import React, { useState } from 'react';
import { TableCell } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './TableHeadItem.scss';

const TableHeadItem = ({ type, text }: any) => {
  const [sortDown, setSortDown] = useState(true);

  function handleTableHeadCellCLick() {
    setSortDown(!sortDown);
  }

  return (
    <TableCell className={`table__cell table-head__cell ${type}`} onClick={handleTableHeadCellCLick} component="div">
      <div className="table-head__text">
        {text}
      </div>
      <div className="table-head__sort-controls">
        {sortDown ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
      </div>
    </TableCell>
  );
};

export default TableHeadItem;
