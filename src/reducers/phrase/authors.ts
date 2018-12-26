import { Action, ADD_AUTHOR_CANDIDATES, INITIALIZE_AUTHOR_CANDIDATES } from "../../actions/Phrase/authors";
import AuthorDTO from "../../models/dto/Phrase/AuthorDTO";

// Stateの型定義
export interface State {
  readonly authorCandidates: AuthorDTO[];
}

// Stateの初期値
export const initialState: State = {
  authorCandidates: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_AUTHOR_CANDIDATES: {
      return { ...state, authorCandidates: action.payload };
    }
    case INITIALIZE_AUTHOR_CANDIDATES: {
      return { ...state, authorCandidates: [] };
    }
    default: {
      return state;
    }
  }
};
