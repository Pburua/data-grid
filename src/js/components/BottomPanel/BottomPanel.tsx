import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Button, MuiThemeProvider, Switch, Tooltip,
} from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { deleteSelectedRows, toggleVirtualization } from '../../actions/actions';
import './BottomPanel.scss';
import {
  ColumnData, ReduxStorage, User, UserReference,
} from '../../store/types';

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1em',
      },
    },
  },
});

const selectCsvText = createSelector(
  (state: ReduxStorage) => state.columnData.filter((item: ColumnData) => item.visible),
  (state: ReduxStorage) => state.data,
  (state: ReduxStorage) => state.sortedAndFiltratedDataRef,
  (visibleColumnData: ColumnData[], data: User[], sortedAndFiltratedDataRef: UserReference[]) => {
    let csvHeader = visibleColumnData
      .map((item: ColumnData) => (item.text))
      .join(',');

    csvHeader += '\n';

    const visibleColumnNames = visibleColumnData.map((item: ColumnData) => (item.fieldName));

    const csvData: string[] = sortedAndFiltratedDataRef
      .map((userRef: UserReference) => {
        let rowStr = '';
        const user: User = data[userRef.userIndex];
        for (let i = 0; i < visibleColumnNames.length; i += 1) {
          rowStr += user[visibleColumnNames[i]];
          rowStr += ',';
        }
        rowStr = rowStr.slice(0, -1);
        return rowStr;
      });

    return `${csvHeader}${csvData.join('\n')}`;
  },
);

const BottomPanel = () => {
  const isVirtualizeOn: boolean = useSelector(
    (state: ReduxStorage) => state.isVirtualizeOn,
  );

  const csvText: string = useSelector(selectCsvText);

  function exportToCsv() {
    const csvContent = `data:text/csv;charset=utf-8,${csvText}`;

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
          <span>Virtulization</span>
          <Switch
            checked={isVirtualizeOn}
            onChange={toggleVirtualization}
            value="checkedB"
            color="default"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </div>
        <div className="bottom-panel__column">
          <MuiThemeProvider theme={theme}>
            <Tooltip
              title="Shift + click on table header to sort by multiple columns. Shift + click on table row to select multiple rows"
            >
              <div>HOTKEYS</div>
            </Tooltip>
          </MuiThemeProvider>
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

export default BottomPanel;
