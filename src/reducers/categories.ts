import { Action, ADD_CATEGORIES } from "../actions/categories";
import CategoryDTO from "../models/dto/CategoryDTO";

// Stateの型定義
export interface State {
  readonly categories: CategoryDTO[];
}

// Stateの初期値
export const initialState: State = {
  categories: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    default: {
      return state;
    }
  }
};
