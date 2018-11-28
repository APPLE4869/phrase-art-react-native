import { Action, ADD_PHRASE, ADD_PHRASES, INITIALIZE_PHRASES } from "../actions/phrases";
import PhraseDTO from "../models/dto/PhraseDTO";

// Stateの型定義
export interface State {
  readonly phrase: PhraseDTO | undefined;
  readonly phrases: PhraseDTO[];
}

// Stateの初期値
export const initialState: State = {
  phrase: undefined,
  phrases: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PHRASE: {
      return { ...state, phrase: action.payload };
    }
    case ADD_PHRASES: {
      return { ...state, phrases: state.phrases.concat(action.payload) };
    }
    case INITIALIZE_PHRASES: {
      return { ...state, phrases: [] };
    }
    default: {
      return state;
    }
  }
};
