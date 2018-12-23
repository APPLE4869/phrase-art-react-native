import {
  Action,
  ADD_PHRASE,
  ADD_PHRASES,
  INITIALIZE_PHRASE,
  INITIALIZE_PHRASES,
  REPLACE_PHRASE,
  REPLACE_PHRASES
} from "../../actions/Phrase/phrases";
import PhraseDTO from "../../models/dto/PhraseDTO";

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
    case REPLACE_PHRASE: {
      if (state.phrase && state.phrase.id === action.payload.id) {
        return { ...state, phrase: action.payload };
      }
      return state;
    }
    case REPLACE_PHRASES: {
      const newPhraes = action.payload;
      let index = null;
      state.phrases.forEach((elm, i) => {
        if (elm.id === newPhraes.id) {
          index = i;
        }
      });

      if (index === null) {
        return state;
      }
      return { ...state, phrases: [...state.phrases.slice(0, index), newPhraes, ...state.phrases.slice(index + 1)] };
    }
    case INITIALIZE_PHRASE: {
      return { ...state, phrase: undefined };
    }
    case INITIALIZE_PHRASES: {
      return { ...state, phrases: [] };
    }
    default: {
      return state;
    }
  }
};
