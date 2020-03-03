import { INCREMENT } from "../actions/actionTypes";

const initialState = {
  counter: 0,
};

function rootReducer(prevState, action) {
  if (typeof prevState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, prevState, {
        counter: prevState.counter + 1,
      });
    default:
      return prevState
  }
}

export default rootReducer;