import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../actions/actions';
import UserTable from '../UserTable/UserTable';
import VirtualizationSwitcher from '../VirtualizationSwitcher/VirtualizationSwitcher';
import FilterControls from '../FilterControls/FilterControls';

const App = (props: any) => {
  const { counter } = props;

  return (
    <>
      <h1 onClick={increment}>{counter}</h1>
      <FilterControls />
      <UserTable />
      <VirtualizationSwitcher />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(App);
