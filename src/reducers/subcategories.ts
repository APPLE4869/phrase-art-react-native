import {
  Action,
  ADD_SUBCATEGORIES,
  ADD_SUBCATEGORY,
  ADD_SUBCATEGORY_CANDIDATES,
  INITIALIZE_SUBCATEGORIES,
  INITIALIZE_SUBCATEGORY,
  INITIALIZE_SUBCATEGORY_CANDIDATES
} from "../actions/subcategories";
import SubcategoryDTO from "../models/dto/SubcategoryDTO";

// Stateの型定義
export interface State {
  readonly subcategories: SubcategoryDTO[];
  readonly subcategoryCandidates: SubcategoryDTO[];
  readonly subcategory: SubcategoryDTO | undefined;
}

// Stateの初期値
export const initialState: State = {
  subcategories: [],
  subcategoryCandidates: [],
  subcategory: undefined
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_SUBCATEGORIES: {
      return { ...state, subcategories: state.subcategories.concat(action.payload) };
    }
    case INITIALIZE_SUBCATEGORIES: {
      return { ...state, subcategories: [] };
    }
    case ADD_SUBCATEGORY_CANDIDATES: {
      return { ...state, subcategoryCandidates: action.payload };
    }
    case ADD_SUBCATEGORY: {
      return { ...state, subcategory: action.payload };
    }
    case INITIALIZE_SUBCATEGORY: {
      return { ...state, subcategory: undefined };
    }
    case INITIALIZE_SUBCATEGORY_CANDIDATES: {
      return { ...state, subcategoryCandidates: [] };
    }
    default: {
      return state;
    }
  }
};
