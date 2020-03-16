import React, { useState } from 'react';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import store from '../../store/store';
// eslint-disable-next-line no-unused-vars
import { User } from '../../store/types';
import TableHeadItem from '../TableHeadItem/TableHeadItem';
import './UserRow.scss';

const columnData = [
  { type: 'name', text: 'Name', fieldName: 'name' },
  { type: 'name', text: 'City', fieldName: 'city' },
  { type: 'int', text: 'Task 1', fieldName: 'taskScore1' },
  { type: 'int', text: 'Task 2', fieldName: 'taskScore2' },
  { type: 'int', text: 'Task 3', fieldName: 'taskScore3' },
  { type: 'int', text: 'Total', fieldName: 'totalScore' },
  { type: 'bool', text: 'Active', fieldName: 'isActive' },
  { type: 'enum', text: 'Framework', fieldName: 'framework' },
  { type: 'date', text: 'Enrollment date', fieldName: 'date' },
];

const HeadRow = (
  <TableRow className="table__row table-head" key={0} component="div">
    {columnData.map((value, index) => (
      <TableHeadItem
        key={value.fieldName}
        columnIndex={index}
        type={value.type}
        text={value.text}
      />
    ))}
  </TableRow>
);

const UserRow = ({ index, style }: any) => {
  if (index === 0) {
    return (
      <>{HeadRow}</>
    );
  }

  const [isSelected, setIsSelected] = useState(false);

  function handleTableRowClick() {
    setIsSelected(!isSelected);
  }

  faker.seed(index + 1);

  const user: User = store.getState().sortedAndFiltratedData[index - 1];

  let rowClassName = 'table__row';

  if (isSelected) rowClassName += ' selected';

  return (
    <TableRow className={rowClassName} key={index} onClick={handleTableRowClick} component="div" style={style}>
      {columnData.map((value) => (
        <TableCell
          className={`table__cell ${value.type}`}
          key={value.fieldName}
          component="div"
        >
          {user[value.fieldName]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default UserRow;
