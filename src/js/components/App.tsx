import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../actions/actions';
import UserTable from './UserTable/UserTable';

const App = (props: any) => {
  const { counter } = props;

  return (
    <div>
      <h1 onClick={increment}>{counter}</h1>
      <UserTable />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(App);
