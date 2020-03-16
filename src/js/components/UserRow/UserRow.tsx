import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHeadItem from '../TableHeadItem/TableHeadItem';
import './UserRow.scss';
import { toggleRowSelection } from '../../actions/actions';
import { User } from '../../store/types';
import { removeUserSelection } from '../../reducers/utils';

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

const UserRow = ({ index, style, sortedAndFiltratedData }: any) => {
  if (index === 0) {
    return (
      <>{HeadRow}</>
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

const mapStateToProps = (state: any) => ({
  sortedAndFiltratedData: state.sortedAndFiltratedData,
});

export default connect(mapStateToProps)(UserRow);
