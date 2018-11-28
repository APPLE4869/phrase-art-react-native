import { Action, ADD_SUBCATEGORIES } from "../actions/subcategories";
import SubcategoryDTO from "../models/dto/SubcategoryDTO";

// Stateの型定義
export interface State {
  readonly subcategories: SubcategoryDTO[];
}

// Stateの初期値
export const initialState: State = {
  subcategories: []
};

// Reducer
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_SUBCATEGORIES: {
      return { ...state, subcategories: action.payload };
    }
    default: {
      return state;
    }
  }
};
