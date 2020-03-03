import { INCREMENT } from "./actionTypes";
import store from "../store/store";

export function increment() {
  const action = {
    type: INCREMENT
  };
  store.dispatch(action);
}