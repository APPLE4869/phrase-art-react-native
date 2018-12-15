import {
  Action,
  ADD_CATEGORIES,
  ADD_CATEGORY,
  INITIALIZE_CATEGORIES,
  INITIALIZE_CATEGORY
} from "../actions/categories";
import CategoryDTO from "../models/dto/CategoryDTO";

// Stateの型定義
export interface State {
  readonly category?: CategoryDTO;
  readonly categories: CategoryDTO[];
}

// Stateの初期値
export const initialState: State = {
  category: undefined,
  categories: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_CATEGORY: {
      return { ...state, category: action.payload };
    }
    case ADD_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case INITIALIZE_CATEGORY: {
      return { ...state, category: undefined };
    }
    case INITIALIZE_CATEGORIES: {
      return { ...state, categories: [] };
    }
    default: {
      return state;
    }
  }
};
