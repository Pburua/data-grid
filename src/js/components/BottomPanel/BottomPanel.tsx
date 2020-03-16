import React from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { toggleVirtualization } from '../../actions/actions';
import './BottomPanel.scss';

const BottomPanel = (props: any) => {
  const { isVirtualizeOn } = props;

  return (
    <div className="bottom-panel">
      <div className="bottom-panel__column">
        <span>Virtuallization on/off</span>
        <Switch
          checked={isVirtualizeOn}
          onChange={toggleVirtualization}
          value="checkedB"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
      <div className="bottom-panel__column">
        <div>Hotkeys:</div>
        <div>SHIFT and click on table header to sort by multiple columns</div>
        <div>SHIFT and click on table row to select multiple rows</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isVirtualizeOn: state.isVirtualizeOn,
});

export default connect(mapStateToProps)(BottomPanel);
