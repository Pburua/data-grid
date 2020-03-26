import React from 'react';
import { useSelector } from 'react-redux';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHeadItem from '../TableHeadItem/TableHeadItem';
import './UserRow.scss';
import { toggleRowSelection } from '../../actions/actions';
import {
  ColumnData, ReduxStorage, User, UserReference,
} from '../../store/types';
import { removeUserSelection } from '../../reducers/utils';

interface UserRowProps {
  index: number,
  style: any,
}

const UserRow = ({ index, style }: UserRowProps) => {
  const visibleColumns: ColumnData[] = useSelector(
    (state: ReduxStorage) => [...state.columnData].filter((value: ColumnData) => value.visible),
  );
  const data: User[] = useSelector(
    (state: ReduxStorage) => state.data,
  );
  const sortedAndFiltratedDataRef: UserReference[] = useSelector(
    (state: ReduxStorage) => state.sortedAndFiltratedDataRef,
  );

  if (index === 0) {
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
  }

  faker.seed(index + 1);

  const user: User = data[sortedAndFiltratedDataRef[index - 1].userIndex];

  const { isSelected } = user;

  let rowClassName = 'table__row';

  if (isSelected) rowClassName += ' selected';

  function handleTableRowClick(event) {
    if (event.shiftKey) {
      removeUserSelection();
      toggleRowSelection(user.name, false);
    } else {
      toggleRowSelection(user.name, true);
    }
  }

  return (
    <TableRow className={rowClassName} key={index} onClick={handleTableRowClick} component="div" style={style}>
      {visibleColumns.map((value: ColumnData) => (
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
