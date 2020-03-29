import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  Button, Card, MuiThemeProvider, Switch, Tooltip,
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
    MuiCard: {
      root: {
        width: 'min-content',
        margin: 'auto',
        padding: '5px',
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
    <MuiThemeProvider theme={theme}>
      <div className="bottom-panel">
        <div className="bottom-panel__column">
          <Button onClick={deleteSelectedRows} variant="contained" color="primary">
            Delete selected rows
          </Button>
        </div>
        <div className="bottom-panel__column">
          <Card>
            <div style={{ width: 'max-content' }}>
              <span>Virtulization</span>
              <Switch
                checked={isVirtualizeOn}
                onChange={toggleVirtualization}
                value="checkedB"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </Card>
        </div>
        <div className="bottom-panel__column">
          <Tooltip
            disableFocusListener
            title="Shift + click on table header to sort by multiple columns. Shift + click on table row to select multiple rows"
          >
            <Card>HOTKEYS</Card>
          </Tooltip>
        </div>
        <div className="bottom-panel__column">
          <Button onClick={exportToCsv} variant="contained" color="primary">
            Export table to .csv
          </Button>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default BottomPanel;
