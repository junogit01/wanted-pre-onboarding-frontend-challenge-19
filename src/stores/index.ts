import { combineReducers } from "redux";
import todoStore, { TodoState } from "./todoStore";

export interface RootState {
  todoStore: TodoState;
}
const rootStore = combineReducers({
  todoStore,
});
export default rootStore;
