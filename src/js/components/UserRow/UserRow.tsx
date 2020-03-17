import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHeadItem from '../TableHeadItem/TableHeadItem';
import './UserRow.scss';
import { toggleRowSelection } from '../../actions/actions';
import { ReduxStorage, User } from '../../store/types';
import { removeUserSelection } from '../../reducers/utils';

const UserRow = ({
  index, style, columnData, sortedAndFiltratedData,
}: any) => {
  if (index === 0) {
    return (
      <TableRow className="table__row table-head" key={0} component="div">
        {columnData.map((value, colIndex) => (
          <TableHeadItem
            key={value.fieldName}
            columnIndex={colIndex}
            type={value.type}
            text={value.text}
          />
        ))}
      </TableRow>
    );
  }

  faker.seed(index + 1);

  const user: User = sortedAndFiltratedData[index - 1];

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

const mapStateToProps = (state: ReduxStorage) => ({
  sortedAndFiltratedData: state.sortedAndFiltratedData,
  columnData: state.columnData,
});

export default connect(mapStateToProps)(UserRow);
