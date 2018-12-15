import {
  Action,
  INITIALIZE_PHRASES_LIST_STATUS,
  SET_PHRASES_LIST_STATUS
} from "../../actions/Phrase/phrasesListStatus";
import PhrasesListStatus from "../../models/PhrasesListStatus";

// Stateの型定義
export interface State {
  readonly phrasesListStatus: PhrasesListStatus;
}

// Stateの初期値
export const initialState: State = {
  phrasesListStatus: { categoryType: undefined, categoryId: undefined, subcategoryId: undefined }
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_PHRASES_LIST_STATUS: {
      const { categoryType, categoryId, subcategoryId } = action.payload;
      return { ...state, phrasesListStatus: { categoryType, categoryId, subcategoryId } };
    }
    case INITIALIZE_PHRASES_LIST_STATUS: {
      return {
        ...state,
        phrasesListStatus: { categoryType: undefined, categoryId: undefined, subcategoryId: undefined }
      };
    }
    default: {
      return state;
    }
  }
};
