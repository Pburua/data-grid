import React from 'react'
import { increment } from "../actions/actions";
import { connect } from "react-redux";

const App = (props) => {

  return (
    <div>
      <h1 onClick={increment}>{props.counter}</h1>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

export default connect(mapStateToProps)(App);
