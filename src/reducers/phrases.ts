import {
  Action,
  ADD_PHRASE,
  ADD_PHRASES,
  ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID,
  ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID
} from "../actions/phrases";
import PhraseDTO from "../models/dto/PhraseDTO";

// Stateの型定義
export interface State {
  readonly phrase: PhraseDTO | undefined;
  readonly phrases: PhraseDTO[];
  readonly phrasesNarrowedDownByCategory: PhraseDTO[];
  readonly phrasesNarrowedDownBySubcategory: PhraseDTO[];
}

// Stateの初期値
export const initialState: State = {
  phrase: undefined,
  phrases: [],
  phrasesNarrowedDownByCategory: [],
  phrasesNarrowedDownBySubcategory: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_PHRASE: {
      return { ...state, phrase: action.payload };
    }
    case ADD_PHRASES: {
      return { ...state, phrases: action.payload };
    }
    case ADD_PHRASES_NARROWED_DOWN_BY_CATEGORY_ID: {
      return { ...state, phrasesNarrowedDownByCategory: action.payload };
    }
    case ADD_PHRASES_NARROWED_DOWN_BY_SUBCATEGORY_ID: {
      return { ...state, phrasesNarrowedDownBySubcategory: action.payload };
    }
    default: {
      return state;
    }
  }
};
