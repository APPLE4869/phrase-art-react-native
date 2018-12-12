import { Action, ADD_SUBCATEGORIES, ADD_SUBCATEGORY, INITIALIZE_SUBCATEGORIES, INITIALIZE_SUBCATEGORY } from "../actions/subcategories";
import SubcategoryDTO from "../models/dto/SubcategoryDTO";

// Stateの型定義
export interface State {
  readonly subcategories: SubcategoryDTO[];
  readonly subcategory: SubcategoryDTO | undefined;
}

// Stateの初期値
export const initialState: State = {
  subcategories: [],
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
    case ADD_SUBCATEGORY: {
      return { ...state, subcategory: action.payload };
    }
    case INITIALIZE_SUBCATEGORY: {
      return { ...state, subcategory: undefined };
    }
    default: {
      return state;
    }
  }
};
