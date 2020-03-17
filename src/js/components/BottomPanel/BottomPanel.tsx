import React from 'react';
import { connect } from 'react-redux';
import { Button, Switch } from '@material-ui/core';
import { deleteSelectedRows, toggleVirtualization } from '../../actions/actions';
import './BottomPanel.scss';
import store from '../../store/store';
import { User } from '../../store/types';

const BottomPanel = (props: any) => {
  const { isVirtualizeOn } = props;

  function exportToCsv() {
    const data = store.getState().sortedAndFiltratedData;

    const csvData = data.map((user: User) => (
      `${user.name},${user.city},${user.unconvertedTaskScore1},${user.unconvertedTaskScore1
      },${user.unconvertedTaskScore1},${user.unconvertedTotalScore},${user.isActive
      },${user.framework},${user.date}`
    ));

    const csvHeader = 'name,city,taskScore1,taskScore2,taskScore3,totalScore,isActive,framework,enrollmentDate\n';

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
