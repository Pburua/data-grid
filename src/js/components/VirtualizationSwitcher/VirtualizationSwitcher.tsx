import React from 'react';
import { connect } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import { toggleVirtualization } from '../../actions/actions';

const VirtualizationSwitcher = (props: any) => {
  const { isVirtualizeOn } = props;

  return (
    <>
      <Switch
        checked={isVirtualizeOn}
        onChange={toggleVirtualization}
        value="checkedB"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isVirtualizeOn: state.isVirtualizeOn,
});

export default connect(mapStateToProps)(VirtualizationSwitcher);
