import {
  Action,
  ADD_FAVORITE_PHRASES,
  ADD_PHRASE,
  ADD_PHRASES,
  ADD_SEARCHED_PHRASES,
  ADD_SEARCHED_WORD,
  INITIALIZE_FAVORITE_PHRASES,
  INITIALIZE_PHRASE,
  INITIALIZE_PHRASES,
  INITIALIZE_SEARCHED_PHRASES,
  REPLACE_FAVORITE_PHRASES,
  REPLACE_PHRASE,
  REPLACE_PHRASES,
  REPLACE_SEARCHED_PHRASES
} from "../../actions/Phrase/phrases";
import PhraseDTO from "../../models/dto/PhraseDTO";

// Stateの型定義
export interface State {
  readonly phrase: PhraseDTO | undefined;
  readonly phrases: PhraseDTO[];
  readonly favoritePhrases: PhraseDTO[];
  readonly searchedPhrases: PhraseDTO[];
  readonly searchedWord?: string;
}

// Stateの初期値
export const initialState: State = {
  phrase: undefined,
  phrases: [],
  favoritePhrases: [],
  searchedPhrases: [],
  searchedWord: undefined
};

const extractMatchIndexFromPhrases = (phrases: PhraseDTO[], newPhrase: PhraseDTO) => {
  let index = null;
  phrases.forEach((elm, i) => {
    if (elm.id === newPhrase.id) {
      index = i;
    }
  });
  return index;
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
    case ADD_FAVORITE_PHRASES: {
      return { ...state, favoritePhrases: state.favoritePhrases.concat(action.payload) };
    }
    case ADD_SEARCHED_PHRASES: {
      return { ...state, searchedPhrases: state.searchedPhrases.concat(action.payload) };
    }
    case ADD_SEARCHED_WORD: {
      return { ...state, searchedWord: action.payload };
    }
    case REPLACE_PHRASE: {
      if (state.phrase && state.phrase.id === action.payload.id) {
        return { ...state, phrase: action.payload };
      }
      return state;
    }
    case REPLACE_PHRASES: {
      const newPhrase = action.payload;
      const phrases = state.phrases;
      const index = extractMatchIndexFromPhrases(phrases, newPhrase);

      if (index === null) {
        return state;
      }
      return { ...state, phrases: [...phrases.slice(0, index), newPhrase, ...phrases.slice(index + 1)] };
    }
    case REPLACE_FAVORITE_PHRASES: {
      const newPhrase = action.payload;
      const favoritePhrases = state.favoritePhrases;
      const index = extractMatchIndexFromPhrases(favoritePhrases, newPhrase);

      if (index === null) {
        return state;
      }
      return {
        ...state,
        favoritePhrases: [...favoritePhrases.slice(0, index), newPhrase, ...favoritePhrases.slice(index + 1)]
      };
    }
    case REPLACE_SEARCHED_PHRASES: {
      const newPhrase = action.payload;
      const searchedPhrases = state.searchedPhrases;
      const index = extractMatchIndexFromPhrases(searchedPhrases, newPhrase);

      if (index === null) {
        return state;
      }
      return {
        ...state,
        searchedPhrases: [...searchedPhrases.slice(0, index), newPhrase, ...searchedPhrases.slice(index + 1)]
      };
    }
    case INITIALIZE_PHRASE: {
      return { ...state, phrase: undefined };
    }
    case INITIALIZE_PHRASES: {
      return { ...state, phrases: [] };
    }
    case INITIALIZE_FAVORITE_PHRASES: {
      return { ...state, favoritePhrases: [] };
    }
    case INITIALIZE_SEARCHED_PHRASES: {
      return { ...state, searchedPhrases: [] };
    }
    default: {
      return state;
    }
  }
};
