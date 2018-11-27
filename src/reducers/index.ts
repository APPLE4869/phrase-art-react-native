import { combineReducers } from "redux";
import phrases, { State as PhrasesState } from "./phrases";

export interface State {
  phrases: PhrasesState;
}

export default combineReducers({
  phrases
});
