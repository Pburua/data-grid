import React from 'react';
import { TableCell } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './TableHeadItem.scss';

const TableHeadItem = ({ type, text }: any) => {

  return (
    <TableCell className={`table__cell table-head__cell ${type}`} component="div">
      <div className="table-head__text">
        {text}
      </div>
      <div className="table-head__sort-controls sort-controls">
        <ArrowDropUpIcon className="sort-controls__up" fontSize="small" />
        <ArrowDropDownIcon className="sort-controls__up" fontSize="small" />
      </div>
    </TableCell>
  );
};

export default TableHeadItem;
