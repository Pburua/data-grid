import { INCREMENT, TOGGLE_VIRTUALIZATION } from '../actions/actionTypes';

const initialState = {
  counter: 0,
  isVirtualizeOn: true,
};

function rootReducer(prevState : any, action: { type: string }) {
  if (typeof prevState === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case INCREMENT:
      return { ...prevState, counter: prevState.counter + 1 };
    case TOGGLE_VIRTUALIZATION:
      return { ...prevState, isVirtualizeOn: !prevState.isVirtualizeOn };
    default:
      return prevState;
  }
}

export default rootReducer;
