import {
  Action,
  ADD_PHRASE,
  ADD_PHRASES,
  INITIALIZE_PHRASES,
  INITIALIZE_PHRASES_LIST_STATUS,
  SET_PHRASES_STATUS_ABOUNT_SUBCATEGORY_ID
} from "../actions/phrases";
import PhraseDTO from "../models/dto/PhraseDTO";

export interface PhrasesListStatus {
  subcategoryId: string | undefined;
}

// Stateの型定義
export interface State {
  readonly phrase: PhraseDTO | undefined;
  readonly phrases: PhraseDTO[];
  readonly phrasesListStatus: PhrasesListStatus;
}

// Stateの初期値
export const initialState: State = {
  phrase: undefined,
  phrases: [],
  phrasesListStatus: { subcategoryId: undefined }
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
    case SET_PHRASES_STATUS_ABOUNT_SUBCATEGORY_ID: {
      return { ...state, phrasesListStatus: { subcategoryId: action.payload } };
    }
    case INITIALIZE_PHRASES: {
      return { ...state, phrases: [] };
    }
    case INITIALIZE_PHRASES_LIST_STATUS: {
      return { ...state, phrasesListStatus: { subcategoryId: undefined } };
    }
    default: {
      return state;
    }
  }
};
