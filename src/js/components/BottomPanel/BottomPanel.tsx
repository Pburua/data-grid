import React from 'react';
import { connect } from 'react-redux';
import { Button, Switch } from '@material-ui/core';
import { deleteSelectedRows, toggleVirtualization } from '../../actions/actions';
import './BottomPanel.scss';
import store from '../../store/store';
import { ColumnData, User, UserReference } from '../../store/types';

const BottomPanel = (props: any) => {
  const { isVirtualizeOn } = props;

  function exportToCsv() {
    const columnData: ColumnData[] = [...store.getState().columnData];
    const visibleColumnData: ColumnData[] = columnData.filter((item: ColumnData) => item.visible);

    let csvHeader = visibleColumnData
      .map((item: ColumnData) => (item.text))
      .join(',');

    csvHeader += '\n';

    const { filtratedData, sortedAndFiltratedDataRef } = store.getState();
    const visibleColumns = visibleColumnData.map((item: ColumnData) => (item.fieldName));

    const csvData = sortedAndFiltratedDataRef.map((userRef: UserReference) => {
      let rowStr = '';
      const user: User = filtratedData[userRef.userIndex];
      for (let i = 0; i < visibleColumns.length; i += 1) {
        rowStr += user[visibleColumns[i]];
        rowStr += ',';
      }
      rowStr = rowStr.slice(0, -1);
      return rowStr;
    });

    const csvContent = `data:text/csv;charset=utf-8,${csvHeader}${csvData.join('\n')}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'user_data.csv');
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 0);
  }

  return (
    <>
      <div className="bottom-panel">
        <div className="bottom-panel__column">
          <span>Virtuallization off/on</span>
          <Switch
            checked={isVirtualizeOn}
            onChange={toggleVirtualization}
            value="checkedB"
            color="default"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
        <div className="bottom-panel__column">
          <div>Hotkeys:</div>
          <div>SHIFT and click on table header to sort by multiple columns</div>
          <div>SHIFT and click on table row to select multiple rows</div>
        </div>
      </div>
      <div className="bottom-panel">
        <div className="bottom-panel__column">
          <Button onClick={deleteSelectedRows} variant="contained" color="default">
            Delete selected rows
          </Button>
        </div>
        <div className="bottom-panel__column">
          <Button onClick={exportToCsv} variant="contained" color="default">
            Export table to .csv
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isVirtualizeOn: state.isVirtualizeOn,
});

export default connect(mapStateToProps)(BottomPanel);
